# Deploy


## Before Deployment

run: 

```
cd SELI-Platform
sudo npm install
mkdir .deploy
cd .deploy
mup init
```

### Configuring mup.js

In "mup.js" file:

- Configurations can be found in: http://meteor-up.com/docs.html 
- If node version gives problems. For meteor v1.8.1, use abernix/meteor:node-8.15.1-base.

### SSL Certificate

Visit https://www.sslforfree.com/ for free certificate.

- Use "public" folder to store files generated in the link above.
- Store generated certificates in ".deploy" folder and configure ssl code lines in "mup.js" file.

### Mail Server

In ".deploy/settings.json" fill the variables according with the parameters of your mail server, in this way:

```
{
  "private": {
    "SMTP_DOMAIN": "smtp.example.com",
    "SMTP_PORT": "25",
    "SMTP_USER" : "smtp.user@example.com",
    "SMTP_USER_PASSWORD": "****"
  }
}
```

## Deployment

After right configurations run:

```
export METEOR_ALLOW_SUPERUSER=true
mup setup
sudo mup start
mup deploy
```
