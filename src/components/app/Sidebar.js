import { useState } from "react";
import { NavLink, useHistory } from 'react-router-dom';
import { useLocation } from "react-router";
import { useAuth } from '../../contexts/AuthContext';
import QuickAddTask from "./QuickAdTask";
import useGetCountTasks from "../../customHooks/useGetCountTasks";

const Sidebar = () => {
	const {countTaskToday,countTaskAll} = useGetCountTasks();
	const [isActive, setActive] = useState(true);
	const [error, setError] = useState("");
	const history = useHistory();
	const {logout, currentUser} = useAuth();
	const location = useLocation();
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
		<aside className={`sidebar ${isActive ? "sidebar__active" : ""}`}>
			<div className="sidebar__header">
				<h2 className="sidebar__logo">The best TodoList</h2>
				<div className="sidebar__humburger"
					onClick={() => setActive(!isActive)}
					data-place="right"
					data-tip={!isActive ? "Open menu" : "Close menu"}>
					<span></span>
				</div>
			</div>
			<nav className="sidebar__menu">
				<ul className="sidebar__list">
					<li>
						<NavLink 
							className="sidebar__link" 
							activeClassName="sidebar__link_active" 
							exact to="/"
							date-place="right"
							data-tip={!isActive ? "Home" : ""}>
							<i className="fas fa-home sidebar-link__logo"></i>
							<span className="sidebar-link__title">Home</span>
							<span className="sidebar-link__count">{countTaskToday ? countTaskToday : ''}</span>	
						</NavLink>
					</li>
					<li>
						<NavLink 
							className="sidebar__link" 
							activeClassName="sidebar__link_active" 
							to="/inbox"
							date-place="right"
							data-tip={!isActive ? "Inbox" : ""}>
							<i className="fas fa-inbox sidebar-link__logo"></i>
							<span className="sidebar-link__title">Inbox</span>	
							<span className="sidebar-link__count">{countTaskAll ? countTaskAll : ''}</span>	
						</NavLink>
					</li>
					<li>
						<div 
							className="sidebar__link" 
							onClick={handlerQuickAddTaskOpen.bind(null, !isQuickAddTaskOpen)}
							date-place="right"
							data-tip={!isActive ? "Quick Add Task" : ""}>
							<i className="fas fa-plus sidebar-link__logo"></i>
							<span className="sidebar-link__title">Quick Add Task</span>
						</div>
						<QuickAddTask isOpen={isQuickAddTaskOpen} handlerIsOpen={handlerQuickAddTaskOpen}/>
					</li>
					<li>
						<NavLink 
							className="sidebar__link" 
							activeClassName="sidebar__link_active"
							to={{
								pathname: "/settings",
								state: { background: location },
							}}
							date-place="right"
							data-tip={!isActive ? "Settings" : ""}>
							<i className="fas fa-cog sidebar-link__logo"></i>
							<span className="sidebar-link__title">Settings</span>
							
						</NavLink>
					</li>
				</ul>
				<div className="profile">
					<div className="profile__body">
						<div className="profile__img">
							<img src={currentUser && currentUser.photoURL} alt="" />
						</div>
						<div className="profile__detailts">
							{error && <strong className="fas fa-exclamation-circle denger">{error}</strong>}
							<strong className="profile__name">{currentUser && currentUser.displayName}</strong>
							<p className="profile__email">{currentUser && currentUser.email}</p>
						</div>
					</div>
					<i 
						className="fas fa-sign-out-alt profile__logo" 
						onClick={handleLogout.bind(null)}
						date-place="right"
						data-tip="Logout"></i>
				</div>
			</nav>
		</aside>
	);
}
 
export default Sidebar;