import { useState } from "react";
import QuickAddTask from "./app/QuickAdTask";
import { NavLink } from "react-router-dom";
import useGetCountTasks from '../customHooks/useGetCountTasks';
import { useAuth } from '../contexts/AuthContext';
import { useHistory, useLocation } from 'react-router-dom';
import useWindowSize from '../customHooks/useWindowSize';
import { useTranslation } from "react-i18next";

const NavigationList = ({isActive,setIsActive}) => {
	const {logout,currentUser} = useAuth();
	const [error, setError] = useState("");
	const history = useHistory();
	const {countTaskToday,countTaskAll,countTaskNoCompleted} = useGetCountTasks();
	const location = useLocation();
	const size = useWindowSize();
	const { t } = useTranslation();
	async function handleLogout() {
		setError("")
		try {
			await logout()
			history.push("/singin")
		} catch {
			setError("Failed to log out")
		}
	}
	/*Quick Add Task Modal Box*/
  	const [isQuickAddTaskOpen,setQuickAddTaskOpen] = useState(false);
	function handlerQuickAddTaskOpen(val){
		setQuickAddTaskOpen(val);
	}
	return (
		<>
			<ul className="sidebar__list">
				<li>
					<NavLink 
						className="sidebar__link" 
						activeClassName="sidebar__link_active" 
						exact to="/"
						date-place="right"
						onClick={() => size.width <= 768 ? setIsActive(false) : null}
						data-tip={!isActive ? t("home") : ""}>
						<i className="fas fa-home sidebar-link__logo"></i>
						<span className="sidebar-link__title">{t("home")}</span>
						<span className="sidebar-link__count">{countTaskToday ? countTaskToday : ''}</span>	
					</NavLink>
				</li>
				<li>
					<NavLink 
						className="sidebar__link" 
						activeClassName="sidebar__link_active" 
						to="/inbox"
						date-place="right"
						onClick={() => size.width <= 768 ? setIsActive(false) : null}
						data-tip={!isActive ? t("inbox"): ""}>
						<i className="fas fa-inbox sidebar-link__logo"></i>
						<span className="sidebar-link__title">{t("inbox")}</span>	
						<span className={`sidebar-link__count ${countTaskNoCompleted ? "denger" : ""}`}>{countTaskAll ? countTaskAll : ''}</span>	
					</NavLink>
				</li>
				<li>
					<div 
						className="sidebar__link" 
						onClick={handlerQuickAddTaskOpen.bind(null, !isQuickAddTaskOpen)}
						date-place="right"
						
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
						onClick={() => size.width <= 768 ? setIsActive(false) : null}
						data-tip={!isActive ? t("settings") : ""}>
						<i className="fas fa-cog sidebar-link__logo"></i>
						<span className="sidebar-link__title">{t("settings")}</span>
					</NavLink>
				</li>
			</ul>
			<div className="profile">
					<NavLink to={{
						pathname: "/settings/account",
						state: { background: location, prevPath: location.pathname },
					}}>
						<div className="profile__body">
							<div className="profile__img">
								<img src={currentUser.photoURL} alt="" />
							</div>
							<div className="profile__detailts">
								{error && <strong className="fas fa-exclamation-circle denger">{error}</strong>}
								<strong className="profile__name">{currentUser.displayName}</strong>
								<p className="profile__email">{currentUser.email}</p>
							</div>
					</div>
					</NavLink>
					<i 
						className="fas fa-sign-out-alt profile__logo" 
						onClick={handleLogout.bind(null)}
						date-place="right"
						data-tip={t("logout")}></i>
				</div>
		</>
	);
}
 
export default NavigationList;