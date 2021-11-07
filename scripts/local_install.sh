#!/bin/bash
cd ..
rm -r ./backend/build;
cd ./client;
npm install
npm run build;
mv ./build ../backend/build;
cd ..
sudo mkdir /opt/RigdonOS
sudo cp -r ./backend /opt/RigdonOS
sudo cp ./scripts/RigdonOS.service /etc/systemd/system/RigdonOS.service
sudo systemctl enable --now RigdonOS.service
