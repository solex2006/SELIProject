# Deploy

## Create .deploy folder

```
cd SELI-Platform
mkdir .deploy
cd .deploy
```

## Before Deployment

run: ```mup init```

In mup.js file:

- Configurations can be found in: http://meteor-up.com/docs.html 
- If node version gives problems. For meteor v1.8.1, use abernix/meteor:node-8.15.1-base.

### SSL Certificate

Visit https://www.sslforfree.com/ for free certificate.

- Use "public" folder to storage files generated in the link above.
- Store generated certificates in ".deploy" folder and configure ssl code lines in "mup.js" file.

## Deployment

After right configurations run:

```
export METEOR_ALLOW_SUPERUSER=true
mup setup
sudo mup start
mup deploy
```
