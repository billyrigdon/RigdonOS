FROM archlinux as base
RUN pacman -Syu --noconfirm
RUN pacman -Sy base-devel --noconfirm
RUN pacman -S nodejs npm vim --noconfirm
WORKDIR /opt/RigdonOS
COPY . ./
RUN rm -rf node_modules
RUN useradd -m -d /opt/RigdonOS rigdon
RUN chown -R rigdon:rigdon /opt/RigdonOS
USER rigdon
RUN npm install
RUN npm run build
USER root
RUN chown -R root:root /opt/RigdonOS/dist
RUN chmod -R 555 /opt/RigdonOS/dist
USER rigdon
EXPOSE 1313 
CMD ["node", "/opt/RigdonOS/dist/index.js"]
