import { useState, useEffect } from "react";
import Draggable, {DraggableCore} from 'react-draggable';
import "./Browser.scss"

const Browser = (props) => {

	const [maximized, setMaximized] = useState(true);
	const [browserClass, setBrowserClass] = useState("browser-focused");


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

	const focusBrowser = () => {
		setBrowserClass("browser-focused");
	}

	const blurBrowser = () => {
		setBrowserClass("browser");
	}


	if (!maximized) {

		return (
			<Draggable className="window">
				<div id="browser-window" className={browserClass} tabIndex={0} onFocus={focusBrowser} onBlur={blurBrowser}>
					<div className="windowBar">
						<div className="windowButtons minimize" onClick={closeBrowser}></div>
						<div className="windowButtons maximize" onClick={setMax}></div>
						<div className="windowButtons close" onClick={closeBrowser}></div>
					</div>
					<iframe onFocus={focusBrowser} onBlur={blurBrowser} id="webPage" src="https://bing.com"></iframe>
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
				<iframe id="webPage" src="http://bing.com"></iframe>
			</div>
		)
	}
}

export default Browser