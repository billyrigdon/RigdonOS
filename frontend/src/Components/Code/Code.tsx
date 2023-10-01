

// import { useEffect, useState } from "react";
// import Draggable from "react-draggable";
// import "./Browser.scss";
// import React from "react";
// import { Props } from "../App/App";
// import ReactDOM from "react-dom";
// import RFB from "@novnc/novnc/core/rfb";
// import { io } from "socket.io-client";

// const Code = (props: Props) => {
// 	const [frame, setFrame] = useState<Buffer | null>(null);
// 	const container = document.getElementById("noVNCContainer");
// 	const [maximized, setMaximized] = useState(true);
// 	const [codeClass, setCodeClass] = useState("code-focused");

// 	const rfb = new RFB(
// 		document.getElementById("noVNCContainer"),
// 		"ws://localhost:1313/vnc"
// 	);

// 	const closeCode = () => {
// 		props.openCode(props.codeOpen);
// 		console.log(props);
// 	};

// 	const setMax = () => {
// 		if (maximized) {
// 			setMaximized(false);
// 		} else if (!maximized) {
// 			setMaximized(true);
// 		}
// 	};

// 	const focusCode = () => {
// 		setCodeClass("code-focused");
// 	};

// 	const blurBrowser = () => {
// 		setCodeClass("code");
// 	};

// 	useEffect(() => {
// 		const socket = io("http://localhost:1313");

// 		rfb.addEventListener("connect", () => {
// 			console.log("Connected to VNC server");
// 			if (container) {
// 				rfb._resize(container.clientWidth, container.clientHeight);
// 			}
// 			// Emit an event to the server to launch the xclock app
// 			socket.emit("launchCode");
// 		});

// 		rfb.addEventListener("disconnect", () => {
// 			socket.emit("close");
// 		});

// 		return () => {
// 			// Cleanup
// 			rfb.disconnect();
// 		};
// 	}, []);

// 	if (!maximized) {
// 		return (
// 			<Draggable>
// 				<div
// 					id="browser-window"
// 					className={codeClass}
// 					tabIndex={0}
// 					onFocus={focusCode}
// 					onBlur={blurCode}
// 				>
// 					<div className="windowBar">
// 						<div
// 							className="windowButtons minimize"
// 							onClick={closeCode}
// 						></div>
// 						<div className="windowButtons maximize" onClick={setMax}></div>
// 						<div className="windowButtons close" onClick={closeCode}></div>
// 					</div>
// 					<div
// 						id="noVNCContainer"
// 						style={{ width: "100%", height: "100%" }}
// 					></div>
// 				</div>
// 			</Draggable>
// 		);
// 	} else {
// 		return (
// 			<div
// 				id="browser-window"
// 				className="maximized"
// 				tabIndex={0}
// 				onFocus={focusBrowser}
// 				onBlur={blurBrowser}
// 			>
// 				<div className="windowBar">
// 					<div className="windowButtons minimize" onClick={closeBrowser}></div>
// 					<div className="windowButtons maximize" onClick={setMax}></div>
// 					<div className="windowButtons close" onClick={closeBrowser}></div>
// 				</div>
// 				<div
// 					id="noVNCContainer"
// 					style={{ width: "100%", height: "100%" }}
// 				></div>
// 			</div>
// 		);
// 	}
// };

// export default Code;
