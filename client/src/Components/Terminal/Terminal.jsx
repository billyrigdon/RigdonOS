import React, { Component, useEffect, useState } from "react";
import ReactTerminal from "react-terminal-component";
import Draggable, {DraggableCore} from 'react-draggable';
import "./Terminal.scss"


const Terminal = (props) => {

	const [termClass, setTermClass] = useState("terminal");

	const maxTerm = () => {
		if (termClass !== "maximized") {
			setTermClass("maximized")
		} else {
			setTermClass("terminal")
		}
	}

	const closeTerminal = () => {
		props.openTerminal(props.terminalOpen);
		console.log(props);
	}
	
	return (
		<Draggable className="window">
				<div id="terminal" className={termClass}>
					<div className="windowBar">
						<div className="windowButtons minimize"></div>
						<div className="windowButtons maximize" onClick={maxTerm}></div>
						<div className="windowButtons close" onClick={closeTerminal}></div>
					</div>
					<ReactTerminal theme={{
						background: '#141313',
						promptSymbolColor: '#6effe6',	
						commandColor: '#fcfcfc',
						outputColor: '#fcfcfc',
						errorOutputColor: '#ff89bd',
						fontSize: '1.1rem',
						spacing: '1%',
						fontFamily: 'monospace',
						width: '100%',
						height: '90%'
					}}/>
				</div>
		</Draggable>
	)
}

export default Terminal;