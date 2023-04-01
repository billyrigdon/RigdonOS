import FileObj from "./FileInterface";

export interface State {
	menuOpen: boolean;
	terminalOpen: boolean;
	browserOpen: boolean;
	notesOpen: boolean;
	resumeOpen: boolean;
	fileManagerOpen: boolean;
	currentDir: string;
	fileContent: string;
	currentFile: FileObj;
	musicPlayerOpen: boolean;
	soundcloudOpen: boolean;
	isMobile: boolean;
}

export interface Action {
	type: string;
	payload: string;
	file?: FileObj;
	isMobile: boolean;
}

export type DispatchType = (args: Action) => Action;


