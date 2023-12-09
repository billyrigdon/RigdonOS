FROM ubuntu:22.04 as base
RUN apt update
RUN apt install -y tzdata
ENV TZ="America/Chicago"
RUN apt install -y build-essential
RUN apt install -y nodejs npm vim 
RUN apt install -y neofetch
RUN apt-get purge -y openssh-client
WORKDIR /opt/RigdonOS
COPY . ./
RUN rm -rf node_modules
RUN useradd -m -d /opt/RigdonOS rigdon
RUN chown -R rigdon:rigdon /opt/RigdonOS
USER rigdon
RUN echo neofetch >> /opt/RigdonOS/.bashrc
RUN npm install
RUN npm run build
USER root
RUN chown -R root:root /opt/RigdonOS/dist
RUN chmod -R 555 /opt/RigdonOS/dist
USER rigdon
EXPOSE 1313 
CMD ["node", "/opt/RigdonOS/dist/index.js"]
