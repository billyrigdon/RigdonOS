import { useState, useEffect } from "react";
import Draggable, {DraggableCore} from 'react-draggable';
import "./Browser.scss"

const Browser = (props) => {
	return (
		<Draggable className="window">
			<div id="browser">
				<div className="windowBar">
					<div className="windowButtons minimize"></div>
					<div className="windowButtons maximize"></div>
					<div className="windowButtons close"></div>
				</div>
				<iframe id="webPage" src="https://bing.com"></iframe>
			</div>
		</Draggable>
	)
}

export default Browser