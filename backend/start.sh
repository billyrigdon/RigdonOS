# start.sh
#!/bin/bash
Xvfb :99 -screen 0 1280x720x16 &
echo "Debug information:"
ps aux | grep Xvfb
echo "Environment:"
env
sleep 10
x11vnc -display :99 -N -forever &
export DISPLAY=:99
node /opt/RigdonOS/dist/index.js