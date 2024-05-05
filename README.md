## Curso Bases de Datos Avanzadas

### Grupo de trabajo:
---

+ EDWIN ANDRES LEGRO AGUDELO
+ WILMER ARMANDO SIZA MORA
+ JEISSON EDUARDO BELTRAN

### Profesor
+ WILLIAM RUIZ 22042024 C2 202431

### Actividad 1

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

+ Ustedes escogen el tipo de evento deportivo que deseen trabajar, el cual debe ser real y tener disponible los resultados y detalles del torneo deportivo.

+ Subir la actividad en el enlace que corresponde para la entrega de la tarea, indicando el link del repositorio Git y del video.


### Instar MongoDB Community Edition (WSL Ubuntu 22.04)

```bash

sudo apt-get install gnupg curl

curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc | \
   sudo gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg \
   --dearmor

echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list

sudo apt-get update

sudo apt-get install -y mongodb-org

```

### Usando mongosh

```bash
ps --no-headers -o comm 1

mongosh

mongosh -u admin -p

mongosh --port <PORT> <DATABASE_NAME> -u <USERNAME> -p <PASSWORD>

mongosh --port <PORT> <DATABASE_NAME> -u <USERNAME> -p <PASSWORD> --authenticationDatabase admin

mongosh

db.auth( "username", passwordPrompt() )
```