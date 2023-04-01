import "./Desktop.scss";
import resumeIcon from "../../Icons/resume-icon.svg";
import githubIcon from "../../Icons/github.png";
import pillIcon from "../../Icons/pill.png";
import soundcloudIcon from "../../Icons/soundcloud.svg";
import React from "react";
import background from "./background.jpg";
import { Props } from "../App/App";

const Desktop = (props: Props) => {
	const openResume = () => {
		props.openResume(props.resumeOpen);
		console.log(props);
	};

	// <div id="resume" className="shortcut">
	// 				<img
	// 					src={resumeIcon}
	// 					alt="Resume Icon"
	// 					onClick={openResume}
	// 				/>
	// 				<p>Resume.pdf</p>
	// 			</div>

	return (
		<div id="desktop" style={{ backgroundImage: `url(${background})` }}>
			<div id="shortcutContainer">
				<div id="github" className="shortcut">
					<a href="https://github.com/billyrigdon" target="_blank">
						<img src={githubIcon} alt="Github Icon" />
					</a>
					<p>Github</p>
				</div>
				<div id="Auri" className="shortcut">
					<a href="http://45.33.126.222:1944/" target="_blank">
						<span
							style={{ fontSize: "42px" }}
							className="material-icons"
						>
							pets
						</span>
					</a>
					<p>Auri</p>
				</div>
				<div id="Shulgin" className="shortcut">
					<a href="https://shulgin.io" target="_blank">
						<img src={pillIcon} alt="Pill Icon" />
					</a>
					<p>Shulgin</p>
				</div>
				<div id="Violet" className="shortcut">
					<a href="http://violetapparition.com" target="_blank">
						<img src={soundcloudIcon} alt="Soundcloud Icon" />
					</a>
					<p>Violet Apparition</p>
				</div>
			</div>
		</div>
	);
};

export default Desktop;
