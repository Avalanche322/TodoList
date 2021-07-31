import { useState } from "react";
import NavigationList from "../NavigationList";
import { useTranslation } from "react-i18next";

const Sidebar = () => {
	const [isActive, setActive] = useState(JSON.parse(localStorage.getItem('sidebar_on')));
	const { t } = useTranslation();
	const handelSidebar = (val) =>{
		setActive(val);
		localStorage.setItem('sidebar_on', JSON.stringify(val));
	}
	return (
		<aside className={`sidebar ${isActive ? "sidebar__active" : ""}`}>
			<div className="sidebar__header">
				<h2 className="sidebar__logo">The best TodoList</h2>
				<div className="sidebar__humburger"
					onClick={handelSidebar.bind(null,!isActive)}
					data-place="right"
					data-tip={!isActive ? t("openMenu") : t("closeMenu")}>
					<span></span>
				</div>
			</div>
			<nav className="sidebar__menu">
				<NavigationList isActive={isActive}/>
			</nav>
		</aside>
	);
}
 
export default Sidebar;