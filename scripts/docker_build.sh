#!/bin/bash
cd ..
rm -r ./backend/build;
cd ./client;
npm install
npm run build;
mv ./dist ../backend/build;
cd ../backend;
docker build -t rigdonos:latest .;
docker kill RigdonOS;
docker rm RigdonOS;
docker run -dit --name RigdonOS -p 1313:1313 rigdonos:latest;
