import "./App.scss";
import Taskbar from "../Taskbar/Taskbar";
import Desktop from "../Desktop/Desktop";
import Terminal from "../Terminal/Terminal";
import { Provider } from "react-redux";
import { store } from "../../Redux/store";


const App = () => {
  return (
    <Provider store={store}>
		<Desktop />
		<Terminal />
		<Taskbar />
	</Provider>
  );
};

export default App;
