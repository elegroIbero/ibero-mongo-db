#!/bin/sh

# Variables
ip_cfgrs="127.0.0.12"
ip_shards_01="127.0.0.13"
ip_shards_02="127.0.0.14"

# Detener todos los procesos mongod y mongos
stop_mongo_processes() {
  echo "Deteniendo todos los procesos de mongod y mongos..."
  pkill -f mongod &
  pkill -f mongos &
  sleep 5  # Esperar para asegurarse de que todos los procesos se hayan detenido
}

# Eliminar directorios creados
remove_directories() {
  echo "Eliminando directorios de datos..."
  rm -rf /tmp/mongodb-*
  rm -rf configsvr
  rm -rf shard1rs
  rm -rf shard2rs
  rm -rf data
}

# Script principal
main() {
  stop_mongo_processes
  remove_directories
  echo "Todos los procesos de MongoDB han sido detenidos y la configuración ha sido limpiada."
}

# Ejecutar script principal
main

# chmod +x cleanup_mongodb.sh
#./cleanup_mongodb.sh

# usar mongod.conf
# security:
#    authentication: enabled
