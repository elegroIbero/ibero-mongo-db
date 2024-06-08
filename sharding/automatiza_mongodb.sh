#!/bin/sh
ip_local=127.0.0.1
ip_cfgrs=127.0.0.12
ip_shards_01=127.0.0.13
ip_shards_02=127.0.0.14

create_directories() {
    mkdir -p ./configsvr
    mkdir -p ./shard1rs
    mkdir -p ./shard2rs
    mkdir -p ./configsvr/db1
    mkdir -p ./configsvr/db2
    mkdir -p ./configsvr/db3
    mkdir -p ./shard1rs/db1
    mkdir -p ./shard1rs/db2
    mkdir -p ./shard1rs/db3
    mkdir -p ./shard2rs/db1
    mkdir -p ./shard2rs/db2
    mkdir -p ./shard2rs/db3
    chown -R mongodb:root ./configsvr
    chown -R mongodb:root ./shard1rs
    chown -R mongodb:root ./shard2rs
}

create_configsvr(){
    mongod --configsvr --replSet cfgrs --port 40001 --dbpath ./configsvr/db1 --bind_ip $ip_cfgrs &
    mongod --configsvr --replSet cfgrs --port 40002 --dbpath ./configsvr/db2 --bind_ip $ip_cfgrs &
    mongod --configsvr --replSet cfgrs --port 40003 --dbpath ./configsvr/db3 --bind_ip $ip_cfgrs &
    sleep 10
}

init_configsvr(){
    echo "Init config server"
    config_configsvr="{_id:\"cfgrs\",configsvr:true,members:[{_id: 0,host:\"$ip_cfgrs:40001\"},{_id:1,host:\"$ip_cfgrs:40002\"},{_id:2,host:\"$ip_cfgrs:40003\"}]}"
    mongo mongodb://$ip_cfgrs:40001 --eval "rs.initiate($config_configsvr); rs.status()"
    sleep 2
}

create_shard1rs(){
    mongod --shardsvr --replSet shard1rs --port 50001 --dbpath ./shard1rs/db1 --bind_ip $ip_shards_01 &
    mongod --shardsvr --replSet shard1rs --port 50002 --dbpath ./shard1rs/db2 --bind_ip $ip_shards_01 &
    mongod --shardsvr --replSet shard1rs --port 50003 --dbpath ./shard1rs/db3 --bind_ip $ip_shards_01 &
    sleep 10
}

init_shard1rs(){
    config_shard1rs="{_id:\"shard1rs\",members:[{_id:0,host:\"$ip_shards_01:50001\"},{_id:1,host:\"$ip_shards_01:50002\"},{_id:2,host:\"$ip_shards_01:50003\"}]}"
    mongo mongodb://$ip_shards_01:50001 --eval "rs.initiate($config_shard1rs); rs.status()"
    sleep 2
}

create_shard2rs(){
    echo "Init shard 2"
    mongod --shardsvr --replSet shard2rs --port 60001 --dbpath ./shard2rs/db1 --bind_ip $ip_shards_02 &
    mongod --shardsvr --replSet shard2rs --port 60002 --dbpath ./shard2rs/db2 --bind_ip $ip_shards_02 &
    mongod --shardsvr --replSet shard2rs --port 60003 --dbpath ./shard2rs/db3 --bind_ip $ip_shards_02 &
    sleep 10
}

init_shard2rs(){
    config_shard2rs="{_id:\"shard2rs\",members:[{_id:0,host:\"$ip_shards_02:60001\"},{_id:1,host:\"$ip_shards_02:60002\"},{_id:2,host:\"$ip_shards_02:60003\"}]}"
    mongo mongodb://$ip_shards_02:60001 --eval "rs.initiate($config_shard2rs); rs.status()"
}

init_mongos(){
    mongos --configdb cfgrs/$ip_cfgrs:40001,$ip_cfgrs:40002,$ip_cfgrs:40003 --bind_ip $ip_local --port 60000 &
    sleep 10
}

add_shards() {
  mongo mongodb://$ip_local:60000 --eval "
    sh.stopBalancer();
    sh.addShard('shard1rs/$ip_shards_01:50001,$ip_shards_01:50002,$ip_shards_01:50003');
    sh.addShard('shard2rs/$ip_shards_02:60001,$ip_shards_02:60002,$ip_shards_02:60003');
    sh.status();
  " &
}

main(){
    create_directories
    create_configsvr
    init_configsvr
    create_shard1rs
    init_shard1rs
    create_shard2rs
    init_shard2rs
    init_mongos
    add_shards
    echo "Ok proceso compleado con éxito"
}

main

# mongotop 30 --uri='mongodb://elegro@127.0.0.1:60000/?authSource=dbibero'
# mongostat mongodb://elegro@127.0.0.1:60000/dbibero
# use admin
# config_admin = { user: "elegro", pwd: "p2024", roles: [ { role: "userAdminAnyDatabase", db: "admin"}, { role: "clusterMonitor", db: "admin" }]}
# db.createUser(config_admin)
