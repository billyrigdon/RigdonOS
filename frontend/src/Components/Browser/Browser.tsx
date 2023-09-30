import { useEffect, useState } from "react";
import Draggable from "react-draggable";
import "./Browser.scss";
import React from "react";
import { Props } from "../App/App";
import ReactDOM from "react-dom";
import RFB from "@novnc/novnc/core/rfb";
import { io } from "socket.io-client";

const Browser: React.FC = () => {
	const [frame, setFrame] = useState<Buffer | null>(null);

	useEffect(() => {
		const rfb = new RFB(
			document.getElementById("noVNCContainer"),
			"ws://localhost:1313/vnc"
		);

		const socket = io("http://localhost:1313");

		rfb.addEventListener("connect", () => {
			console.log("Connected to VNC server");
			// Emit an event to the server to launch the xclock app
			socket.emit("launchBrowser");
		});

		rfb.addEventListener("disconnect", () => {
			socket.emit("close");
		});

		return () => {
			// Cleanup
			rfb.disconnect();
		};
	}, []);

	return (
		<Draggable>
			<div id="noVNCContainer" style={{ width: "100%", height: "100%" }}></div>
		</Draggable>
	);
};

export default Browser;
