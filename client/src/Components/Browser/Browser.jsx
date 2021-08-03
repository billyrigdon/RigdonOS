import { useState, useEffect } from "react";
import Draggable, {DraggableCore} from 'react-draggable';
import "./Browser.scss"

const Browser = (props) => {

	const [maximized, setMaximized] = useState(true);
	
	const closeBrowser = () => {
		props.openBrowser(props.browserOpen);
		console.log(props);
	}

	const setMax = () => {
		if (maximized) {
			setMaximized(false);
		} else if (!maximized) {
			setMaximized(true);
		}
	}


	if (!maximized) {

		return (
			<Draggable className="window">
				<div className="browser">
					<div className="windowBar">
						<div className="windowButtons minimize" onClick={closeBrowser}></div>
						<div className="windowButtons maximize" onClick={setMax}></div>
						<div className="windowButtons close" onClick={closeBrowser}></div>
					</div>
					<iframe id="webPage" src="https://bing.com"></iframe>
				</div>
			</Draggable>
		)

	} else if (maximized) {
		return (
			<div className="maximized">
				<div className="windowBar">
					<div className="windowButtons minimize" onClick={closeBrowser}></div>
					<div className="windowButtons maximize" onClick={setMax}></div>
					<div className="windowButtons close" onClick={closeBrowser}></div>
				</div>
				<iframe id="webPage" src="https://bing.com"></iframe>
			</div>
		)
	}
}

export default Browser