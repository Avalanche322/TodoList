import { useEffect, useContext } from "react";
import Context from "../contexts/context";
import Tasks from "../components/app/Tasks";
import AddTask from "../components/app/AddTask";
import useFetchTasks from "../customHooks/API/useFetchTasks";
import useGetCountTasks from "../customHooks/useGetCountTasks";
import { useTranslation } from "react-i18next";

const Inbox = () => {
	const {taskListAll} = useFetchTasks();
	const {countTaskAll} = useGetCountTasks();
	const { addForm } = useContext(Context);
	const stats = JSON.parse(localStorage.getItem('stats'));
	const countCompletedAll = stats.completed_count + "";
	useEffect(() => {
		// title for page
		document.title = `${t("inbox")} | TodoList`;
	// eslint-disable-next-line
	}, [])
	const { t } = useTranslation();
	return (
		<main className="main">
			<div className="main__content container">
				<div className="main__header">
					<h1 className="main__title"><span>{t("inbox")}</span></h1>
					<h2 className="main__count-task">Completed all tasks: {countCompletedAll ?? "0"}</h2>
				</div>
				{taskListAll && <Tasks tasks={taskListAll}/>}
				<AddTask/>
			</div>
			{taskListAll && !countTaskAll && !addForm ? 
				<div className="main__day-of">
					<i className="fas fa-poo main-day-of__logo"></i>
					<p className="main-day-of__text">{t("inboxEndTaskPart1")}</p>
					<p className="main-day-of__sub-text">{t("inboxEndTaskPart2")}</p>
				</div> 
				: null
			}
		</main>
	);
}
 
export default Inbox;