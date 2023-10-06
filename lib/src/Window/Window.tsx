import "./Window.scss";
// import "./xterm.scss";
import React, { useRef, useEffect, useState } from "react";
import Draggable from "react-draggable";

const OSWindowComponent = () => {
    return (
        <Draggable>
            <div
                className={"windowContainer"}
                tabIndex={0}
            >
                <div className="windowBar">
                    <div className="windowButtonsContainer">
                        <div
                            className="windowButtons minimize"

                        />
                        <div
                            className="windowButtons maximize"

                        />
                        <div
                            className="windowButtons close"

                        />
                    </div>
                </div>
                <div id="window-view">
                    TEST
                </div>
            </div>
        </Draggable>
    );
}

export default OSWindowComponent; 