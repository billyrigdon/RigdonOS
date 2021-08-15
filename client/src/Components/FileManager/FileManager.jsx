import { useState, useEffect } from "react";
import Draggable, { DraggableCore } from "react-draggable";
import "./FileManager.scss";
import folderIcon from "../../Icons/default-folder.svg";
import fileIcon from "../../Icons/resume-icon.svg";
import axios from "axios";

const FileManager = (props) => {
	const [maximized, setMaximized] = useState(false);
	const [fileManagerClass, setFileManagerClass] = useState(
		"file-manager-focused"
	);
	const [newDir, setNewDir] = useState("");
	const [files, setFiles] = useState([{ name: "test" }]);

	const selectNewDir = (dirName) => {
		setNewDir(dirName);
	};

	const changeDirectory = (name) => {
		console.log(name);
		props.changeFolder(name);
		console.log(props);
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
		const fetchCurrentDir = async () => {
			try {
				const config = {
					headers: { "Content-Type": "application/json" },
				};

				const returnedFiles = await axios.post("/api/files/", {
					currentDir: props.currentDir,
				});
				setFiles(returnedFiles.data);
			} catch {
				console.log("Fetch failed");
			}
		};
		fetchCurrentDir();
	}, [props.currentDir]);

	const fileItem = files.map((item, index) => {
		if (item.isDirectory) {
			return (
				<div className="file">
					<img
						value={item.name}
						src={folderIcon}
						alt="Folder Icon"
						onDoubleClick={() => {
							changeDirectory(item.name);
						}}
					/>
					<p>{item.name}</p>
				</div>
			);
		} else if (!item.isDirectory) {
			return (
				<div className="file">
					<img value={item.name} src={fileIcon} alt="File Icon" />
					<p>{item.name}</p>
				</div>
			);
		}
	});

	if (!maximized) {
		return (
			<Draggable className="window">
				<div
					id="file-manager-window"
					className={fileManagerClass}
					tabIndex={0}
					onFocus={focusFileManager}
					onBlur={blurFileManager}
				>
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
			</Draggable>
		);
	} else if (maximized) {
		return (
			<div className="maximized">
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
			</div>
		);
	}
};

export default FileManager;
