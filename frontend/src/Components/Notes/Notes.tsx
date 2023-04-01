import "./Notes.scss";
import React, { useRef, useEffect, useState } from "react";
import Draggable from "react-draggable";
import axios from "axios";
import { gsap } from "gsap";
import { isMobile } from "react-device-detect";
import { Props } from "../App/App";

const Notes = (props: Props) => {
	const [maximized, setMaximized] = useState(false);
	const [noteClass, setNoteClass] = useState("notepad-focused");
	const [noteContent, setNoteContent] = useState(props.fileContent);

	const saveNotes = async () => {
		try {
			console.log(props.currentFile);

			const updatedNote = await axios.post("/api/files/edit", {
				name: props.currentFile.name,
				parentDir: props.currentFile.parentDir,
				newContents: noteContent,
				newName: props.currentFile.name,
			});

			console.log(updatedNote);
		} catch {
			console.log("failed");
		}
	};

	const closeNotes = () => {
		props.openNotes(props.notesOpen);
		console.log(props);
	};

	const setMax = () => {
		if (maximized) {
			setMaximized(false);
		} else if (!maximized) {
			setMaximized(true);
		}
	};

	const focusNotes = () => {
		setNoteClass("notepad-focused");
	};

	const blurNotes = () => {
		setNoteClass("notepad");
	};

	const handleNotesChange = (event: any) => {
		setNoteContent(event.target.value);
	};

	const noteRef = useRef(null);

	useEffect(() => {
		gsap.from(noteRef.current, {
			y: 300,
			x: 50,
			duration: 0.2,
		});

	}, [props.notesOpen]);

	if (props.isMobile) {
		return (
			<div className="maximized">
				<div className="windowBarAdvanced">
					<span
						onClick={() => {
							saveNotes();
						}}
						id="saveButton"
						className="material-icons"
					>
						save
					</span>
					<div className="windowButtonsContainer">
						<div
							className="windowButtons close"
							onClick={closeNotes}
						></div>
					</div>
				</div>
				<textarea
					onChange={handleNotesChange}
					value={noteContent}
					id="notes"
				/>
			</div>
		);
	} else if (!maximized) {
		return (
			<Draggable>
				<div
					id="notes-window"
					className={noteClass}
					tabIndex={1}
					onFocus={focusNotes}
					onBlur={blurNotes}
					ref={noteRef}
				>
					<div className="windowBarAdvanced">
						<span
							onClick={() => {
								saveNotes();
							}}
							id="saveButton"
							className="material-icons"
						>
							save
						</span>
						<div className="windowButtonsContainer">
							<div
								className="windowButtons minimize"
								onClick={closeNotes}
							></div>
							<div
								className="windowButtons maximize"
								onClick={setMax}
							></div>
							<div
								className="windowButtons close"
								onClick={closeNotes}
							></div>
						</div>
					</div>
					<textarea
						onChange={handleNotesChange}
						value={noteContent}
						id="notes"
					/>
				</div>
			</Draggable>
		);
	} else {
		return (
			<div className="maximized">
				<div className="windowBarAdvanced">
					<span
						onClick={() => {
							saveNotes();
						}}
						id="saveButton"
						className="material-icons"
					>
						save
					</span>
					<div className="windowButtonsContainer">
						<div
							className="windowButtons minimize"
							onClick={closeNotes}
						></div>
						<div
							className="windowButtons maximize"
							onClick={setMax}
						></div>
						<div
							className="windowButtons close"
							onClick={closeNotes}
						></div>
					</div>
				</div>
				<textarea
					onChange={handleNotesChange}
					value={noteContent}
					id="notes"
				/>
			</div>
		);
	}
};

export default Notes;
