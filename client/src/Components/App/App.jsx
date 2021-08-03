import "./App.scss";
import Taskbar from "../Taskbar/Taskbar";
import Desktop from "../Desktop/Desktop";
import Terminal from "../Terminal/Terminal";
import StartMenu from "../StartMenu/StartMenu";
import Browser from "../Browser/Browser";
import Notes from "../Notes/Notes"
import { connect } from "react-redux";
import { toggleNotes, toggleBrowser, toggleTerminal, toggleMenu, store } from "../../Redux/store";


const mapStateToProps = (state) => {
	return {
		menuOpen: state.menuOpen,
		terminalOpen: state.terminalOpen,
		browserOpen: state.browserOpen,
		notesOpen: state.notesOpen
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		openMenu: (menuOpen) => {
			dispatch(toggleMenu(menuOpen));
		},
		openTerminal: (terminalOpen) => {
			dispatch(toggleTerminal(terminalOpen))
		},
		openBrowser: (browserOpen) => {
			dispatch(toggleBrowser(browserOpen))
		},
		openNotes: (notesOpen) => {
			dispatch(toggleNotes(notesOpen))
		}

	}
}

const App = (props) => {
	return (
		<div>
			<ConnectedDesktop />
			<ConnectedTaskbar />
			{props.menuOpen && <ConnectedStartMenu />}
			{props.terminalOpen && <ConnectedTerminal  />}
			{props.browserOpen && <ConnectedBrowser />}
			{props.notesOpen && <ConnectedNotes />}
		</div>
  );
};

const ConnectedTaskbar = connect(mapStateToProps,mapDispatchToProps)(Taskbar);
const ConnectedBrowser = connect(mapStateToProps,mapDispatchToProps)(Browser);
const ConnectedDesktop = connect(mapStateToProps,mapDispatchToProps)(Desktop);
const ConnectedTerminal = connect(mapStateToProps,mapDispatchToProps)(Terminal);
const ConnectedStartMenu = connect(mapStateToProps, mapDispatchToProps)(StartMenu);
const ConnectedNotes = connect(mapStateToProps, mapDispatchToProps)(Notes);

export default connect(mapStateToProps,null)(App);
