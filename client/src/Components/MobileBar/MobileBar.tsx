import { useState, useEffect } from "react";
import "./MobileBar.scss";
import React from "react";

const MobileBar = () => {
	const [currentTime, setCurrentTime] = useState(new Date());

	useEffect(() => {
		const timer = setInterval(() => {
			setCurrentTime(new Date());
		}, 1000);
		return function cleanup() {
			clearInterval(timer);
		};
	});

	return (
		<div id="mobile-bar">
			<div id="mobileTime">
				<p id="mobileTime">{currentTime.toLocaleTimeString()}</p>
			</div>
			<div id="mobile-icon-container">
				<span className="material-icons mobile-icons">cell_wifi</span>
				<span className="material-icons mobile-icons">
					battery_full
				</span>
				<p>100%</p>
			</div>
		</div>
	);
};

export default MobileBar;
