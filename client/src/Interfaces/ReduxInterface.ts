import File from "./FileInterface";

export interface State {
	menuOpen: boolean;
	terminalOpen: boolean;
	browserOpen: boolean;
	notesOpen: boolean;
	resumeOpen: boolean;
	fileManagerOpen: boolean;
	currentDir: string;
	fileContent: string;
	currentFile: File;
	musicPlayerOpen: boolean;
}

export interface Action {
	type: string;
	payload: string;
	file?: File;
}

export type DispatchType = (args: Action) => Action;


