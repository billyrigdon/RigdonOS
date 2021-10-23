#!/bin/bash
rm -r ./backend/build;
cd ./client;
npm install
npm run build;
mv ./build ../backend/build;
cd ../backend;
docker build -t rigdonos:latest .;