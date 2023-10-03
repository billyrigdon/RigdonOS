FROM archlinux:latest
LABEL maintainer="billy@billyrigdon.dev"

# Install Deps
RUN pacman -Syu --noconfirm && \
    pacman -S --noconfirm zsh xpra xvfb base-devel curl acl sudo && \
    pacman -Scc --noconfirm

# Create system users and folders to obfuscate from underlying Arch install
RUN useradd -m -d /RigdonOS/filesystem -s /usr/bin/zsh RigdonOS
RUN mkdir -p /RigdonOS/filesystem && \
    chown -R RigdonOS:RigdonOS /RigdonOS/filesystem

# Create logging folder/file
RUN mkdir -p /RigdonOS/filesystem/logs && \
    touch /RigdonOS/filesystem/logs/node-server.log && \
    chown RigdonOS:RigdonOS /RigdonOS/filesystem/logs/node-server.log && \
    chmod 0600 /RigdonOS/filesystem/logs/node-server.log

# Node setup
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

# Copy application files into container
WORKDIR /RigdonOS
COPY . /RigdonOS

# Modify permissions for system user to only have access to the obfuscated filesystem 
RUN chmod 750 -R /RigdonOS && \
    chown -R root:RigdonOS /RigdonOS && \
    setfacl -m u:RigdonOS:rx /RigdonOS && \
    setfacl -m u:RigdonOS:rwx /RigdonOS/filesystem

# Switch to limited permissions system user
USER RigdonOS
RUN /usr/bin/zsh -c "source $NVM_DIR/nvm.sh && npm install && npm run build"

# Allows up to 100 xpra apps simultaneously
EXPOSE 10000-10100
EXPOSE 1313

# Start application
USER root
RUN chmod +x /RigdonOS/start.sh
CMD ["/RigdonOS/start.sh"]