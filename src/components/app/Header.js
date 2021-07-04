import { NavLink } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react';

const Header = () => {
	const [isActive, setActive] = useState(false);
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
	return (
		<header ref={headerRef} className="header">
			<div className="header__content">
				<div className="header__start">
					<div className="header__humburger" onClick={() => setActive(!isActive)}>
						<span></span>
					</div>
					<h2 className="header__logo">The best TodoList</h2>
				</div>
				<div className="header__account"></div>
				<nav className={`header__menu ${isActive ? 'header__menu_active' : ''}`}>
					<ul className="header__list">
					<li>
						<NavLink 
							className="header__link" 
							activeClassName="header__link_active"
							exact to="/"
							onClick={() => setActive(false)}>
							<i className="fas fa-home"></i>
							<span>Home</span>
						</NavLink>
					</li>
					<li>
						<NavLink 
						className="header__link" 
						activeClassName="header__link_active" 
						exact to="/inbox"
						onClick={() => setActive(false)}>
							<i className="fas fa-inbox"></i>
							<span>Inbox</span>
						</NavLink>
					</li>
					<li>
						<div className="header__link">
							<i className="fas fa-plus"></i>
							<span>Quick Add Task</span>
						</div>
					</li>
					<li>
					<NavLink 
					className="header__link" 
					activeClassName="header__link_active" 
					exact to="/settings"
					onClick={() => setActive(false)}>
						<i className="fas fa-cog"></i>
						<span>Settings</span>
					</NavLink>
				</li>
				</ul>
				</nav>
			</div>
		</header>
	);
}
 
export default Header;