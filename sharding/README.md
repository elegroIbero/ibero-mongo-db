# ACTIVIDAD 4

## Pruebas usando Sharding y Docker

### Config servers

- Iniciamos la configuracion del servidor (3 member replica set)

```sh
# creamos nuestra red compartida de docker
sudo docker network create -d bridge netmongo

# iniciamos con nuestro contenedor de configuracion del cluster
sudo docker compose -f cluster.compose.yml up -d
docker exec -it cfg1 mongo

# aplica la configuración de los clusterRole para una replicacion cfgrs
config = { _id:"cfgrs", configsvr: true, members: [{ _id: 0, host: "cfg1:27017"}, { _id: 1, host: "cfg2:27017"}, { _id: 2, host: "cfg3:27017"}]}
rs.initiate(config)
rs.status()
exit
```

### Creamos las instancias para sharding

```sh
# creamos los nodos shards 1
sudo docker compose -f shard1.compose.yml up -d
docker exec -it shard1 mongo

config = { _id: "shard1rs", members: [{ _id : 0, host : "shard1:27017" },{ _id : 1, host : "shard2:27017" },{ _id : 2, host : "shard3:27017"}]}
rs.initiate(config)
rs.status()
exit

# creamos los nodos shards 2
sudo docker compose -f shard2.compose.yml up -d
docker exec -it frag1 mongo

config = { _id: "shard2rs", members: [{ _id : 0, host : "frag1:27017" },{ _id : 1, host : "frag2:27017" },{ _id : 2, host : "frag3:27017"}]}
rs.initiate(config)
rs.status()
exit
```

### Agregamos los shards al cluster del balanceador

```sh
# creamos el nodo mongos
sudo docker compose -f mongos.compose.yml up -d

docker exec -it mongos mongo
use admin
config_admin = { user: "elegro", pwd: "p2024", roles: [ { role: "userAdminAnyDatabase", db: "admin"}]}
db.createUser(config_admin)

# Desactive el balanceador. usando sh.stopBalancer() y
# Conecte un mongo shell a una mongos instancia en el clúster fragmentado y ejecútelo sh.stopBalancer() para deshabilitar el balanceador:
sh.stopBalancer()

# Agrega un conjunto de réplicas de fragmentos a un clúster fragmentado.
# Este método debe ejecutarse en una mongos instancia.
sh.addShard("shard1rs/shard1:27017,shard2:27017,shard3:27017")
sh.status()

sh.addShard("shard2rs/frag1:27017,frag2:27017,frag3:27017")
sh.status()
exit

mongo mongodb://127.0.0.10:60000 -u elegro -p
```

### Iniciamos el balanceador de cargas

```sh
docker exec -it mongos mongo

# prepara la coleccion
use dbibero
db.encuentroResultados.count();
db.encuentroResultados.ensureIndex({equipo_id: 1})

# Utilice para fragmentar colecciones en la base de datos.
sh.enableSharding("dbibero")

# Fragmenta una colección utilizando key como clave de fragmento .
# La clave del fragmento determina cómo MongoDB distribuye los documentos de la colección entre los fragmentos.
sh.shardCollection("dbibero.encuentroResultados", {equipo_id: 1})


# El sh.reshardCollection() método cambia la clave de fragmento de una colección y cambia la distribución de sus datos. No soportado en v4.4
# sh.reshardCollection("dbibero.encuentroResultados", {jugadores_id: 1})

# indicamos el balancer de sharding
sh.getBalancerState()
sh.setBalancerState(true)
sh.isBalancerRunning()
sh.status()
db.encuentroResultados.getShardDistribution()
```

### Usando conexion mongo shell docker exec

```sh
docker exec -it mongos mongo

shard1 = new Mongo("shard1:27017")
shard1db = shard1.getDB("dbibero")
shard1db.encuentroResultados.count()

shard2 = new Mongo("frag1:27017")
shard2db = shard2.getDB("dbibero")
shard2db.encuentroResultados.count()

# Deportistas

#La función ensureIndex() indicando como argumento el atributo de los objetos de la colección por el que queremos realizar los grupos de datos antes de repartirlos.
db.createCollection("deportistas");
db.deportistas.insertOne({ cid:0, cedula: 111049192, nomdep: "Juan Peres Herrera", edad: 20, equipo_id: "E1",genero: 'M'});

db.deportistas.createIndex({cid: 1});

db.deportistas.ensureIndex({equipo_id : 1})

sh.shardCollection("dbibero.deportistas", {cid: 1})

for (i = 1; i < 1000000; i++) db.deportistas.insertOne({ cid:i, cedula: 1110456456, nomdep: "Juana Peres", edad: 20, equipo_id: "E1", genero: 'F'});
for (i = 1000000; i < 2000000; i++) db.deportistas.insertOne({ cid:i, cedula: 1110435345, nomdep: "Alan felipe", edad: 18, equipo_id: "E2", genero: 'M'});

db.deportistas.getShardDistribution()
```

### Usando conexion mongodb mongo client

```sh
mongo mongodb://127.0.0.10:60000 -u elegro -p

shard1 = new Mongo("127.0.0.10:50001")
shard1db = shard1.getDB("dbibero")
shard1db.encuentroResultados.count()

shard2 = new Mongo("127.0.0.10:50004")
shard2db = shard2.getDB("dbibero")
shard2db.encuentroResultados.count()


ps -ef | grep mongo

PATH mongodb://127.0.0.1:60000,127.0.0.1:50001,127.0.0.1:50004/dbibero
```


## Monitoreo mongodb

### Monitoreo usando Mongostat

+ “(mongostat) es una herramienta de línea de comandos que proporciona una descripción general rápida del estado de una instancia mongod o ejecución actualmente mongos. Úselo mongostat para ayudar a identificar cuellos de botella en el sistema. El mongostat es funcionalmente similar a la utilidad del sistema de archivos UNIX/Linux vmstat, pero proporciona datos sobre mongod instancias mongos . Ejecuta mongostat desde la línea de comando del sistema, no desde el mongo shell”.

```sh
mongostat mongodb://root:p2024@127.0.0.10:60000/dbibero
```

### Monitoreo usando Mongotop

+ “(mongotop) es una herramienta de línea de comandos que proporciona un método para realizar un seguimiento de la cantidad de tiempo que una instancia de MongoDB mongod dedica a leer y escribir datos. mongotop proporciona estadísticas a nivel de colección. De forma predeterminada, mongotop devuelve valores cada segundo”.
```sh
mongotop 30 --uri='mongodb://root:p2024@127.0.0.1:60000/dbibero?authSource=admin'
```

 