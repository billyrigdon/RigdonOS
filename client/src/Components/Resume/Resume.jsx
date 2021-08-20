import { useState, useEffect } from "react";
import Draggable, {DraggableCore} from 'react-draggable';
import "./Resume.scss";
import resume from "./resume.pdf";
import {
	BrowserView,
	MobileView,
	isBrowser,
	isMobile,
} from "react-device-detect";

const Resume = (props) => {

	const [maximized, setMaximized] = useState(false);
	const [resumeClass, setResumeClass] = useState("resume-focused");


	const closeResume = () => {
		props.openResume(props.resumeOpen);
		console.log(props);
	}

	const setMax = () => {
		if (maximized) {
			setMaximized(false);
		} else if (!maximized) {
			setMaximized(true);
		}
	}

	const focusResume = () => {
		setResumeClass("resume-focused");
	}

	const blurResume = () => {
		setResumeClass("resume");
	}

	useEffect(() => {
		if (isMobile) {
			setMaximized(true);
		}
	})

	if (!maximized) {
		return (
			<Draggable className="window">
				<div id="resume-window" className={resumeClass} tabIndex={0} onFocus={focusResume} onBlur={blurResume}>
					<div className="windowBar">
						<div className="windowButtons minimize" onClick={closeResume}></div>
						<div className="windowButtons maximize" onClick={setMax}></div>
						<div className="windowButtons close" onClick={closeResume}></div>
					</div>
					<embed id="resumePage" src={resume} type="application/pdf" />
				</div>
			</Draggable>
		)

	} else if (maximized) {
		return (
			<div className="maximized">
				<div className="windowBar">
					<div className="windowButtons minimize" onClick={closeResume}></div>
					<div className="windowButtons maximize" onClick={setMax}></div>
					<div className="windowButtons close" onClick={closeResume}></div>
				</div>
				<embed id="resumePage" src={resume} type="application/pdf"/>
				
			</div>
		)
	}
}

export default Resume;