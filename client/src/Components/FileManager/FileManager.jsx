import { useState, useEffect, useRef } from "react";
import Draggable, { DraggableCore } from "react-draggable";
import "./FileManager.scss";
import folderIcon from "../../Icons/default-folder.svg";
import fileIcon from "../../Icons/resume-icon.svg";
import axios from "axios";
import { gsap } from "gsap";
import {
	BrowserView,
	MobileView,
	isBrowser,
	isMobile,
} from "react-device-detect";

const URL = "http://127.0.0.1:1313";

const FileManager = (props) => {
	const [maximized, setMaximized] = useState(false);
	const [fileManagerClass, setFileManagerClass] = useState(
		"file-manager-focused"
	);
	const [prevDir, setPrevDir] = useState();
	const [files, setFiles] = useState([]);

	const openFile = async (fileObj) => {
		props.setFile(fileObj);
		props.setContent(fileObj.contents);

		if (!props.notesOpen) {
			props.openNotes(props.notesOpen);
		}
	};

	const changeDirectory = (name) => {
		console.log(name);
		props.changeFolder(name);
		console.log(props);
	};

	const backDirectory = () => {
		props.changeFolder(prevDir);
		console.log(prevDir);
	};

	const closeFileManager = () => {
		props.openFileManager(props.fileManagerOpen);
		console.log(props);
	};

	const setMax = () => {
		if (maximized) {
			setMaximized(false);
		} else if (!maximized) {
			setMaximized(true);
		}
	};

	const focusFileManager = () => {
		setFileManagerClass("file-manager-focused");
	};

	const blurFileManager = () => {
		setFileManagerClass("file-manager");
	};

	useEffect(() => {
		// const fetchParent = async () => {
		// 	try {
		// 		const config = {
		// 			headers: { "Content-Type": "application/json" },
		// 		};
		//
		// 		const returnedFile = await axios.post(
		// 			URL + "/api/files/parent",
		// 			{
		// 				currentDir: props.currentDir,
		// 			}
		// 		);
		// 		console.log(returnedFile);
		// 		setPrevDir(returnedFile.data.parentDir);
		// 		console.log(prevDir);
		// 	} catch {
		// 		console.log("Fetch failed");
		// 	}
		// };
		const fetchDir = async () => {
			try {
				const config = {
					headers: { "Content-Type": "application/json" },
				};

				const returnedFiles = await axios.post(URL + "/api/files/", {
					currentDir: props.currentDir,
				});
				setFiles(returnedFiles.data);
			} catch {
				console.log("Fetch failed");
			}
		};
		//fetchParent();
		fetchDir();
	}, [props.currentDir]);

	const fileRef = useRef();

	useEffect(() => {
		gsap.from(fileRef.current, {
			y: 300,
			x: 50,
			duration: 0.2,
		});
	}, [props.fileManagerOpen]);

	const fileItem = files.map((item, index) => {
		if (item.isDirectory) {
			return (
				<div className="file">
					<img
						value={item.name}
						src={folderIcon}
						alt="Folder Icon"
						onDoubleClick={() => {
							changeDirectory(item.path);
						}}
					/>
					<p>{item.name}</p>
				</div>
			);
		} else if (!item.isDirectory) {
			return (
				<div className="file">
					<img
						value={item.name}
						src={fileIcon}
						alt="File Icon"
						onDoubleClick={() => {
							openFile(item);
						}}
					/>
					<p>{item.name}</p>
				</div>
			);
		}
	});

	if (isMobile) {
		return (
			<div id="max-file" className="maximized">
				<div className="windowBar">
					<div
						className="windowButtons close"
						onClick={closeFileManager}
					></div>
				</div>
				<div id="file-view">{fileItem}</div>
			</div>
		);
	} else if (!maximized) {
		return (
			<Draggable className="window">
				<div
					className={fileManagerClass}
					tabIndex={0}
					onFocus={focusFileManager}
					onBlur={blurFileManager}
					ref={fileRef}
				>
					<div className="windowBarAdvanced">
						<span
							onClick={backDirectory}
							id="backButton"
							className="material-icons"
						>
							arrow_back
						</span>
						<div className="windowButtonsContainer">
							<div
								className="windowButtons minimize"
								onClick={closeFileManager}
							></div>
							<div
								className="windowButtons maximize"
								onClick={setMax}
							></div>
							<div
								className="windowButtons close"
								onClick={closeFileManager}
							></div>
						</div>
					</div>
					<div id="file-view">{fileItem}</div>
				</div>
			</Draggable>
		);
	} else if (maximized) {
		return (
			<div id="max-file" className="maximized">
				<div className="windowBar">
					<div
						className="windowButtons minimize"
						onClick={closeFileManager}
					></div>
					<div
						className="windowButtons maximize"
						onClick={setMax}
					></div>
					<div
						className="windowButtons close"
						onClick={closeFileManager}
					></div>
				</div>
				<div id="file-view">{fileItem}</div>
			</div>
		);
	}
};

export default FileManager;
