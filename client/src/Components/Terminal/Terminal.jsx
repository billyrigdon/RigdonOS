import "./Terminal.scss";
import "./xterm.css";
import React, { useRef, Component, useEffect, useState } from "react";
import ReactTerminal from "react-terminal-component";
import Draggable, { DraggableCore } from "react-draggable";
import { gsap } from "gsap";
import {
	BrowserView,
	MobileView,
	isBrowser,
	isMobile,
} from "react-device-detect";
import axios from "axios";
import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";
import io from "socket.io-client";

const fitAddon = new FitAddon();

const RigdonOSTerminal = (props) => {
	const [termClass, setTermClass] = useState("terminal-focused");
	const [maximized, setMaximized] = useState(false);
	const [termHistory, setTermHistory] = useState([]);
	const [command, setCommand] = useState("");
	const [workingDir, setWorkingDir] = useState("");
	const URL = "http://127.0.0.1:1313";
	const termRef = useRef();

	useEffect(() => {
		console.log("test");
		//Create websocket
		const socket = io(URL);

		//Create xterm terminal
		const term = new Terminal({
			convertEol: true,
			fontFamily: `'Fira Mono', monospace`,
			fontSize: 15,
			fontWeight: 900,
			//scrollback: 50,
			// rendererType: "dom" // default is canvas
		});

		//Use fit addon so terminal takes up all available space
		term.loadAddon(fitAddon);

		//Set theme
		term.setOption("theme", {
			background: "black",
			foreground: "white",
		});

		//On input, send to socket backend
		term.onData((data) => {
			socket.emit("input", data);
		});

		//When data is received from backend, write to terminal
		socket.on("output", (data) => {
			term.write(data);
		});

		//Attach terminal to #terminal-window
		const termDiv = termRef.current;
		term.open(termDiv);
		fitAddon.fit();

		//Kill socket when component unmounts
		return () => socket.disconnect;
	}, []);

	//Maximize Terminal Window
	const maxTerm = () => {
		if (termClass !== "maximized") {
			setTermClass("maximized");
			setMaximized(true);
		} else {
			setTermClass("terminal-focused");
			setMaximized(false);
		}
	};

	//Close terminal
	//Need to add logic for socket disconnect
	const closeTerminal = () => {
		props.openTerminal(props.terminalOpen);
		console.log(props);
	};

	//Changes z-index of window to bring to front if in focus
	const focusTerminal = () => {
		setTermClass("terminal-focused");
	};

	const blurTerminal = () => {
		setTermClass("terminal-app");
	};

	const windowRef = useRef();

	//Opening animation
	useEffect(() => {
		gsap.from(windowRef.current, {
			y: 300,
			x: 50,
			duration: 0.2,
		});
	}, [props.terminalOpen]);

	//Maximize window by default if mobile
	useEffect(() => {
		if (isMobile) {
			setTermClass("maximized");
			setMaximized(true);
		}
	});

	if (!maximized) {
		return (
			<Draggable className="window">
				<div
					id="terminal"
					className={termClass}
					tabIndex={0}
					onFocus={focusTerminal}
					onBlur={blurTerminal}
					ref={windowRef}
				>
					<div className="windowBar">
						<div
							className="windowButtons minimize"
							onClick={closeTerminal}
						></div>
						<div
							className="windowButtons maximize"
							onClick={maxTerm}
						></div>
						<div
							className="windowButtons close"
							onClick={closeTerminal}
						></div>
					</div>
					<div id="terminal-window">
						<div ref={termRef}></div>
					</div>
				</div>
			</Draggable>
		);
	} else if (maximized) {
		return (
			<div id="terminal" className={termClass}>
				<div className="windowBar">
					<div
						className="windowButtons minimize"
						onClick={closeTerminal}
					></div>
					<div
						className="windowButtons maximize"
						onClick={maxTerm}
					></div>
					<div
						className="windowButtons close"
						onClick={closeTerminal}
					></div>
				</div>
				<ReactTerminal
					theme={{
						background: "#141313",
						promptSymbolColor: "#6effe6",
						commandColor: "#fcfcfc",
						outputColor: "#fcfcfc",
						errorOutputColor: "#ff89bd",
						fontSize: "1.1rem",
						spacing: "1%",
						fontFamily: "monospace",
						width: "100%",
						height: "100%",
					}}
				/>
			</div>
		);
	}
};

export default RigdonOSTerminal;
