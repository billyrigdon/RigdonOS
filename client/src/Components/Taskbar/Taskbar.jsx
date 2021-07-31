import "./Taskbar.scss";
import { userSelector, useDispatch, connect } from "react-redux"
import { toggleMenu, store } from "../../Redux/store"
import { useState, useEffect } from "react";
import StartMenu from "../StartMenu/StartMenu"



const mapStateToProps = (state) => {
	return {
		menuOpen: state.menuOpen
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		openMenu: (menuOpen) => {
			dispatch(toggleMenu(menuOpen));
		}
	}
}

const Taskbar = (props) => {

	const [currentTime, setCurrentTime] = useState(new Date());

	useEffect(() => {
		const timer = setInterval(setCurrentTime(new Date()),1000);
		return function cleanup() {clearInterval(timer)};
	});

	const openMenu = () => {
		props.openMenu(props.menuOpen)
		console.log(props)	
	};

	return (
		<div>
			{props.menuOpen && <StartMenu />}
			<div id="taskbar">
				<button id="startMenuButton" onClick={openMenu}>Start</button>
				<p id="taskbarTime">{currentTime.toLocaleString()}</p>
			</div>
		</div>
	)
};



export default connect(mapStateToProps,mapDispatchToProps)(Taskbar);