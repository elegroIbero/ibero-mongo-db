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
db = (new Mongo("127.0.0.10:20006")).getDB("Integrantes")
# Ingresamos los registros a la tabla
for (i = 0; i < 2000000; i++) db.Jugador.insert({player:"player"+i});
```

```sh
# En una nueva shell volvemnos a ingresar, para configurar nuestro shard
mongo mongodb://127.0.0.10:20006
use Integrantes
db.Jugador.count()

# Iniciamos la configuracion de la collection y habilitamos sharding
sh.enableSharding("Integrantes") 
db.Jugador.ensureIndex({player: 1}) 
sh.shardCollection("Integrantes.Jugador", {player: 1}) 
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

## Video 2 Replicación

### Requerimientos No Funcionales
* La replicación de datos 
* Balanceo de carga 
* Alta disponibilidad 
* Recuperación ante desastres 
* Actualizaciones y parches 
* Monitorización 

### <a href="https://laiberocol.sharepoint.com/:v:/s/BasesMongo/EdmCxGD-oA5JpiHHucF2dBIBrrmmAiQVPm6GnhvXLLM1Rw?e=lZf6iU">Ingresa para ver el video de explicación de la actividad.</a>




