# Use the latest Ubuntu base image
FROM ubuntu:latest
LABEL maintainer="billy@billyrigdon.dev"

ENV DEBIAN_FRONTEND=noninteractive

# Install dependencies
RUN apt-get update && \
    apt-get install -y xorg i3 x11-utils xvfb xpra x11-apps python3-paramiko zsh xpra curl acl sudo firefox build-essential python3-requests && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

RUN apt update \
 && DEBIAN_FRONTEND=noninteractive apt install -y wget gnupg xvfb x11-xserver-utils python3-pip \
 && pip3 install pyinotify \
 && echo "deb [arch=amd64] https://xpra.org/ jammy main" > /etc/apt/sources.list.d/xpra.list \
 && wget -q https://xpra.org/gpg.asc -O- | apt-key add - \
 && apt update \
 && DEBIAN_FRONTEND=noninteractive apt install -y xpra \
 && mkdir -p /run/user/0/xpra

# Create system users and folders
RUN useradd -m -d /RigdonOS/filesystem -s /usr/bin/zsh RigdonOS
RUN mkdir -p /RigdonOS/filesystem && \
    chown -R RigdonOS:RigdonOS /RigdonOS

# Create node_modules folder and set the permissions
RUN mkdir -p /RigdonOS/node_modules && \
    chown -R RigdonOS:RigdonOS /RigdonOS/node_modules

# Create logging folder/file
RUN mkdir -p /RigdonOS/filesystem/logs && \
    touch /RigdonOS/filesystem/logs/node-server.log && \
    chown RigdonOS:RigdonOS /RigdonOS/filesystem/logs/node-server.log && \
    chmod 0600 /RigdonOS/filesystem/logs/node-server.log

# Node setup
RUN mkdir /RigdonOS/filesystem/nvm
ENV NVM_DIR /RigdonOS/filesystem/nvm
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | HOME=/RigdonOS/filesystem bash && \
    . $NVM_DIR/nvm.sh && \
    nvm install 18 && \
    nvm alias default 18 && \
    nvm use default
ENV NODE_PATH $NVM_DIR/versions/node/v18.0.0/lib/node_modules
ENV PATH $NVM_DIR/versions/node/v18.0.0/bin:$PATH

# Set a display for x11 applications
ENV DISPLAY :20

# Copy application files into the container
WORKDIR /RigdonOS
COPY . /RigdonOS

# Modify permissions for the system user
RUN chmod 755 -R /RigdonOS && \
    chown -R RigdonOS:RigdonOS /RigdonOS && \
    setfacl -m u:RigdonOS:rwx /RigdonOS && \
    setfacl -m u:RigdonOS:rwx /RigdonOS/filesystem && \
    setfacl -m u:RigdonOS:rwx /RigdonOS/filesystem/logs

# Switch to limited permissions system user
USER RigdonOS
RUN /usr/bin/zsh -c "source $NVM_DIR/nvm.sh && npm install && npm run build"

# Expose ports
EXPOSE 10000-10100
EXPOSE 1313

# Start application
USER root
RUN chmod +x /RigdonOS/start.sh
CMD ["/RigdonOS/start.sh"]
