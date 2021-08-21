import { useEffect, useContext, useState, memo } from "react";
import { useTranslation } from "react-i18next";
import DataSort from "react-data-sort";
import Context from "../contexts/context";
import Tasks from "../components/app/Tasks";
import AddTask from "../components/app/AddTask";
import useGetDate from "../customHooks/useGetDate";
import useGetCountTasks from "../customHooks/useGetCountTasks";
import Sort from "../components/Sort";
import SubSort from "../components/SubSort";

const Home = () => {
	const { addForm,tasks } = useContext(Context);
	const {today,converToFullDate,converToShortDate} = useGetDate();
	const taskListToday = tasks.filter(t => converToShortDate(t.date) <= converToShortDate(today()));
	const {countTaskToday} = useGetCountTasks();
	const stats = JSON.parse(localStorage.getItem('stats'));
	const countCompletedToday = (stats && stats.days_items.total_completed + "");
	const { t } = useTranslation();
	const page = "home";
	const [selectItemSort,setSelectItemSort] = useState(JSON.parse(localStorage.getItem('sort')) ?? {home: {}, inbox: {}});
	useEffect(() => {
		// title for page
		document.title = `${t("home")} | TodoList`;
	})
	return (
		<main className="main">
			<div className="main__content container">
				<div className="main__header">
					<h1 className="main__title">
						<span>{t("today")}</span>
						<small>{converToFullDate(today())}</small>
					</h1>
					<Sort selectItemSort={selectItemSort} setSelectItemSort={setSelectItemSort} project={page} />
				</div>
					{JSON.stringify(selectItemSort?.home) !== '{}' && 
						<SubSort selectItemSort={selectItemSort} setSelectItemSort={setSelectItemSort} project={page} />
					}			
				{taskListToday && 
				<DataSort
					data={taskListToday.length > 0 ? taskListToday : [{0:null}]}
					defaultSortBy={selectItemSort.home?.sorted_by}
					sortBy = {selectItemSort.home?.sorted_by === 'alphabetically' ? 'body' : selectItemSort.home?.sorted_by}
					direction= {selectItemSort.home?.sort_order}
					render={({data}) => {
						return (
							<Tasks tasks={data} page={page}/>
						)
					}}/>
				}
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
 
export default memo(Home);