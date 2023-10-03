#!/bin/bash
cd ..
rm -r ./backend/client;
cd ./frontend;
npm install;
npm run build;
mv ./dist ../backend/client;
cd ../backend;
docker build -t billyrigdoniii/rigdonos:latest .;
docker kill RigdonOS;
docker rm RigdonOS;
docker run -dit --restart always --name RigdonOS -p 1313:1313 -p 8888:8888 -p 5999:5999 billyrigdoniii/rigdonos:latest;
