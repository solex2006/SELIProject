# Installation

## Tested on

Ubuntu Server 18.04

## Steps
### 1. Install Java
run: 

```
sudo add-apt-repository ppa:linuxuprising/java
sudo apt update
sudo apt install oracle-java13-installer
```
### 2. Install and configure Postgres
Install postgres:
```
wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -
sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt/ bionic-pgdg main" > \
/etc/apt/sources.list.d/postgresql.list'
echo "deb http://apt.postgresql.org/pub/repos/apt/ `lsb_release -cs`-pgdg main" |sudo tee  /etc/apt/sources.list.d/pgdg.list
sudo apt update
sudo apt install postgresql-12 postgresql-client-12

```
Change postgres password, create torodb role and torod database:
```
sudo su - postgres
psql
\password postgres
<Enter your password>
CREATE ROLE torodb WITH
		LOGIN
		SUPERUSER
		CREATEDB
		CREATEROLE
		INHERIT
		NOREPLICATION
		CONNECTION LIMIT -1;
CREATE DATABASE torod WITH
		OWNER = torodb
		ENCODING = 'UTF8'
		CONNECTION LIMIT = -1;
\q

```
###3. Download and configure Metabase:
Download the JAR file:
run:
```
wget https://downloads.metabase.com/v0.34.3/metabase.jar
```
Move metabase:
```
sudo mkdir -p /apps/java
sudo cp metabase.jar /apps/java
```
Create group:
```
sudo groupadd -r appmgr
sudo useradd -r -s /bin/false -g appmgr appmgr
```
Copy metabase files from GitHub project to same folder:
```
cp -r <location>/SELIProject/Learning\ Analytics/Metabase/* /apps/java/
```
Give this user ownership permission to the applications directory:
```
sudo chown -R appmgr:appmgr /apps/java
```
Create a systemd service unit file:
```
sudo nano /etc/systemd/system/metabase.service
```
Copy-Paste and save (ctrl + x : y):
```
[Unit]
Description=Metabase application service
Documentation=https://www.metabase.com/docs/latest

[Service]
WorkingDirectory=/apps/java
ExecStart=/usr/bin/java -Xms128m -Xmx256m -jar metabase.jar
User=appmgr
Type=simple
Restart=on-failure
RestartSec=10

[Install]
WantedBy=multi-user.target
```
Start service:
```
sudo systemctl daemon-reload
sudo systemctl enable metabase.service
sudo systemctl start metabase.service
```
Warning: By default Metabase works on port 3000, you can change it by following the instructions below:
https://www.metabase.com/docs/latest/operations-guide/customizing-jetty-webserver.html 
###4. Download and configure ToroDB:
Enter the following commands to download:
```
wget https://www.torodb.com/download/torodb-stampede-latest.tar.bz2
tar -xvf torodb-stampede-latest.tar.bz2
```
Copy ToroDB config files from GitHub project to same folder:
```
cp <Location>/SELIProject/Learning\ Analytics/ToroDB/torodb-stampede.yml <ToroDb Location>/torodb-stampede-1.0.0/bin/
cp <Location>/SELIProject/Learning\ Analytics/ToroDB/.toropass ~/
```
**To configure toroDB as a service you can follow the instructions on the following link:**
https://www.torodb.com/stampede/docs/1.0.0/installation/binaries/ 
To run ToroDb you can use the following command:
```
cd <ToroDB location>
./torodb-stampede-1.0.0/bin/torodb-stampede -c torodb-stampede-1.0.0/bin/torodb-stampede.yml
```
###5. Edit MUP configuration file
Config file: SELIProject/SELI-Platform/.deploy/settings.json
Add the following lines:
```
"public": {
    "METABASE_DOMAIN": "http://localhost:3000",
    "METABASE_KEY":"790ed9c1e1154c0072716babff490b51b2fd36df6322d9efd225c37a99fe6dc7"
}
```

## SSL Certificate

Visit https://www.sslforfree.com/ for free certificate.
### Using Free Let’s Encrypt SSL/TLS Certificates with NGINX
https://www.nginx.com/blog/using-free-ssltls-certificates-from-lets-encrypt-with-nginx/


