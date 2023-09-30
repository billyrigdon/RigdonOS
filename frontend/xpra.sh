#!/bin/bash
# Set display number (choose any number, e.g., 100)
DISPLAY=:100

# Launch Xpra
xpra start $DISPLAY

# Launch your X11 application
DISPLAY=$DISPLAY xclock &  # Replace xclock with your application

# Attach local display to Xpra
xpra attach $DISPLAY

