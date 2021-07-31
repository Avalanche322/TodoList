import { useState, useRef, useEffect } from 'react';
import NavigationList from '../NavigationList';
import ReactTooltip from "react-tooltip";
import { useTranslation } from "react-i18next";

const Header = () => {
	const [isActive, setIsActive] = useState(false);
	let headerRef = useRef();
	const { t } = useTranslation();
	useEffect(() =>{
		let hendler = (event) =>{
			if(!headerRef.current.contains(event.target)){
				setIsActive(false);
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
					<div 
						className="header__humburger" 
						onClick={() => setIsActive(!isActive)}
						data-place="right"
						data-tip={!isActive ? t("openMenu") : t("closeMenu")}>
						<span></span>
					</div>
					<h2 className="header__logo">The best TodoList</h2>
				</div>
				<nav className={`header__menu ${isActive ? 'header__menu_active' : ''}`}>
					<NavigationList isActive={isActive} setIsActive={setIsActive}/>
				</nav>
			</div>
			<ReactTooltip 
				effect="solid"		
				className="tooltip"
				arrowColor="transparent" />
		</header>
	);
}
 
export default Header;