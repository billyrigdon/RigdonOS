import "./Desktop.scss";
import resumeIcon from "../../Icons/resume-icon.svg";
import { userSelector, useDispatch, connect } from "react-redux";
import { toggleResume } from "../../Redux/store";
import { useState, useEffect } from "react";

const Desktop = (props) => {

	const openResume = () => {
		props.openResume(props.resumeOpen);
		console.log(props);
	}

	return (
		<div id="desktop">
			<div className="shortcut">
				<img src={resumeIcon} alt="Resume Icon" onDoubleClick={openResume} />
				<p>Resume.pdf</p>
			</div>
		</div>
	)
}

export default Desktop;