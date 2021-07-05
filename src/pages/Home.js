import Tasks from "../components/app/Tasks";
import AddTask from "../components/app/AddTask";
import useGetDate from "../customHooks/useGetDate";
import { useEffect } from "react";
import useFetchTasks from "../customHooks/API/useFetchTasks";
import useGetCountTasks from "../customHooks/useGetCountTasks";

const Home = () => {
	const {today} = useGetDate();
	const {taskListToday} = useFetchTasks();
	const {countTaskToday} = useGetCountTasks();
	useEffect(() => {
		// title for page
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
				{taskListToday && <Tasks tasks={taskListToday}/>}
				<AddTask/>
			</div>
			{!countTaskToday ? 
				<div className="main__day-of">
					<i className="far fa-smile main-day-of__logo"></i>
					<p className="main-day-of__text">Enjoy your day off</p>
				</div> 
				: null
			}
		</main>
	);
}
 
export default Home;