import "./Desktop.scss";
import resumeIcon from "../../Icons/resume-icon.svg";
import githubIcon from "../../Icons/github.png";
import React from "react";
import background from "./background.jpg";
import { Props } from "../App/App";

const Desktop = (props: Props) => {
	const openResume = () => {
		props.openResume(props.resumeOpen);
		console.log(props);
	};

	return (
		<div id="desktop" style={{ backgroundImage: `url(${background})` }}>
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
						<img src={githubIcon} alt="Github Icon" />
					</a>
					<p>Github</p>
				</div>
			</div>
		</div>
	);
};

export default Desktop;
