import Tasks from "../components/app/Tasks";
import AddTask from "../components/app/AddTask";
import { useEffect } from "react";
import useFetchTasks from "../customHooks/API/useFetchTasks";
import useGetCountTasks from "../customHooks/useGetCountTasks";

const Inbox = () => {
	const {taskListAll} = useFetchTasks();
	const {countTaskAll} = useGetCountTasks();
	useEffect(() => {
		// title for page
		document.title = "Inbox | TodoList"
	}, [])
	return (
		<main className="main">
			<div className="main__content container">
				<div className="main__header">
					<h1 className="main__title"><span>Inbox</span></h1>
				</div>
				{taskListAll && <Tasks tasks={taskListAll}/>}
				<AddTask/>
			</div>
			{!countTaskAll ? 
				<div className="main__day-of">
					<i className="fas fa-poo main-day-of__logo"></i>
					<p className="main-day-of__text">All clear</p>
					<p className="main-day-of__sub-text">Looks like everything's organized in the right place.</p>
				</div> 
				: null
			}
		</main>
	);
}
 
export default Inbox;