import {
	BrowserRouter,
	Routes,
	Route,
	useNavigate,
	Navigate,
} from "react-router-dom";
import Dashboard from "./components/layout/Dashboard";
import Login from "./components/forms/Login";
import Signup from "./components/forms/Signup";
import { ProtectedRoute } from "./ProtectedRoute";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "./features/user/userSlice";
import { useEffect } from "react";
import { getUser } from "./features/api/auth";

function App() {
	const user = useSelector(selectCurrentUser);
	const token = useSelector((state) => state.token);
	const dispatch = useDispatch();

	useEffect(() => {
		if (token) {
			dispatch(getUser());
			<Navigate to="/" />;
		}
	}, [token]);

	return (
		<BrowserRouter>
			<Routes>
				<Route exact path="/login" element={<Login />} />
				<Route exact path="/signup" element={<Signup />} />
				<Route element={<ProtectedRoute token={token} />}>
					<Route exact path="/" element={<Dashboard />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
