import { useState, useEffect, useRef } from "react";
import Draggable from "react-draggable";
import "./FileManager.scss";
import folderIcon from "../../Icons/default-folder.svg";
import fileIcon from "../../Icons/resume-icon.svg";
import axios from "axios";
import { gsap } from "gsap";
import { isMobile } from "react-device-detect";
import React from "react";
import File from "../../Interfaces/FileInterface";
import { Props } from "../App/App";

const URL = "http://127.0.0.1:1313";

const FileManager = (props: Props) => {
	 
	const [maximized, setMaximized] = useState(false);
	const [fileManagerClass, setFileManagerClass] = useState(
		"file-manager-focused"
	);
	const [files, setFiles] = useState<Array<File>>([]);

	const changeDirectory = (name: string) => {
		console.log(name);
		props.changeFolder(name);
		console.log(props);
	};

	const backDirectory = async () => {
		const parentDir = await axios.post(URL + "/api/files/parent", {
			currentDir: props.currentDir,
		});
		//console.log(parentDir);
		props.changeFolder(parentDir.data.currentDir);
	};

	const openFile = (file:any) => {
		console.log(file);
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
		fetchDir();
	}, [props.currentDir]);

	const fileRef = useRef(null);

	useEffect(() => {
		gsap.from(fileRef.current, {
			y: 300,
			x: 50,
			duration: 0.2,
		});
	}, [props.fileManagerOpen]);

	const dirItem = files.map((item, index) => {
		if (item.isDirectory) {
			return (
				<div className="file">
					<img
						src={folderIcon}
						alt="Folder Icon"
						onDoubleClick={() => {
							changeDirectory(item.path);
						}}
					/>
					<p>{item.name}</p>
				</div>
			);
		}
	});
	const fileItem = files.map((item, index) => {
		if (!item.isDirectory) {
			return (
				<div className="file">
					<img
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
					/>
				</div>
				<div id="file-view">
					{dirItem}
					{fileItem}
				</div>
			</div>
		);
	} else if (!maximized) {
		return (
			<Draggable>
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
							/>
							<div
								className="windowButtons maximize"
								onClick={setMax}
							/>
							<div
								className="windowButtons close"
								onClick={closeFileManager}
							/>
						</div>
					</div>
					<div id="file-view">
						{dirItem}
						{fileItem}
					</div>
				</div>
			</Draggable>
		);
	} else {
		return (
			<div id="max-file" className="maximized">
				<div className="windowBar">
					<div
						className="windowButtons minimize"
						onClick={closeFileManager}
					/>
					<div className="windowButtons maximize" onClick={setMax} />
					<div
						className="windowButtons close"
						onClick={closeFileManager}
					/>
				</div>
				<div id="file-view">
					{dirItem}
					{fileItem}
				</div>
			</div>
		);
	}
};

export default FileManager;
