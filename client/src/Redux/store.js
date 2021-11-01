import { createStore } from "redux";

const initialState = {
	menuOpen: false,
	terminalOpen: false,
	browserOpen: false,
	notesOpen: false,
	resumeOpen: false,
	fileManagerOpen: false,
	currentDir: "/",
	fileContent: "",
	currentFile: {},
	musicPlayerOpen: false,
};

const toggleMenu = (menuOpen) => {
	return {
		type: "TOGGLEMENU",
	};
};

const toggleTerminal = (terminalOpen) => {
	return {
		type: "TOGGLETERMINAL",
	};
};

const toggleBrowser = (browserOpen) => {
	return {
		type: "TOGGLEBROWSER",
	};
};

const toggleNotes = (notesOpen) => {
	return {
		type: "TOGGLENOTES",
	};
};

const toggleResume = (resumeOpen) => {
	return {
		type: "TOGGLERESUME",
	};
};

const toggleFileManager = (fileManagerOpen) => {
	return {
		type: "TOGGLEFILEMANAGER",
	};
};

const changeDirectory = (newDir) => {
	return {
		type: "CHANGEDIR",
		payload: newDir,
	};
};

const setFileContent = (content) => {
	return {
		type: "SETFILECONTENT",
		payload: content,
	};
};

const openFile = (fileObj) => {
	return {
		type: "OPENFILE",
		payload: fileObj,
	};
};

const toggleMusicPlayer = (musicPlayerOpen) => {
	return { type: "TOGGLEMUSICPLAYER" };
};

const osReducer = (state = initialState, action) => {
	switch (action.type) {
		case "TOGGLEMENU":
			return {
				...state,
				menuOpen: !state.menuOpen,
			};
		case "TOGGLETERMINAL":
			return {
				...state,
				terminalOpen: !state.terminalOpen,
			};
		case "TOGGLEBROWSER":
			return {
				...state,
				browserOpen: !state.browserOpen,
			};
		case "TOGGLENOTES":
			return {
				...state,
				notesOpen: !state.notesOpen,
			};
		case "TOGGLERESUME":
			return {
				...state,
				resumeOpen: !state.resumeOpen,
			};
		case "TOGGLEFILEMANAGER":
			return {
				...state,
				fileManagerOpen: !state.fileManagerOpen,
			};
		case "CHANGEDIR":
			return {
				...state,
				currentDir: action.payload,
			};
		case "SETFILECONTENT":
			return {
				...state,
				fileContent: action.payload,
			};
		case "OPENFILE":
			return {
				...state,
				currentFile: action.payload,
			};
		case "TOGGLEMUSICPLAYER":
			return {
				...state,
				musicPlayerOpen: !state.musicPlayerOpen,
			};
		default:
			return state;
	}
};

const store = createStore(osReducer);

export {
	store,
	toggleMenu,
	toggleTerminal,
	toggleBrowser,
	toggleNotes,
	toggleResume,
	toggleFileManager,
	changeDirectory,
	setFileContent,
	openFile,
	toggleMusicPlayer,
};
