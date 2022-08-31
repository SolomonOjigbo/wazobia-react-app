import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/forms/Login";
import Signup from "./components/forms/Signup";

function App() {
	return (
		<BrowserRouter>
			<div className="App">
				<Routes>
					<Route path="/login" element={<Login />} />
					<Route path="/signup" element={<Signup />} />
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
