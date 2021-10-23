FROM archlinux as base
WORKDIR /opt/RigdonOS
COPY . ./
RUN pacman -Syu --noconfirm
RUN pacman -S nodejs npm --noconfirm
RUN npm install
EXPOSE 1313 
CMD ["node", "index.js"]
