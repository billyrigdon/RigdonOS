import "./Taskbar.scss";
import { userSelector, useDispatch, connect } from "react-redux";
import { toggleTerminal, toggleMenu, store, toggleBrowser } from "../../Redux/store";
import { useState, useEffect } from "react";
import StartMenu from "../StartMenu/StartMenu";
import terminalIcon from "../../Icons/terminal.svg";
import Terminal from "../Terminal/Terminal";
import browserIcon from "../../Icons/browser.svg"
import notesIcon from "../../Icons/notepad-48.svg"


const Taskbar = (props) => {

	const [currentTime, setCurrentTime] = useState(new Date());

	useEffect(() => {
		const timer = setInterval(setCurrentTime(new Date()),1000);
		return function cleanup() {clearInterval(timer)};
	});

	const openMenu = () => {
		props.openMenu(props.menuOpen);
		console.log(props);
	};

	const openTerminal = () => {
		props.openTerminal(props.terminalOpen);
		console.log(props);
	}

	const openBrowser = () => {
		props.openBrowser(props.browserOpen);
		console.log(props);
	}

	const openNotes = () => {
		props.openNotes(props.notesOpen);
		console.log(props);
	}

	return (
		<div>
			<div id="taskbar">
				<button id="startMenuButton" onClick={openMenu}>Start</button>
				<div id="taskbarApps">
					<img src={notesIcon} alt="Notes" onClick={openNotes} width="100%" height="100%" />
					<img src={terminalIcon} alt="Terminal" onClick={openTerminal} width="100%" height="100%" />
					<img src={browserIcon} alt="Browser" onClick={openBrowser} width="100%" height="100%" />
				</div>
				<p id="taskbarTime">{currentTime.toLocaleString()}</p>
			</div>
		</div>
	)
};



export default Taskbar;