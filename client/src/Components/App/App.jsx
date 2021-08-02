import "./App.scss";
import Taskbar from "../Taskbar/Taskbar";
import Desktop from "../Desktop/Desktop";
import Terminal from "../Terminal/Terminal";
import StartMenu from "../StartMenu/StartMenu";
import Browser from "../Browser/Browser";
import { connect } from "react-redux";
import { maximizeBrowser, maximizeTerminal, toggleBrowser, toggleTerminal, toggleMenu, store } from "../../Redux/store";


const mapStateToProps = (state) => {
	return {
		menuOpen: state.menuOpen,
		terminalOpen: state.terminalOpen,
		browserOpen: state.browserOpen,
		terminalMaximized: state.terminalMaximized,
		browserMaximized: state.browserMaximized
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
		maxTerminal: (terminalMaximized) => {
			dispatch(maximizeTerminal(terminalMaximized))
		},
		maxBrowser: (browserMaximized) => {
			dispatch(maximizeBrowser(browserMaximized))
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
		</div>
  );
};

const ConnectedTaskbar = connect(mapStateToProps,mapDispatchToProps)(Taskbar);
const ConnectedBrowser = connect(mapStateToProps,mapDispatchToProps)(Browser);
const ConnectedDesktop = connect(mapStateToProps,mapDispatchToProps)(Desktop);
const ConnectedTerminal = connect(mapStateToProps,mapDispatchToProps)(Terminal);
const ConnectedStartMenu = connect(mapStateToProps, mapDispatchToProps)(StartMenu);

export default connect(mapStateToProps,null)(App);
