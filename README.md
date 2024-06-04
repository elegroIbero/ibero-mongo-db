# Curso Bases de Datos Avanzadas NO SQL

### Grupo de trabajo:

---
- EDWIN ANDRES LEGRO AGUDELO
- WILMER ARMANDO SIZA MORA
- JEISSON EDUARDO BELTRAN

### Profesor

- WILLIAM RUIZ 22042024 C2 202431

# Actividad 3

```sh
#Ingresamos al mongo shell
mongo mongodb://127.0.0.10:27017

#Creamos los 3 nodos para sharding
cluster = new ShardingTest({shards: 3, chunksize:1}) 
```

```sh
# En una nueva shell volvemnos a ingresar
mongo mongodb://127.0.0.10:27017
# Creamos una nueva instancia en el puerto 20006 donde alojamos la base de datos
db = (new Mongo("127.0.0.10:20006")).getDB("integrantes")
# Ingresamos los registros a la tabla
for (i = 0; i < 200000; i++) db.jugador.insert({player:"player"+i});
```

```sh
# En una nueva shell volvemnos a ingresar, para configurar nuestro shard
mongo mongodb://127.0.0.10:20006
use integrantes
db.jugador.count()

# Iniciamos la configuracion de la collection y habilitamos sharding
sh.enableSharding("integrantes") 
db.jugador.ensureIndex({player: 1}) 
sh.shardCollection("integrantes.jugador", {player: 1}) 
sh.getBalancerState() 
sh.setBalancerState(true) 
sh.isBalancerRunning() 
sh.status() 

# Creamos nuestra nuevo nodo 20000, para crear el shard1 
shard1 = new Mongo("127.0.0.10:20000")
shard1DB = shard1.getDB("Integrantes") 
shard1DB.Jugador.count()

shard2 = new Mongo("127.0.0.10:20001") 
Shard2DB = shard2.getDB("Integrantes") 
Shard2DB.Jugador.count() 

shard3 = new Mongo("127.0.0.10:20002") 
Shard3DB = shard3.getDB("Integrantes") 
Shard3DB.Jugador.count() 

db.adminCommand({listShards: 1}) 
```

### Video - Sharding 3
<a href="https://laiberocol.sharepoint.com/:v:/s/BasesMongo/EekLZ8_hCiFAvr3jagbo97IBTst6Jf0w8txM8bJc8J3Rsg?e=x0JkCk">Actividad 3 - Sharding</a>


# Actividad 2

La siguiente actividad pretende acercarlos de manera práctica a los conceptos de bases de datos NoSQL a través de la solución de un caso práctico.  
Para el desarrollo de esta actividad, tenga en cuenta lo siguiente:

Esta es una actividad de tipo grupal, la cual podrán realizar máximo 3 estudiantes.
Leer los capítulos 1 y 2 del libro:
Sarasa, A. (2016). Introducción a las bases de datos NoSQL usando MongoDB. Editorial UOC.

- Desarrollar el modelo de una base de datos MongoDb que permita la gestión de los participantes a un torneo deportivo:
  - deportistas,
  - entrenadores,
  - árbitros,
  - encuentros deportivos,
  - resultados y
  - tabla de posiciones.

* Ustedes escogen el tipo de evento deportivo que deseen trabajar, el cual debe ser real y tener disponible los resultados y detalles del torneo deportivo.

* Subir la actividad en el enlace que corresponde para la entrega de la tarea, indicando el link del repositorio Git y del video.

### Video 1

### <a href="https://laiberocol.sharepoint.com/:v:/s/BasesMongo/EdmCxGD-oA5JpiHHucF2dBIBrrmmAiQVPm6GnhvXLLM1Rw?e=lZf6iU">Ingresa para ver el video de explicación de la actividad.</a>


### Mongo 4.4 Replicación

Comandos necesarios para realizar configuración de la replicación 
- Condiciones previas del proceso
  ```sh
  sudo systemctl enabled mongod.service
  sudo systemctl start mongod.service

  sudo mkdir replication 
  sudo mkdir -p replication/db1 replication/db2 replication/db3
  sudo chown -R mongodb:mongodb replication/db* 
  ```

