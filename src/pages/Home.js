import { useEffect, useContext } from "react";
import Context from "../contexts/context";
import Tasks from "../components/app/Tasks";
import AddTask from "../components/app/AddTask";
import useGetDate from "../customHooks/useGetDate";
import useFetchTasks from "../customHooks/API/useFetchTasks";
import useGetCountTasks from "../customHooks/useGetCountTasks";
import { useTranslation } from "react-i18next";

const Home = () => {
	const {today,converToFullDate} = useGetDate();
	const {taskListToday} = useFetchTasks();
	const {countTaskToday} = useGetCountTasks();
	const { addForm } = useContext(Context);
	const stats = JSON.parse(localStorage.getItem('stats'));
	const countCompletedToday = (stats &&  stats.days_items.total_completed + "");
	const page = "Home";
	useEffect(() => {
		// title for page
		document.title = `${t("home")} | TodoList`
	// eslint-disable-next-line
	}, [])
	const { t } = useTranslation();
	return (
		<main className="main">
			<div className="main__content container">
				<div className="main__header">
					<h1 className="main__title">
						<span>{t("today")}</span>
						<small>{converToFullDate(today())}</small>
					</h1>
					<h2 className="main__count-task">Completed tasks today: {countCompletedToday ?? "0"}</h2>
				</div>
				{taskListToday && <Tasks tasks={taskListToday} page={page}/>}
				<AddTask/>
			</div>
			{taskListToday && !countTaskToday && !addForm ? 
				<div className="main__day-of">
					<i className="far fa-smile main-day-of__logo"></i>
					<p className="main-day-of__text">{t("homeEndTaskPart1")}</p>
					<p className="main-day-of__sub-text">{t("homeEndTaskPart2",{countCompletedToday})}</p>
				</div> 
				: null
			}
		</main>
	);
}
 
export default Home;