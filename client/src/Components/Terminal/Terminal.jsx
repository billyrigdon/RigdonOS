import React, { useRef, Component, useEffect, useState } from "react";
import ReactTerminal from "react-terminal-component";
import Draggable, { DraggableCore } from "react-draggable";
import "./Terminal.scss";
import { gsap } from "gsap";
import {
	BrowserView,
	MobileView,
	isBrowser,
	isMobile,
} from "react-device-detect";
import axios from "axios";

const Terminal = (props) => {
	const [termClass, setTermClass] = useState("terminal-focused");
	const [maximized, setMaximized] = useState(false);
	const [termHistory, setTermHistory] = useState([]);
	const [command, setCommand] = useState("");
	const [workingDir, setWorkingDir] = useState("");
	const URL = "http://127.0.0.1:1313";

	const sendCommand = async (e) => {
		e.preventDefault();

		const output = await axios.post(URL + "/api/terminal/command", {
			command: command,
		});

		setTermHistory([
			...termHistory,
			workingDir + ":root>" + command,
			...output.data.output,
		]);
		setCommand("");
		getWorkingDir();
	};

	const getWorkingDir = async () => {
		const returnedDir = await axios.get(URL + "/api/terminal/directory");
		setWorkingDir(returnedDir.data.workingDir);
	};

	useEffect(() => {
		getWorkingDir();
	}, []);

	const maxTerm = () => {
		if (termClass !== "maximized") {
			setTermClass("maximized");
			setMaximized(true);
		} else {
			setTermClass("terminal-focused");
			setMaximized(false);
		}
	};

	const closeTerminal = () => {
		props.openTerminal(props.terminalOpen);
		console.log(props);
	};

	const focusTerminal = () => {
		setTermClass("terminal-focused");
	};

	const blurTerminal = () => {
		setTermClass("terminal");
	};

	const termRef = useRef();

	useEffect(() => {
		gsap.from(termRef.current, {
			y: 300,
			x: 50,
			duration: 0.2,
		});
	}, [props.terminalOpen]);

	useEffect(() => {
		if (isMobile) {
			setTermClass("maximized");
			setMaximized(true);
		}
	});

	const history = termHistory.map((item, index) => {
		return <p className="terminal-line">{item}</p>;
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
					ref={termRef}
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
						{history}
						<div id="prompt">
							<p className="terminal-line">{workingDir}:root> </p>
							<form onSubmit={sendCommand}>
								<input
									autoFocus
									type="text"
									value={command}
									onChange={(e) => setCommand(e.target.value)}
								/>
								{/* <input type="submit" /> */}
							</form>
						</div>
					</div>

					{/* <ReactTerminal
						clickToFocus={true}
						autoFocus={false}
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
							height: "90%",
						}}
					/> */}
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

export default Terminal;
