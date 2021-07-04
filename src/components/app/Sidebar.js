import { useState } from "react";
import { NavLink, useHistory } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Sidebar = () => {
	const [isActive, setActive] = useState(true);
	// eslint-disable-next-line
	const [error, setError] = useState("")
	const history = useHistory()
	const {logout, currentUser} = useAuth();
	async function handleLogout() {
    setError("")

    try {
      await logout()
      history.push("/singin")
    } catch {
      setError("Failed to log out")
    }
  }
	return (
		<aside className={`sidebar ${isActive ? "sidebar__active" : ""}`}>
			<div className="sidebar__header">
				<h2 className="sidebar__logo">The best TodoList</h2>
				<div className={`sidebar__humburger ${isActive ? "active" : ""}`}
				onClick={() => setActive(!isActive)}>
					<span></span>
				</div>
			</div>
			<nav className="sidebar__menu">
				<ul className="sidebar__list">
					<li>
						<NavLink className="sidebar__link" activeClassName="sidebar__link_active" exact to="/">
							<i className="fas fa-home sidebar-link__logo"></i>
							<span className="sidebar-link__title">Home</span>		
						</NavLink>
					</li>
					<li>
						<NavLink className="sidebar__link" activeClassName="sidebar__link_active" exact to="/inbox">
							<i className="fas fa-inbox sidebar-link__logo"></i>
							<span className="sidebar-link__title">Inbox</span>			
						</NavLink>
					</li>
					<li>
						<div className="sidebar__link">
							<i className="fas fa-plus sidebar-link__logo"></i>
							<span className="sidebar-link__title">Quick Add Task</span>
						</div>
					</li>
					<li>
						<NavLink className="sidebar__link" activeClassName="sidebar__link_active" exact to="/settings">
							<i className="fas fa-cog sidebar-link__logo"></i>
							<span className="sidebar-link__title">Settings</span>
						</NavLink>
					</li>
				</ul>
				<div className="sidebar__profile">
					<div className="sidebar-profile__body">
						<div className="sidebar-profile__img">
							<img src={currentUser && currentUser.photoURL} alt="" />
						</div>
						<div className="sidebar-profile__detailts">
							<strong className="sidebar-profile__name">{currentUser && currentUser.displayName}</strong>
							<p className="sidebar-profile__email">{currentUser && currentUser.email}</p>
						</div>
					</div>
					<i className="fas fa-sign-out-alt sidebar-profile__logo" onClick={handleLogout.bind(null)}></i>
				</div>
			</nav>
		</aside>
	);
}
 
export default Sidebar;