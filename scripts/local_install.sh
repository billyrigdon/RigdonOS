#!/bin/bash
cd ..
rm -r ./backend/client;
cd ./frontend;
npm install
npm run build;
mv ./dist ../backend/client;
cd ../backend
npm install
npm run build
sudo mkdir /opt/RigdonOS
sudo cp -r ./dist/* /opt/RigdonOS
sudo cp ../scripts/RigdonOS.service /etc/systemd/system/RigdonOS.service
sudo systemctl enable --now RigdonOS.service
