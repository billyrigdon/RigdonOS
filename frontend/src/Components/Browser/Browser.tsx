import React, { useEffect, useState } from "react";
import Draggable from "react-draggable";
import { io } from "socket.io-client";
import { Props } from "../App/App";
import "./Browser.scss";

const Browser = (props: Props) => {
	const [connectionString, setConnectionString] = useState<string | null>(null);
	const [maximized, setMaximized] = useState(false);
	const [browserClass, setBrowserClass] = useState("browser-focused");

	const closeBrowser = () => {
		props.openBrowser(props.browserOpen);
	};

	const setMax = () => {
		setMaximized(!maximized);
	};

	const focusBrowser = () => {
		setBrowserClass("browser-focused");
	};

	const blurBrowser = () => {
		setBrowserClass("browser");
	};

	const removeFloatMenu = () => {
		setTimeout(() => {
			const floatMenuElement = document.getElementById("float_menu");
			console.log(floatMenuElement);
			if (floatMenuElement) {
				floatMenuElement.remove();
			}
		}, 500);
	};

	useEffect(() => {

	}, []);

	return (
		<Draggable>
			<div
				id="browser-window"
				className={maximized ? `${browserClass} maximized` : browserClass}
				tabIndex={0}
				onFocus={focusBrowser}
				onBlur={blurBrowser}
			>
				<div className="windowBar">
					<div className="windowButtons minimize" onClick={closeBrowser}></div>
					<div className="windowButtons maximize" onClick={setMax}></div>
					<div className="windowButtons close" onClick={closeBrowser}></div>
				</div>
				<div style={{ width: "100%", height: "100%" }}>
					{connectionString ? (
						<iframe
							onLoad={removeFloatMenu}
							src={connectionString}
							style={{ width: "100%", height: "100%" }}
						/>
					) : null}
				</div>
			</div>
		</Draggable>
	);
};

export default Browser;

// import { useEffect, useState } from "react";
// import Draggable from "react-draggable";
// import "./Browser.scss";
// import React from "react";
// import { Props } from "../App/App";
// import ReactDOM from "react-dom";
// import RFB from "@novnc/novnc/core/rfb";
// import { io } from "socket.io-client";

// const Browser = (props: Props) => {
// 	const [frame, setFrame] = useState<Buffer | null>(null);

// 	const [maximized, setMaximized] = useState(false);
// 	const [browserClass, setBrowserClass] = useState("browser-focused");

// 	const closeBrowser = () => {
// 		props.openBrowser(props.browserOpen);
// 		console.log(props);
// 	};

// 	const setMax = () => {
// 		if (maximized) {
// 			setMaximized(false);
// 		} else if (!maximized) {
// 			setMaximized(true);
// 		}
// 	};

// 	const focusBrowser = () => {
// 		setBrowserClass("browser-focused");
// 	};

// 	const blurBrowser = () => {
// 		setBrowserClass("browser");
// 	};

// 	useEffect(() => {
// 		const container = document.getElementById("noVNCContainer");
// 		const socket = io("http://localhost:1313");
// 		const rfb = new RFB(
// 			document.getElementById("noVNCContainer"),
// 			"ws://localhost:1313/vnc"
// 		);
// 		socket.emit("launchBrowser");

// 		rfb.addEventListener("connection", () => {
// 			socket.emit("launchBrowser");
// 			setTimeout(() => {
// 				if (container) {
// 					rfb._resize(container.clientWidth, container.clientHeight);
// 					rfb.resizeSession = true;
// 					rfb.scaleViewport = true;
// 					const appScreen = document.getElementById("noVNCContainer");
// 					if (appScreen) {
// 						const dimensions = {
// 							width: appScreen.clientWidth,
// 							height: appScreen.clientHeight,
// 						};
// 						socket.emit("resizeApp", JSON.stringify(dimensions));
// 					}
// 				}
// 			}, 2000);
// 		});

// 		rfb.addEventListener("disconnect", () => {
// 			socket.emit("close");
// 		});

// 		window.addEventListener("resize", () => {
// 			if (container) {
// 				const dimensions = {
// 					width: container.clientWidth,
// 					height: container.clientHeight,
// 				};
// 				socket.emit("resizeApp", JSON.stringify(dimensions));
// 			}
// 		});

// 		return () => {
// 			rfb.disconnect();
// 		};
// 	}, []);

// 	if (!maximized) {
// 		return (
// 			<Draggable>
// 				<div
// 					id="browser-window"
// 					className={browserClass}
// 					tabIndex={0}
// 					onFocus={focusBrowser}
// 					onBlur={blurBrowser}
// 				>
// 					<div className="windowBar">
// 						<div
// 							className="windowButtons minimize"
// 							onClick={closeBrowser}
// 						></div>
// 						<div className="windowButtons maximize" onClick={setMax}></div>
// 						<div className="windowButtons close" onClick={closeBrowser}></div>
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
// 				className={browserClass + " maximized"}
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

// export default Browser;
