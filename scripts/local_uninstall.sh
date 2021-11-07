#!/bin/bash
sudo systemctl disable --now RigdonOS.service
sudo rm -rf /opt/RigdonOS
sudo rm -rf /etc/systemd/system/RigdonOS.service
