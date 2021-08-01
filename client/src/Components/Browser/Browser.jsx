import { useState, useEffect } from "react";
import { connect } from "react-redux";
import Draggable, {DraggableCore} from 'react-draggable';
import "./Browser.scss"


const mapStateToProps = (state) => {
	return {
		menuOpen: state.menuOpen,
		terminalOpen: state.terminalOpen,
		browserOpen: state.browserOpen
	}
};

const mapDispatchToProps = (dispatch) => {
	return {}
}


const Browser = (props) => {
	return (
		<Draggable className="window">
			<div id="browser">
				<div className="windowBar"></div>
				<iframe id="webPage" src="https://bing.com"></iframe>
			</div>
		</Draggable>
	)
}

export default connect(mapStateToProps,mapDispatchToProps)(Browser)