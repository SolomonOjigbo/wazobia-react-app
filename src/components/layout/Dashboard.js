import { Outlet } from "react-router-dom";
import AddEventForm from "../forms/AddEventForm";
import Header from "./Header";

const Dashboard = () => {
	return (
		<>
			<Header />
			<main>
				<Outlet />
			</main>
			<AddEventForm />
		</>
	);
};

export default Dashboard;
