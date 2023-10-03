#!/bin/bash
. $NVM_DIR/nvm.sh
cd /RigdonOS/dist
node index.js &
tail -f /dev/null
