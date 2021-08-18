import { useState } from "react";
import NavigationList from "../NavigationList";
import { useTranslation } from "react-i18next";
import { useContext } from "react";
import Context from "../../contexts/context";

const Sidebar = () => {
	const { settings } = useContext(Context);
	const [isActive, setActive] = useState(JSON.parse(localStorage.getItem('sidebar_on')));
	const { t } = useTranslation();
	const handlerSidebar = () =>{
		setActive(!isActive);
		localStorage.setItem('sidebar_on', JSON.stringify(!isActive));
		if(settings.vibration) navigator.vibrate(10); // togle vibration
	}
	return (
		<aside className={`sidebar ${isActive  ? "sidebar__active" : ""}`}>
			<div className="sidebar__header">
				<h2 className="sidebar__logo">The best TodoList</h2>
				<div className="sidebar__humburger"
					onClick={handlerSidebar.bind(null)}
					data-place="right"
					data-tip={!isActive  ? t("openMenu") : t("closeMenu")}>
					<span></span>
				</div>
			</div>
			<nav className="sidebar__menu">
				<NavigationList isActive={isActive }/>
			</nav>
		</aside>
	);
}
 
export default Sidebar;