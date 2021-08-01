import "./App.scss";
import Taskbar from "../Taskbar/Taskbar";
import Desktop from "../Desktop/Desktop";
import Terminal from "../Terminal/Terminal";
import StartMenu from "../StartMenu/StartMenu";
import Browser from "../Browser/Browser";
import { connect } from "react-redux";
import { toggleBrowser, toggleTerminal, toggleMenu, store } from "../../Redux/store";


export const mapStateToProps = (state) => {
	return {
		menuOpen: state.menuOpen,
		terminalOpen: state.terminalOpen,
		browserOpen: state.browserOpen
	}
};

export const mapDispatchToProps = (dispatch) => {
	return {
		openMenu: (menuOpen) => {
			dispatch(toggleMenu(menuOpen));
		},
		openTerminal: (terminalOpen) => {
			dispatch(toggleTerminal(terminalOpen))
		}
	}
}

const App = (props) => {
	return (
		<div>
			<Desktop />
			<Taskbar />
			{props.menuOpen && <StartMenu />}
			{props.terminalOpen && <Terminal  />}
			{props.browserOpen && <Browser />}
		</div>
  );
};


export default connect(mapStateToProps,null)(App);
