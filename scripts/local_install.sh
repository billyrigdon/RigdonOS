#!/bin/bash

export DEBIAN_FRONTEND=noninteractive
export DISPLAY=:20
sudo apt-get install -y vim git i3 xorg x11-utils xvfb xpra x11-apps python3-paramiko zsh xpra curl acl sudo firefox build-essential python3-requests wget gnupg x11-xserver-utils python3-pip 
sudo systemctl enable --now xpra.service
git clone https://github.com/billyrigdon/RigdonOS.git ~/RigdonOS
cd ~/RigdonOS/frontend
npm install
npm run build
cp -r ~/RigdonOS/frontend/dist ~/RigdonOS/backend/client
cd ~/RigdonOS/backend
npm install
npm run build
sudo cp ~/RigdonOS/scripts/RigdonOS.service /etc/systemd/system/RigdonOS.service
wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
sudo dpkg -i google-chrome-stable_current_amd64.deb

# cd ..
# rm -r ./backend/client;
# cd ./frontend;
# npm install
# npm run build;
# mv ./dist ../backend/client;
# cd ../backend
# npm install
# npm run build
# sudo mkdir /opt/RigdonOS
# sudo cp -r ./dist/* /opt/RigdonOS
# sudo cp ../scripts/RigdonOS.service /etc/systemd/system/RigdonOS.service
# sudo systemctl enable --now RigdonOS.service
