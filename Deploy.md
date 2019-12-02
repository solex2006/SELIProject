cd ..
cd .deploy
export METEOR_ALLOW_SUPERUSER=true
mup setup
sudo mup start
mup deploy
