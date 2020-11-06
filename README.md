

## NVM Installation

curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash

wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash

export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm

nvm ls-remote

nvm use node







## MONGO Install

sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 9DA31620334BD75D9DCB49F368818C72E52529D4

echo "deb [ arch=amd64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.0.list

sudo apt-get update

sudo apt-get install -y mongodb-org


### Run MongoDB Normal Mode

sudo service mongod start

sudo service mongod stop

sudo service mongod restart

### Run MongoDB as a service

sudo systemctl start mongod.service

sudo systemctl stop mongod.service

sudo systemctl enable mongod.service




## Application Setup

npm install

npm run client-install

npm run client-build

npm install pm2 -g

pm2 start server/bin/www

# Debug Mode

DEBUG=app:* npm start


## Remote Server Configuration

### In Site Config 

```

DocumentRoot /var/www/html/

ProxyRequests off
ProxyPreserveHost On
ProxyVia Full
<Proxy *>
   Require all granted
</Proxy>

<Location />
   ProxyPass http://localhost:5000/
   ProxyPassReverse http://localhost:5000/
</Location>
RewriteEngine On

```

### Run following commands in Ubuntu server

sudo a2enmod proxy

sudo a2enmod proxy_balancer

sudo a2enmod proxy_http

sudo a2enmod proxy_wstunnel


*If your port number is blocked by firewall, then use the following command*
sudo ufw allow {PORT_NO}/tcp
