import "./Terminal.scss";
import "./xterm.css";
import React, { useRef, useEffect, useState } from "react";
import Draggable from "react-draggable";
import { gsap } from "gsap";
import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";
import io from "socket.io-client";

const fitAddon = new FitAddon();

const RigdonOSTerminal = (props) => {
	const [termClass, setTermClass] = useState("terminal-focused");
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

	//Close terminal
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
};

export default RigdonOSTerminal;
