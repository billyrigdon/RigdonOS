#!/bin/bash
# export XDG_RUNTIME_DIR=/tmp/runtime-RigdonOS
# mkdir -p $XDG_RUNTIME_DIR
# chown RigdonOS:RigdonOS $XDG_RUNTIME_DIR
# chmod 0700 $XDG_RUNTIME_DIR
# . $NVM_DIR/nvm.sh
# cd /RigdonOS/dist
# node index.js
xpra start --bind-tcp=0.0.0.0:10000 --start="firefox" --no-daemon
