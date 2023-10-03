import "./Terminal.scss";
import "./xterm.scss";
import React, { useRef, useEffect, useState } from "react";
import Draggable from "react-draggable";
import { gsap } from "gsap";
import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";
import io from "socket.io-client";
import { Props } from "../App/App";

const RigdonOSTerminal = (props: Props) => {
	const [termClass, setTermClass] = useState("terminal-focused");
	const URL = "http://localhost:1313/pty"; // Connect to the '/pty' namespace
	const termRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		// Create a websocket connection specifically to the '/pty' namespace
		const socket = io(URL);

		const term = new Terminal({
			convertEol: true,
			fontFamily: `'Fira Mono', monospace`,
			fontSize: 15,
			fontWeight: 900,
		});

		const fitAddon = new FitAddon();
		term.loadAddon(fitAddon);

		term.setOption("theme", {
			background: "black",
			foreground: "white",
		});

		term.onData((data) => {
			socket.emit("input", data);
		});

		socket.on("output", (data) => {
			term.write(data);
		});

		if (termRef.current !== null) {
			const termDiv = termRef.current;
			term.open(termDiv);
			fitAddon.fit();
		}

		return () => {
			socket.disconnect();
		};
	}, []);

	const closeTerminal = () => {
		props.openTerminal(props.terminalOpen);
	};

	const focusTerminal = () => {
		setTermClass("terminal-focused");
	};

	const blurTerminal = () => {
		setTermClass("terminal-app");
	};

	const windowRef = useRef(null);

	useEffect(() => {
		gsap.from(windowRef.current, {
			y: 300,
			x: 50,
			duration: 0.2,
		});
	}, [props.terminalOpen]);

	if (props.isMobile) {
		return (
			<div className="maximized">
				<div className="windowBar">
					<div className="windowButtons minimize" onClick={closeTerminal}></div>
					<div className="windowButtons close" onClick={closeTerminal}></div>
				</div>
				<div id="terminal-window">
					<div ref={termRef}></div>
				</div>
			</div>
		);
	} else {
		return (
			<Draggable>
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
						<div className="windowButtons close" onClick={closeTerminal}></div>
					</div>
					<div id="terminal-window">
						<div ref={termRef}></div>
					</div>
				</div>
			</Draggable>
		);
	}
};

export default RigdonOSTerminal;

// import "./Terminal.scss";
// import "./xterm.scss";
// import React, { useRef, useEffect, useState } from "react";
// import Draggable from "react-draggable";
// import { gsap } from "gsap";
// import { Terminal } from "xterm";
// import { FitAddon } from "xterm-addon-fit";
// import io from "socket.io-client";
// import { Props } from "../App/App";

// const RigdonOSTerminal = (props: Props) => {
// 	const [termClass, setTermClass] = useState("terminal-focused");
// 	const URL = "http://localhost:1313";
// 	const termRef = useRef<HTMLDivElement>(null);

// 	useEffect(() => {
// 		//Create websocket
// 		const socket = io(URL);

// 		//Create xterm terminal
// 		const term = new Terminal({
// 			convertEol: true,
// 			fontFamily: `'Fira Mono', monospace`,
// 			fontSize: 15,
// 			fontWeight: 900,
// 		});

// 		//Use fit addon so terminal takes up all available space
// 		const fitAddon = new FitAddon();
// 		term.loadAddon(fitAddon);

// 		term.options;

// 		//Set theme
// 		term.setOption("theme", {
// 			background: "black",
// 			foreground: "white",
// 		});

// 		//On input, send to socket backend
// 		term.onData((data) => {
// 			socket.emit("input", data);
// 		});

// 		//When data is received from backend, write to terminal
// 		socket.on("output", (data) => {
// 			term.write(data);
// 		});

// 		//Attach terminal to #terminal-window
// 		if (termRef.current !== null) {
// 			const termDiv = termRef.current;
// 			term.open(termDiv);
// 			fitAddon.fit();
// 		}

// 		//Kill socket when component unmounts
// 		return () => {
// 			socket.disconnect;
// 		};
// 	}, []);

// 	//Close terminal
// 	const closeTerminal = () => {
// 		props.openTerminal(props.terminalOpen);
// 	};

// 	//Changes z-index of window to bring to front if in focus
// 	const focusTerminal = () => {
// 		setTermClass("terminal-focused");
// 	};

// 	const blurTerminal = () => {
// 		setTermClass("terminal-app");
// 	};

// 	const windowRef = useRef(null);

// 	//Opening animation
// 	useEffect(() => {
// 		gsap.from(windowRef.current, {
// 			y: 300,
// 			x: 50,
// 			duration: 0.2,
// 		});
// 	}, [props.terminalOpen]);

// 	if (props.isMobile) {
// 		return (
// 			<div className="maximized">
// 				<div className="windowBar">
// 						<div
// 							className="windowButtons minimize"
// 							onClick={closeTerminal}
// 						></div>
// 						<div
// 							className="windowButtons close"
// 							onClick={closeTerminal}
// 						></div>
// 					{/* <div
// 						id="terminal"
// 						className={termClass}
// 						tabIndex={0}
// 						onFocus={focusTerminal}
// 						onBlur={blurTerminal}
// 						ref={windowRef}
// 					> */}

// 					</div>
// 					<div id="terminal-window">
// 						<div ref={termRef}></div>
// 					</div>
// 				</div>
// 			// </div>
// 		);
// 	} else {
// 		return (
// 			<Draggable>
// 				<div
// 					id="terminal"
// 					className={termClass}
// 					tabIndex={0}
// 					onFocus={focusTerminal}
// 					onBlur={blurTerminal}
// 					ref={windowRef}
// 				>
// 					<div className="windowBar">
// 						<div
// 							className="windowButtons minimize"
// 							onClick={closeTerminal}
// 						></div>
// 						<div
// 							className="windowButtons close"
// 							onClick={closeTerminal}
// 						></div>
// 					</div>
// 					<div id="terminal-window">
// 						<div ref={termRef}></div>
// 					</div>
// 				</div>
// 			</Draggable>
// 		);
// 	}
// };

// export default RigdonOSTerminal;
