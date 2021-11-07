# RigdonOS

![Screenshot of desktop](./screenshot.png)

&nbsp;

RigdonOS is an in-browser desktop environment made using React and Node.js. It started as a portfolio site, but my goal is to turn it into something usable that you could run on a server so get a web-based GUI with a small footprint.

This repo contains a docker build script that you can use to spin up a local instance and play around with the different features. There is a working terminal emulator that interacts with the server that it is being hosted on as well as a file manager that you can use to explore the filesystem of the host. There is no support for doing anything besides viewing the file structure through the file manager, but those features are in the works. Besides that, there are a few demo apps to play around with the window management system.

The desktop environment is available to play around with at https://billyrigdon.dev. You can also build locally using the build scripts contained in this repo. I recommend running it in a docker container using the docker build file until this app is production ready.

&nbsp;

# Build Steps

&nbsp;

## Prerequisites

###### At a minimum, you will need to have npm and node.js installed on your machine. It is recommended install Docker as well and run the app in a container. 

&nbsp;

#### The following will install all 3 on Manjaro and configure docker, but you can use the package manager and distro of your choice to do the same.

    sudo pacman -S npm nodejs docker
    sudo systemctl enable --now docker.service
    sudo usermod -aG docker $USER

###### Note: You may need to log out and log back in after adding yourself to the docker group.

&nbsp;

#### Clone the repo onto your local machine and navigate into the project:

    git clone https://github.com/billyrigdon/RigdonOS.git
    cd RigdonOS

&nbsp;

#### Create .env file with port number you'd like or rename example.env to use the default port

    mv ./backend/example.env ./backend/.env

&nbsp;

###### Once the application is built and running, you can open a web browser and navigate to the web GUI using your server address and port number specified in the previous step.


###### If building locally with the default port, the address would be http://127.0.0.1:1313

&nbsp;

## Automated Docker Build

&nbsp;

#### From inside the scripts directory, run the docker_build.sh script.

    cd scripts
    ./docker_build.sh

&nbsp;

## Automated Local Install

&nbsp;

#### From inside the scripts directory, run the local_build.sh script

    cd scripts
    ./local_install.sh

&nbsp;

## Manual Local Build

&nbsp;

#### Navigate into both the backend and frontend directories and install all dependencies

    cd ./backend
    npm install
    cd ../client
    npm install

###### Note: When installing the client dependencies, you will likely get some vulnerability warnings. The vulnerabilites are with the React build scripts and can be safely ignored as they aren't contained in the final build.

&nbsp;

#### In the client directory, run the React build tool to create the minified production build of the frontend.

    npm run build

&nbsp;

#### Move the build folder into the backend directory and go back to main directory

    mv ./build ../backend/build
    cd ..

&nbsp;

#### Create an app directory in /opt and move backend folder into said directory

    sudo mkdir /opt/RigdonOS
    sudo cp -r backend /opt/RigdonOS

&nbsp;

#### Copy the Systemd service file to the systemd directory and enable/start the service

    sudo cp scripts/RigdonOS.service /etc/systemd/system/RigdonOS.servce
    sudo systemctl enable --now RigdonOS.service

###### Note: The service file uses port 1313. If you're using a different port, edit the file before moving.


&nbsp;  

## Uninstall

&nbsp;

#### You can run local_uninstall.sh in the scripts directory to save yourself some time typing

    cd scripts
    ./local_uninstall.sh

&nbsp;


#### If you really want to do the typing yourself, disable the systemd service, remove the service file, and remove the project from /opt

    sudo systemctl disable --now RigdonOS.service
    sudo rm /etc/systemd/system/RigdonOS.service
    sudo rm -r /opt/RigdonOS

