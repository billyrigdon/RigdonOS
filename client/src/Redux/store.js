import { createStore } from "redux";

const TOGGLEMENU = "TOGGLEMENU";
const TOGGLETERMINAL = "OPENTERMINAL";
const TOGGLEBROWSER = "TOGGLEBROWSER";
const TOGGLENOTES = "TOGGLENOTES";
const TOGGLERESUME = "TOGGLERESUME";


const initialState = {
	menuOpen: false,
	terminalOpen: false,
	browserOpen: false,
	notesOpen: false,
	resumeOpen: false
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

const toggleNotes = (notesOpen) => {
	return {
		type: TOGGLENOTES
	}
}

const toggleResume = (resumeOpen) => {
	return {
		type: TOGGLERESUME
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
		case TOGGLENOTES:
			return {
				...state,
				notesOpen: !state.notesOpen
			}
		case TOGGLERESUME:
			return {
				...state,
				resumeOpen: !state.resumeOpen
			}
		default:
			return state
	}
}

const store = createStore(osReducer);

export { store, toggleMenu, toggleTerminal, toggleBrowser, toggleNotes, toggleResume };