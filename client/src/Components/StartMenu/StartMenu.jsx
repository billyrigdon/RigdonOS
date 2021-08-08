import "./StartMenu.scss";
import terminalIcon from "../../Icons/terminal.svg";
import browserIcon from "../../Icons/browser.svg"
import notesIcon from "../../Icons/notepad-48.svg"
import startIcon from "../../Icons/syspeek-90.svg"
import { toggleTerminal, toggleMenu, store, toggleBrowser } from "../../Redux/store";


const StartMenu = (props) => {

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

	const openMenu = () => {
		props.openMenu(props.menuOpen);
		console.log(props);
	};

	return (
		<div id="startMenu" tabIndex={0} onBlur={openMenu}>
				<div className="startApps" onClick={openTerminal}>
					<img src={terminalIcon} alt="Terminal" />
					<p>Terminal</p>
				</div>
				<div className="startApps" onClick={openBrowser}>
					<img src={browserIcon} alt="Browser" />
					<p>Browser</p>
				</div>
				<div className="startApps" onClick={openNotes}>
					<img src={notesIcon} alt="Notes" />
					<p>Notes</p>
				</div>
		</div>
	)
}

export default StartMenu;