import { NavLink,useHistory } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import QuickAddTask from "./QuickAdTask";

const Header = () => {
	const [isActive, setActive] = useState(false);
	const {logout,currentUser} = useAuth();
	const [error, setError] = useState("");
	const history = useHistory();
	let headerRef = useRef();
	useEffect(() =>{
		let hendler = (event) =>{
			if(!headerRef.current.contains(event.target)){
				setActive(false);
			}
		}
		document.addEventListener("mousedown", hendler)
		return () =>{
			document.removeEventListener("mousedown", hendler)
		}
	});
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
		<header ref={headerRef} className="header">
			<div className="header__content">
				<div className="header__start">
					<div className="header__humburger" onClick={() => setActive(!isActive)}>
						<span></span>
					</div>
					<h2 className="header__logo">The best TodoList</h2>
				</div>
				<nav className={`header__menu ${isActive ? 'header__menu_active' : ''}`}>
					<ul className="header__list">
						<li>
							<NavLink 
								className="header__link" 
								activeClassName="header__link_active"
								exact to="/home"
								onClick={() => setActive(false)}>
								<i className="fas fa-home"></i>
								<span>Home</span>
							</NavLink>
						</li>
						<li>
							<NavLink 
							className="header__link" 
							activeClassName="header__link_active" 
							to="/inbox"
							onClick={() => setActive(false)}>
								<i className="fas fa-inbox"></i>
								<span>Inbox</span>
							</NavLink>
						</li>
						<li>
							<div className="header__link" onClick={() =>{
								handlerQuickAddTaskOpen(!isQuickAddTaskOpen);
								setActive(false);
							}}>
								<i className="fas fa-plus"></i>
								<span>Quick Add Task</span>
								<QuickAddTask isOpen={isQuickAddTaskOpen} handlerIsOpen={handlerQuickAddTaskOpen}/>
							</div>
						</li>
						<li>
						<NavLink 
						className="header__link" 
						activeClassName="header__link_active" 
						to="/settings"
						onClick={() => setActive(false)}>
							<i className="fas fa-cog"></i>
							<span>Settings</span>
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
					<i className="fas fa-sign-out-alt profile__logo" onClick={handleLogout.bind(null)}></i>
				</div>
				</nav>
			</div>
		</header>
	);
}
 
export default Header;