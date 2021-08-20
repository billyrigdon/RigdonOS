import "./App.scss";
import Taskbar from "../Taskbar/Taskbar";
import Desktop from "../Desktop/Desktop";
import Terminal from "../Terminal/Terminal";
import StartMenu from "../StartMenu/StartMenu";
import Browser from "../Browser/Browser";
import MobileBar from "../MobileBar/MobileBar";
import Notes from "../Notes/Notes";
import Resume from "../Resume/Resume";
import FileManager from "../FileManager/FileManager";
import { connect } from "react-redux";
import {
	toggleResume,
	toggleNotes,
	toggleBrowser,
	toggleTerminal,
	toggleMenu,
	toggleFileManager,
	changeDirectory,
	store,
	setFileContent,
	openFile,
} from "../../Redux/store";
import {
	BrowserView,
	MobileView,
	isBrowser,
	isMobile,
} from "react-device-detect";

const mapStateToProps = (state) => {
	return {
		menuOpen: state.menuOpen,
		terminalOpen: state.terminalOpen,
		browserOpen: state.browserOpen,
		notesOpen: state.notesOpen,
		resumeOpen: state.resumeOpen,
		fileManagerOpen: state.fileManagerOpen,
		currentDir: state.currentDir,
		fileContent: state.fileContent,
		currentFile: state.currentFile,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		openMenu: (menuOpen) => {
			dispatch(toggleMenu(menuOpen));
		},
		openTerminal: (terminalOpen) => {
			dispatch(toggleTerminal(terminalOpen));
		},
		openBrowser: (browserOpen) => {
			dispatch(toggleBrowser(browserOpen));
		},
		openNotes: (notesOpen) => {
			dispatch(toggleNotes(notesOpen));
		},
		openResume: (resumeOpen) => {
			dispatch(toggleResume(resumeOpen));
		},
		openFileManager: (fileManagerOpen) => {
			dispatch(toggleFileManager(fileManagerOpen));
		},
		changeFolder: (newDir) => {
			dispatch(changeDirectory(newDir));
		},
		setContent: (content) => {
			dispatch(setFileContent(content));
		},
		setFile: (fileObj) => {
			dispatch(openFile(fileObj));
		},
	};
};

const App = (props) => {
	return (
		<div id="app-container">
			<ConnectedDesktop />
			<ConnectedTaskbar />
			{isMobile && <MobileBar />}
			{props.menuOpen && <ConnectedStartMenu />}
			{props.terminalOpen && <ConnectedTerminal />}
			{props.browserOpen && <ConnectedBrowser />}
			{props.notesOpen && <ConnectedNotes />}
			{props.resumeOpen && <ConnectedResume />}
			{props.fileManagerOpen && <ConnectedFileManager />}
		</div>
	);
};

const ConnectedTaskbar = connect(mapStateToProps, mapDispatchToProps)(Taskbar);
const ConnectedBrowser = connect(mapStateToProps, mapDispatchToProps)(Browser);
const ConnectedDesktop = connect(mapStateToProps, mapDispatchToProps)(Desktop);
const ConnectedNotes = connect(mapStateToProps, mapDispatchToProps)(Notes);
const ConnectedResume = connect(mapStateToProps, mapDispatchToProps)(Resume);

const ConnectedTerminal = connect(
	mapStateToProps,
	mapDispatchToProps
)(Terminal);

const ConnectedStartMenu = connect(
	mapStateToProps,
	mapDispatchToProps
)(StartMenu);

const ConnectedFileManager = connect(
	mapStateToProps,
	mapDispatchToProps
)(FileManager);

export default connect(mapStateToProps, null)(App);
