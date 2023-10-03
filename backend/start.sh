#!/bin/bash
. $NVM_DIR/nvm.sh
cd /app/dist
node index.js &
tail -f /dev/null
