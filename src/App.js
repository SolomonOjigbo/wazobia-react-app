import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/layout/Dashboard";
import Login from "./components/forms/Login";
import Signup from "./components/forms/Signup";
import { ProtectedRoute } from "./ProtectedRoute";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "./features/user/userSlice";

function App() {
	const user = useSelector(selectCurrentUser);

	return (
		<BrowserRouter>
			<Routes>
				<Route exact path="/login" element={<Login />} />
				<Route exact path="/signup" element={<Signup />} />
				<Route element={<ProtectedRoute user={user} />}>
					<Route exact path="/" element={<Dashboard />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
