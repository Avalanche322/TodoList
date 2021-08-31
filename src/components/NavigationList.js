import { memo, useState } from "react";
import QuickAddTask from "./app/QuickAdTask";
import { NavLink } from "react-router-dom";
import useGetCountTasks from '../customHooks/useGetCountTasks';
import { useAuth } from '../contexts/AuthContext';
import { useHistory, useLocation } from 'react-router-dom';
import useWindowSize from '../customHooks/useWindowSize';
import { useTranslation } from "react-i18next";
import Context from "../contexts/context";
import { useContext } from "react";

const NavigationList = ({isActive,setIsActive}) => {
	const {logout,currentUser} = useAuth();
	const {settings} = useContext(Context);
	const history = useHistory();
	const {countTaskToday,countTaskAll,countTaskNoCompleted} = useGetCountTasks();
	const location = useLocation();
	const {windowSize} = useWindowSize();
	const { t } = useTranslation();
	const stats = JSON.parse(localStorage.getItem('stats'));
	const countCompletedToday = (stats && stats.days_items.total_completed + "");
	const countCompletedAll = (stats && stats.completed_count + "");
	async function handleLogout() {
		try {
			await logout();
			if(settings.vibration) navigator.vibrate(200); // togle vibration
			history.push("/singin");
			window.location.reload();
		} catch(e) {
			alert(e.message);
		}
	}
	/*Quick Add Task Modal Box*/
  	const [isQuickAddTaskOpen,setQuickAddTaskOpen] = useState(false);
	function handlerQuickAddTaskOpen(val){
		setQuickAddTaskOpen(val);
		if(windowSize.width <= 768){
			setIsActive(false);
		}
		if(val && settings.vibration){
			navigator.vibrate(8); // togle vibration
		}
	}
	function handlerMobileMenu(){
		if(windowSize.width <= 768) setIsActive(false)
		if(settings.vibration) navigator.vibrate(8); // togle vibration
	}
	return (
		<>
			<div>
				<ul className="sidebar__list">
					<li>
						<NavLink 
							className="sidebar__link" 
							activeClassName="sidebar__link_active" 
							exact to="/"
							date-place="right"
							onClick={handlerMobileMenu}
							data-for="tooltip-aside"
							data-tip={!isActive ? t("home") : ""}>
							<i className="fas fa-home sidebar-link__logo"></i>
							<span className="sidebar-link__title">{t("home")}</span>
							<span className={`sidebar-link__count ${countTaskNoCompleted ? "denger" : ""}`}>{countTaskToday ? countTaskToday : ''}</span>	
						</NavLink>
					</li>
					<li>
						<NavLink 
							className="sidebar__link" 
							activeClassName="sidebar__link_active" 
							to="/inbox"
							date-place="right"
							onClick={handlerMobileMenu}
							data-for="tooltip-aside"
							data-tip={!isActive ? t("inbox"): ""}>
							<i className="fas fa-inbox sidebar-link__logo"></i>
							<span className="sidebar-link__title">{t("inbox")}</span>	
							<span className="sidebar-link__count">{countTaskAll ? countTaskAll : ''}</span>	
						</NavLink>
					</li>
					<li>
						<div 
							tabIndex="0"
							className="sidebar__link" 
							onClick={handlerQuickAddTaskOpen.bind(null,!isQuickAddTaskOpen)}
							onKeyDown={(e) => e.key === "Enter" ?  handlerQuickAddTaskOpen(!isQuickAddTaskOpen) : null}
							date-place="right"
							data-for="tooltip-aside"
							data-tip={!isActive ? t("quickAddTask") : ""}>
							<i className="fas fa-plus sidebar-link__logo"></i>
							<span className="sidebar-link__title">{t("quickAddTask")}</span>
						</div>
						<QuickAddTask isOpen={isQuickAddTaskOpen} handlerIsOpen={handlerQuickAddTaskOpen}/>
					</li>
					<li>
						<NavLink 
							className="sidebar__link" 
							activeClassName="sidebar__link_active"
							to={{
								pathname: "/settings/account",
								state: { background: location, prevPath: location.pathname },
							}}
							date-place="right"
							onClick={handlerMobileMenu}
							data-for="tooltip-aside"
							data-tip={!isActive ? t("settings") : ""}>
							<i className="fas fa-cog sidebar-link__logo"></i>
							<span className="sidebar-link__title">{t("settings")}</span>
						</NavLink>
					</li>
				</ul>
				<div className="stats">
					<h2 className="stats__title">Stats</h2>
					<div className="stats__count-task" 
						data-for="tooltip-aside"
						data-tip={!isActive ? `${t("completedTasksToday")} ${(countCompletedToday ?? "0")}`: ""}> 
						<i className="fas fa-calendar-week stats__logo"></i>
						<span>{t("completedTasksToday")} {countCompletedToday ?? "0"}</span>
					</div>
					<div className="stats__count-task"
						data-for="tooltip-aside"
						data-tip={!isActive ? `${t("completedAllTasks")} ${(countCompletedAll ?? "0")}`: ""}> 
						<i className="fas fa-tasks stats__logo"></i>
						<span>{t("completedAllTasks")} {countCompletedAll ?? "0"}</span>
					</div>
				</div>
			</div>
			<div className="profile">
					<NavLink
						className="profile__link"
						tabIndex={!isActive ? '-1' : '0'}
						to={{
							pathname: "/settings/account",
							state: { background: location, prevPath: location.pathname },
						}}
						onClick={handlerMobileMenu}>
						<div className="profile__body">
							<div className="profile__img avatar">
								<img src={currentUser.photoURL} alt="" />
							</div>
							<div className="profile__details">
								<strong className="profile__name">{currentUser.displayName}</strong>
								<p className="profile__email">{currentUser.email}</p>
							</div>
					</div>
					</NavLink>
					<button
						type="button" 
						className="fas fa-sign-out-alt profile__logout" 
						onClick={handleLogout.bind(null)}
						date-place="right"
						data-for="tooltip-aside"
						data-tip={t("logout")}></button>
				</div>
		</>
	);
}
 
export default memo(NavigationList);