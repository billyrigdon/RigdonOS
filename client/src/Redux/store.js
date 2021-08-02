import { createStore } from "redux";

const TOGGLEMENU = "TOGGLEMENU";
const TOGGLETERMINAL = "OPENTERMINAL";
const TOGGLEBROWSER = "TOGGLEBROWSER";
const MAXTERMINAL = "MAXTERMINAL";
const MAXBROWSER = "MAXBROWSER";

const initialState = {
	menuOpen: false,
	terminalOpen: false,
	browserOpen: false,
	terminalMaximized: false,
	browserMaximized: false
};

const toggleMenu = (menuOpen) => {
	return {
		type: TOGGLEMENU
	}
};

const toggleTerminal = (terminalOpen) => {
	return {
		type: TOGGLETERMINAL
	}
}

const toggleBrowser = (browserOpen) => {
	return {
		type: TOGGLEBROWSER
	}
}

const maximizeTerminal = (terminalMaximized) => {
	return {
		type: MAXTERMINAL
	}
}

const maximizeBrowser = (browserMaximized) => {
	return {
		type: MAXBROWSER
	}
}

const osReducer = (state = initialState, action) => {
	switch (action.type) {
		case TOGGLEMENU:
			return {
				...state, 
				menuOpen: !state.menuOpen 
			}
		case TOGGLETERMINAL:
			return {
				...state,
				terminalOpen: !state.terminalOpen
			}
		case TOGGLEBROWSER:
			return {
				...state,
				browserOpen: !state.browserOpen
			}
		case MAXTERMINAL:
			return {
				...state,
				terminalMaximized: !state.terminalMaximized
			}
		case MAXBROWSER:
			return {
				...state,
				browserMaximized: state.browserMaximized
			}
		default:
			return state
	}
}

const store = createStore(osReducer);

export { store, toggleMenu, toggleTerminal, toggleBrowser, maximizeBrowser, maximizeTerminal };