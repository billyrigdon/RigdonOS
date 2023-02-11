import { useState, useEffect } from "react";
import Draggable from "react-draggable";
import "./Soundcloud.scss";
import { isMobile } from "react-device-detect";
import React from "react";
import { Props } from "../App/App";

const Soundcloud = (props:Props) => {
	const [maximized, setMaximized] = useState(false);
	const [soundcloudClass, setSoundcloudClass] = useState("soundcloud-focused");

	const closeSoundcloud = () => {
		props.openSoundcloud(props.soundcloudOpen);
		
	};

	const setMax = () => {
		if (maximized) {
			setMaximized(false);
		} else if (!maximized) {
			setMaximized(true);
		}
	};

	const focusSoundcloud = () => {
		setSoundcloudClass("soundcloud-focused");
	};

	const blurSoundcloud = () => {
		setSoundcloudClass("soundcloud");
	};

	useEffect(() => {
		if (isMobile) {
			setMaximized(true);
		}
	},[]);

	if (!maximized) {
		return (
			<Draggable>
				<div
					id="resume-window"
					className={soundcloudClass}
					tabIndex={0}
					onFocus={focusSoundcloud}
					onBlur={blurSoundcloud}
				>
					<div className="windowBar">
						<div
							className="windowButtons minimize"
							onClick={closeSoundcloud}
						></div>
						<div
							className="windowButtons maximize"
							onClick={setMax}
						></div>
						<div
							className="windowButtons close"
							onClick={closeSoundcloud}
						></div>
					</div>
					<iframe width="100%" height="300" scrolling="no" frameBorder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/1556641363&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe><div className="sc-div"><a className="sc-a" href="https://soundcloud.com/violetapparition" title="Violet Apparition" target="_blank">Violet Apparition</a> · <a className="sc-a" href="https://soundcloud.com/violetapparition/sets/liminal" title="liminal" target="_blank">liminal</a></div>
				</div>
			</Draggable>
		);
	} else {
		return (
			<div className="maximized">
				<div className="windowBar">
					<div
						className="windowButtons minimize"
						onClick={closeSoundcloud}
					></div>
					<div
						className="windowButtons maximize"
						onClick={setMax}
					></div>
					<div
						className="windowButtons close"
						onClick={closeSoundcloud}
					></div>
				</div>
				<iframe width="100%" height="100%" scrolling="no" frameBorder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/1556641363&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe><div className="sc-div"><a className="sc-a" href="https://soundcloud.com/violetapparition" title="Violet Apparition" target="_blank">Violet Apparition</a> · <a className="sc-a" href="https://soundcloud.com/violetapparition/sets/liminal" title="liminal" target="_blank">liminal</a></div>				
			</div>
		);
	}
};

export default Soundcloud;
