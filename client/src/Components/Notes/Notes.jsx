import "./Notes.scss";
import React, { useRef, Component, useEffect, useState } from "react";
import Draggable, { DraggableCore } from "react-draggable";
import axios from "axios";

const Notes = (props) => {
	const [maximized, setMaximized] = useState(false);
	const [noteClass, setNoteClass] = useState("notepad-focused");
	const [noteContent, setNoteContent] = useState(props.fileContent);

	const saveNotes = async () => {
		try {
			console.log(props.currentFile);

			const config = {
				"Content-Type": "application.json",
			};

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

	const handleNotesChange = (event) => {
		setNoteContent(event.target.value);
	};

	if (!maximized) {
		return (
			<Draggable>
				<div
					id="notes-window"
					className={noteClass}
					tabIndex={1}
					onFocus={focusNotes}
					onBlur={blurNotes}
				>
					<div className="windowBarAdvanced">
						<span
							onClick={() => {
								saveNotes();
							}}
							id="saveButton"
							class="material-icons"
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
	} else if (maximized) {
		return (
			<div className="maximized">
				<div className="windowBarAdvanced">
					<span
						onClick={() => {
							saveNotes();
						}}
						id="saveButton"
						class="material-icons"
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
