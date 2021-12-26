import { memo, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../contexts/AuthContext";
import Footer from "../components/app/Footer";

const Help = () => {
	const { t } = useTranslation();
	const {updateSettings, currentUser} = useAuth();
	let settings = JSON.parse(localStorage.getItem('settings'));
	const [active, setActive] = useState(false);
	useEffect(() => {
		// title for page
		document.title = `${t("help")} | TodoList`;
	})
	const handlerChangeLanguege = (e) =>{
		if(settings.vibration) navigator.vibrate(8); // togle vibration
		try{
			settings.language = e.target.value;
			updateSettings(settings);
			localStorage.setItem('settings', JSON.stringify(settings));
		}catch(e){
			alert(e.message);
		}
	}
	return (
		<section className='help'>
			<header className='help__header header-help header'>
				<div className="big-container header-help__content">
					<h2 className='header-help__title'>
						<Link to='/home'>The best TodoList | {t("help")}</Link>
					</h2>
					<div className={`header-help__menu ${active ? '_active' : ''}`}>
						<div className='header-help__group'>
							{currentUser 
								? currentUser.displayName 
								: <Link className='header-help__link' to='/singin'>Log In</Link>}
						</div>
						<div className="select header-help__select" tabIndex="1">
							<select name="language" id="language" onChange={handlerChangeLanguege} value={settings?.language}>
								<option value="en">English</option>
								<option value="uk">Ukraine</option>
							</select>
							<i className="fas fa-sort-down select__arrow"></i>
						</div>
					</div>
					<div
						onClick={() => setActive(!active)}
						className={`${active ? '_active' : ''} header-help__humburger header__humburger`}><span></span></div>
				</div>
			</header>
			<div className='help__main main-help'>
				<div className="big-container main-help__content">
					
				</div>
			</div>
			<Footer/>
		</section>
	);
}
 
export default memo(Help);