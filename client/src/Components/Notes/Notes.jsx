import "./Notes.scss"
import { useState, useEffect } from "react";
import Draggable, {DraggableCore} from 'react-draggable';

const Notes = (props) => {

	const [maximized, setMaximized] = useState(false);
	
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

	if (!maximized) {
		return (
			<Draggable className="window">
				<div className="notepad">
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