import "./Desktop.scss";
import resumeIcon from "../../Icons/resume-icon.svg";
import { userSelector, useDispatch, connect } from "react-redux";
import { toggleResume } from "../../Redux/store";
import { useState, useEffect } from "react";
import githubIcon from "../../Icons/github.png";

const Desktop = (props) => {
	const openResume = () => {
		props.openResume(props.resumeOpen);
		console.log(props);
	};

	return (
		<div id="desktop">
			<div id="shortcutContainer">
				<div id="resume" className="shortcut">
					<img
						src={resumeIcon}
						alt="Resume Icon"
						onClick={openResume}
					/>
					<p>Resume.pdf</p>
				</div>
				<div id="github" className="shortcut">
					<a href="https://github.com/billyrigdon" target="_blank">
						<img
							src={githubIcon}
							alt="Github Icon"
							href="https://github.com"
						/>
					</a>
					<p>Github</p>
				</div>
			</div>
		</div>
	);
};

export default Desktop;
