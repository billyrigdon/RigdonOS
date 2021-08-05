import "./Notes.scss"
import React, { useRef, Component, useEffect, useState } from "react";
import Draggable, {DraggableCore} from 'react-draggable';

const Notes = (props) => {

	const [maximized, setMaximized] = useState(false);
	const [noteClass, setNoteClass] = useState("notepad-focused");
	
	const closeNotes = () => {
		props.openNotes(props.notesOpen);
		console.log(props);
	}

	const setMax = () => {
		if (maximized) {
			setMaximized(false);
		} else if (!maximized) {
			setMaximized(true);
		}
	}

	const focusNotes = () => {
		setNoteClass("notepad-focused");
	}

	const blurNotes = () => {
		setNoteClass("notepad");
	}

	if (!maximized) {
		return (
			<Draggable>
				<div id="notes-window" ref={innerRef} className={noteClass} tabIndex={1} onFocus={focusNotes} onBlur={blurNotes}>
					<div className="windowBar">
						<div className="windowButtons minimize" onClick={closeNotes}></div>
						<div className="windowButtons maximize" onClick={setMax}></div>
						<div className="windowButtons close" onClick={closeNotes}></div>
					</div>
					<textarea id="notes" />
				</div>
			</Draggable>
		)
	} else if (maximized) {
		return (
			<div className="maximized">
				<div className="windowBar">
					<div className="windowButtons minimize" onClick={closeNotes}></div>
					<div className="windowButtons maximize" onClick={setMax}></div>
					<div className="windowButtons close" onClick={closeNotes}></div>
				</div>
				<input id="notes" />
			</div>
		)
	}
}

export default Notes;