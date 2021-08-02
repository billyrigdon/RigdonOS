import React, { Component } from "react";
import ReactTerminal from "react-terminal-component";
import Draggable, {DraggableCore} from 'react-draggable';
import "./Terminal.scss"


const Terminal = (props) => {
	return (
		<Draggable className="window">
				<div className="terminal">
					<div className="windowBar">
						<div className="windowButtons minimize"></div>
						<div className="windowButtons maximize"></div>
						<div className="windowButtons close"></div>
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