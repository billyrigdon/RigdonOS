import { useEffect, useState } from "react";
import Draggable from "react-draggable";
import "./Browser.scss";
import React from "react";
import { Props } from "../App/App";
import ReactDOM from "react-dom";
import RFB from "@novnc/novnc/core/rfb";
import { io } from "socket.io-client";

const Browser = (props: Props) => {
	const [frame, setFrame] = useState<Buffer | null>(null);
	const container = document.getElementById("noVNCContainer");
	const [maximized, setMaximized] = useState(true);
	const [browserClass, setBrowserClass] = useState("browser-focused");

	const rfb = new RFB(
		document.getElementById("noVNCContainer"),
		"ws://localhost:1313/vnc"
	);

	const closeBrowser = () => {
		props.openBrowser(props.browserOpen);
		console.log(props);
	};

	const setMax = () => {
		if (maximized) {
			setMaximized(false);
		} else if (!maximized) {
			setMaximized(true);
		}
	};

	const focusBrowser = () => {
		setBrowserClass("browser-focused");
	};

	const blurBrowser = () => {
		setBrowserClass("browser");
	};

	useEffect(() => {
		const socket = io("http://localhost:1313");

		rfb.addEventListener("connect", () => {
			socket.emit("launchCode");
			setTimeout(() => {
				if (container) {
					rfb._resize(container.clientWidth, container.clientHeight);
					rfb.resizeSession = true;
					rfb.scaleViewport = true;
					const appScreen = document.getElementById("noVNCContainer");
					if (appScreen) {
						const dimensions = {
							width: appScreen.clientWidth,
							height: appScreen.clientHeight,
						};
						socket.emit("resizeApp", JSON.stringify(dimensions));
					}
				}
			}, 2000);
		});

		rfb.addEventListener("disconnect", () => {
			socket.emit("close");
		});

		window.addEventListener("resize", () => {
			if (container) {
				const dimensions = {
					width: container.clientWidth,
					height: container.clientHeight,
				};
				socket.emit("resizeApp", JSON.stringify(dimensions));
			}
		});

		return () => {
			rfb.disconnect();
		};
	}, []);

	if (!maximized) {
		return (
			<Draggable>
				<div
					id="browser-window"
					className={browserClass}
					tabIndex={0}
					onFocus={focusBrowser}
					onBlur={blurBrowser}
				>
					<div className="windowBar">
						<div
							className="windowButtons minimize"
							onClick={closeBrowser}
						></div>
						<div className="windowButtons maximize" onClick={setMax}></div>
						<div className="windowButtons close" onClick={closeBrowser}></div>
					</div>
					<div
						id="noVNCContainer"
						style={{ width: "100%", height: "100%" }}
					></div>
				</div>
			</Draggable>
		);
	} else {
		return (
			<div
				id="browser-window"
				className={browserClass + " maximized"}
				tabIndex={0}
				onFocus={focusBrowser}
				onBlur={blurBrowser}
			>
				<div className="windowBar">
					<div className="windowButtons minimize" onClick={closeBrowser}></div>
					<div className="windowButtons maximize" onClick={setMax}></div>
					<div className="windowButtons close" onClick={closeBrowser}></div>
				</div>
				<div
					id="noVNCContainer"
					style={{ width: "100%", height: "100%" }}
				></div>
			</div>
		);
	}
};

export default Browser;
