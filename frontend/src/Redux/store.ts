import { createStore, applyMiddleware, Store } from "redux";
import thunk from "redux-thunk";
import { State, Action, DispatchType } from "Types/ReduxInterface";

const initialState: State = {
	menuOpen: false,
	terminalOpen: false,
	browserOpen: false,
	notesOpen: false,
	resumeOpen: false,
	fileManagerOpen: false,
	currentDir: "/",
	fileContent: "",
	currentFile: {
		name: "",
		isDirectory: false,
		path: "",
	},
	musicPlayerOpen: false,
	soundcloudOpen: false
};

const toggleMenu = (menuOpen: boolean) => {
	return {
		type: "TOGGLEMENU",
	};
};

const toggleTerminal = (terminalOpen: boolean) => {
	return {
		type: "TOGGLETERMINAL",
	};
};

const toggleBrowser = (browserOpen: boolean) => {
	return {
		type: "TOGGLEBROWSER",
	};
};

const toggleNotes = (notesOpen: boolean) => {
	return {
		type: "TOGGLENOTES",
	};
};

const toggleResume = (resumeOpen: boolean) => {
	return {
		type: "TOGGLERESUME",
	};
};

const toggleFileManager = (fileManagerOpen: boolean) => {
	return {
		type: "TOGGLEFILEMANAGER",
	};
};

const toggleSoundcloud = (soundcloudOpen: boolean) => {
	return {
		type: "TOGGLESOUNDCLOUD",
	};
};

const changeDirectory = (newDir: string) => {
	return {
		type: "CHANGEDIR",
		payload: newDir,
	};
};

const setFileContent = (content: string) => {
	return {
		type: "SETFILECONTENT",
		payload: content,
	};
};

const openFile = (fileObj: File) => {
	return {
		type: "OPENFILE",
		file: fileObj,
	};
};

const toggleMusicPlayer = (musicPlayerOpen: boolean) => {
	return { type: "TOGGLEMUSICPLAYER" };
};

const osReducer = (state = initialState, action: Action): State => {
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
			if (typeof action.payload === "string") {
				return {
					...state,
					currentDir: action.payload,
				};
			}
		case "SETFILECONTENT":
			return {
				...state,
				fileContent: action.payload,
			};
		case "OPENFILE":
			if (action.file) {
				return {
					...state,
					currentFile: action.file,
				};
			}
		case "TOGGLEMUSICPLAYER":
			return {
				...state,
				musicPlayerOpen: !state.musicPlayerOpen,
			};
		case "TOGGLESOUNDCLOUD":
			return {
				...state,
				soundcloudOpen: !state.soundcloudOpen
			}
		default:
			return state;
	}
};

const store: Store<State, Action> & { dispatch: DispatchType } = createStore(
	osReducer,
	applyMiddleware(thunk)
);

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
	toggleSoundcloud
};
