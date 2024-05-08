## Instar MongoDB Community Edition (WSL Ubuntu 22.04)

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
