import "./StartMenu.scss";
import terminalIcon from "../../Icons/terminal.svg";
import browserIcon from "../../Icons/browser.svg";
import notesIcon from "../../Icons/notepad-48.svg";
import filesIcon from "../../Icons/file-manager.svg";
import soundcloudIcon from "../../Icons/soundcloud.svg";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import React from "react";
import { Props } from "../App/App";

const StartMenu = (props: Props) => {
	const openFileManager = () => {
		props.openFileManager(props.fileManagerOpen);
		console.log(props);
	};

	const openTerminal = () => {
		props.openTerminal(props.terminalOpen);
		console.log(props);
	};

	const openBrowser = () => {
		props.openBrowser(props.browserOpen);
		console.log(props);
	};

	const openNotes = () => {
		props.openNotes(props.notesOpen);
		console.log(props);
	};

	const openMenu = () => {
		props.openMenu(props.menuOpen);
		console.log(props);
	};

	
	const openSoundcloud = () => {
		// props.openSoundcloud(props.soundcloudOpen);
		console.log(props);
		window.open('http://violetapparition.com', "_blank")
	};

	const startRef = useRef(null);

	useEffect(() => {
		gsap.from(startRef.current, {
			y: 300,
			duration: 0.2,
			opacity: 0,
			ease: "back",
		});
	}, [props.menuOpen]);

	return (
		<div id="startMenu" tabIndex={0} onBlur={openMenu} ref={startRef}>
			<div className="startApps" onClick={openFileManager}>
				<img src={filesIcon} alt="File Manager" />
				<p>Files</p>
			</div>
			<div className="startApps" onClick={openTerminal}>
				<img src={terminalIcon} alt="Terminal" />
				<p>Terminal</p>
			</div>
			<div className="startApps" onClick={openBrowser}>
				<img src={browserIcon} alt="Browser" />
				<p>Browser</p>
			</div>
			<div className="startApps" onClick={openNotes}>
				<img src={notesIcon} alt="Notes" />
				<p>Notes</p>
			</div>
			<div className="startApps" onClick={openSoundcloud}>
				<img src={soundcloudIcon} alt="Soundcloud" />
				<p>Soundcloud</p>
			</div>
		</div>
	);
};

export default StartMenu;
