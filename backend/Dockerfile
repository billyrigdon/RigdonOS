FROM archlinux as base
WORKDIR /opt/RigdonOS
COPY . ./
RUN rm -rf node_modules
RUN pacman -Syu --noconfirm
RUN pacman -Sy base-devel --noconfirm
RUN pacman -S nodejs npm --noconfirm
RUN npm install
RUN npm run build
EXPOSE 1313 
CMD ["node", "/opt/RigdonOS/dist/index.js"]
