import Tasks from "../components/app/Tasks";
import AddTask from "../components/app/AddTask";
import useGetDate from "../customHooks/useGetDate";
import { useEffect } from "react";
const Home = () => {
	const {today} = useGetDate();
	useEffect(() => {
		document.title = "Home | TodoList"
	}, [])
	return (
		<main className="main">
			<div className="main__content container">
				<div className="main__header">
					<h1 className="main__title">
						<span>Today</span>
						<small>{today()}</small>
					</h1>
				</div>
				<Tasks/>
				<AddTask/>
			</div>
		</main>
	);
}
 
export default Home;