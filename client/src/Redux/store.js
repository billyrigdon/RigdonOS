import { createStore } from "redux";

const TOGGLEMENU = "TOGGLEMENU";

const initialState = {
	menuOpen: false
};

const toggleMenu = (menuOpen) => {
	return {
		type: TOGGLEMENU
	}
};

const menuReducer = (state = initialState, action) => {
	switch (action.type) {
		case TOGGLEMENU:
			return {
				...state, 
				menuOpen: !state.menuOpen 
			}
		default:
			return state
	}
}

const store = createStore(menuReducer);

export { store, toggleMenu };