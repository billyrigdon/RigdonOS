#!/bin/bash
rm -r ./backend/build;
cd ./client;
npm install
npm run build;
mv ./build ../backend/build;
cd ../backend;
npm start;
