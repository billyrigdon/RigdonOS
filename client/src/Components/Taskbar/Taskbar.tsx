import "./Taskbar.scss";
import { useState, useEffect } from "react";
import terminalIcon from "../../Icons/terminal.svg";
import browserIcon from "../../Icons/browser.svg";
import notesIcon from "../../Icons/notepad-48.svg";
import startIcon from "../../Icons/syspeek-90.svg";
import filesIcon from "../../Icons/file-manager.svg";
import React from "react";

const Taskbar = (props: any) => {
	const [currentTime, setCurrentTime] = useState(new Date());

	useEffect(() => {
		
		let timer = setInterval(() => {
			setCurrentTime(new Date());
		}, 1000);
	
		return () => {
			clearInterval(timer);
		};
	});

	const openMenu = () => {
		props.openMenu(props.menuOpen);
		console.log(props);
	};

	const openTerminal = () => {
		props.openTerminal(props.terminalOpen);
		console.log(props);
	};

	const openBrowser = () => {
		props.openBrowser(props.browserOpen);
		console.log(props);
	};

	const openNotes = () => {
		props.openNotes(props.notesOpen);
		console.log(props);
	};

	const openFileManager = () => {
		props.openFileManager(props.fileManagerOpen);
		console.log(props);
	};

	return (
		<div id="taskbar-container">
			<div id="taskbar">
				<div id="start-container">
					<img
						id="startMenuButton"
						src={startIcon}
						alt="Start"
						onClick={openMenu}
						height="100%"
						width="auto"
					/>
				</div>
				<div id="taskbarApps">
					<img
						src={filesIcon}
						alt="File Manager"
						onClick={openFileManager}
						width="100%"
						height="100%"
					/>
					<img
						src={notesIcon}
						alt="Notes"
						onClick={openNotes}
						width="100%"
						height="100%"
					/>
					<img
						src={terminalIcon}
						alt="Terminal"
						onClick={openTerminal}
						width="100%"
						height="100%"
					/>
					<img
						src={browserIcon}
						alt="Browser"
						onClick={openBrowser}
						width="100%"
						height="100%"
					/>
				</div>
				<div id="time-container">
					<p id="taskbarTime">{currentTime.toLocaleString()}</p>
				</div>
			</div>
		</div>
	);
};

export default Taskbar;