- Crear las instancias de replicacion RS Puertos (27017, 27018, 27019)
  ```sh
  sudo mongod --port 27017 --dbpath replication/db1 --replSet RS --bind_ip localhost --fork --logpath /var/log/mongodb/db1.log
  sudo mongod --port 27018 --dbpath replication/db2 --replSet RS --bind_ip localhost --fork --logpath /var/log/mongodb/db2.log
  sudo mongod --port 27019 --dbpath replication/db3 --replSet RS --bind_ip localhost --fork --logpath /var/log/mongodb/db3.log
  mongo --port 27017

  rs.initiate({ _id:"RS", members: [ { _id: 0, host: "localhost:27017"}, { _id: 1, host: "localhost:27018"}, { _id: 2, host: "localhost:27019"}]})
  rs.status()
  rs.conf()
  use dbibero
  db.equipos.insertMany([
    { cid: "E1", nomequ: "Los Tejanos", date: new Date("2014-03-01T08:00:00Z") },
    { cid: "E2", nomequ: "El Equipo Maravilla", date: new Date("2014-03-01T09:00:00Z") },
    { cid: "E3", nomequ: "Los Del EDEN", date: new Date("2014-03-15T09:00:00Z") },
    { cid: "E4", nomequ: "Las Barbies", date: new Date("2014-03-15T09:00:00Z") },
    { cid: "E5", nomequ: "Los Profesionales", date: new Date("2014-03-15T09:00:00Z") },
  ]);
  db.equipos.find();
  exit
  sudo ss -tulnp | grep mongod 
  ```

- Provamos la replica _id= 1 que se expone en el puerto 27018
  ```sh
  # Aplica Mongo-V4
  mongo --port 27018
  rs.status() 
  rs.conf() 
  rs.secondaryOk()
  use dbibero
  db.equipos.find();
  exit;

  # Mostrar los procesos que corren y los respectivos puertos en uso  
  sudo ss -tulnp | grep mongod 
  ```

- Matamos la instancia (Primary) y provamos
  ```sh
  #Matamos el proceso de linux que se expone en el puerto 27017 Primary Instancia
  sudo kill -9 221760
  sudo ss -tulnp | grep mongod 

  #Se realiza la prueba de conexión
  mongo V4.4
  URL: mongodb://localhost:27017,localhost:27018,localhost:27019/dbibero
  ```

## Usando Docker compose.yml
```yml
services:
  mongo:
    image: mongo:4.4.8-focal
    container_name: mongo
    restart: always
    networks:
      - netmongo
    ports:
      - 127.0.0.11:27017:27017
    command: mongod --port 27017 --dbpath /data/db --bind_ip 0.0.0.0

  replica1:
    image: mongo:4.4.8-focal
    container_name: replica1
    restart: always
    networks:
      - netmongo
    volumes:
      - ./replica1:/data/db
    ports:
      - 127.0.0.11:30001:27017
    command: mongod --replSet rs0 --port 27017 --dbpath /data/db --bind_ip 0.0.0.0


  replica2:
    image: mongo:4.4.8-focal
    container_name: replica2
    restart: always
    networks:
      - netmongo
    volumes:
      - ./replica2:/data/db
    ports:
      - 127.0.0.11:30002:27017
    command: mongod --replSet rs0 --port 27017 --dbpath /data/db --bind_ip 0.0.0.0


  replica3:
    image: mongo:4.4.8-focal
    container_name: replica3
    restart: always
    networks:
      - netmongo
    volumes:
      - ./replica3:/data/db
    ports:
      - 127.0.0.11:30003:27017
    command: mongod --replSet rs0 --port 27017 --dbpath /data/db --bind_ip 0.0.0.0

volumes:
  replica1:
  replica2:
  replica3:

networks:
  netmongo:
    name: "netmongo"
    driver: bridge
```

```sh
# instalamos el mongo shell client
curl -fsSL https://www.mongodb.org/static/pgp/server-4.4.asc | sudo apt-key add -
apt-key list
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/4.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.4.list
sudo apt update
sudo apt install mongodb-org-mongos mongodb-org-shell
dpkg -l | grep mongo

# preparamos el directorio volumen y creamos los contenedores docker para las instancias de mongo
mkdir replicaset
sudo docker compose -f replicaset/compose.yml up -d

# ingresamos a una de los contenedores al mongo shell
docker exec -it replica1 mongo

#configuramos la replicacion
config = { _id:"rs0",  members: [{ _id: 0, host: "replica1:27017"}, { _id: 1, host: "replica2:27017"}, { _id: 2, host: "replica3:27017"}]}
rs.initiate(config)
db
rs.status() 
rs.conf() 

# creamos un usuario admin para poder acceder desde fuera del contenedor
use admin
config_admin = { user: "elegro", pwd: "p2024", roles: [ { role: "userAdminAnyDatabase", db: "admin"}]}
db.createUser(config_admin)

# probamos el acceso desde fuera del contenedor
mongo mongodb://127.0.0.11:30001 -u elegro -p
```


## Video 2 Replicación

### Requerimientos No Funcionales
* La replicación de datos 
* Balanceo de carga 
* Alta disponibilidad 
* Recuperación ante desastres 
* Actualizaciones y parches 
* Monitorización 

### <a href="https://laiberocol.sharepoint.com/:v:/s/BasesMongo/EdmCxGD-oA5JpiHHucF2dBIBrrmmAiQVPm6GnhvXLLM1Rw?e=lZf6iU">Ingresa para ver el video de explicación de la actividad.</a>




