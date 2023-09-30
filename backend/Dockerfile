FROM ubuntu:22.04 as base
RUN apt update
RUN apt install -y tzdata
ENV TZ="America/Chicago"
RUN apt update && \
    apt install -y tzdata build-essential nodejs npm vim neofetch xvfb x11-apps x11vnc libx11-dev firefox websockify matchbox-window-manager epiphany-browser
WORKDIR /opt/RigdonOS
COPY . ./
RUN rm -rf node_modules
# RUN ufw disable
RUN useradd -m -d /opt/RigdonOS rigdon
RUN chown -R rigdon:rigdon /opt/RigdonOS
USER rigdon
RUN echo neofetch >> /opt/RigdonOS/.bashrc
RUN npm install
RUN npm run build
USER root
RUN chown -R root:root /opt/RigdonOS/dist
RUN chmod -R 555 /opt/RigdonOS/dist
USER root
EXPOSE 1313 5900 8888 5999
CMD ["/bin/bash", "/opt/RigdonOS/start.sh"]