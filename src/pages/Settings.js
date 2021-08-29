import React ,{ memo, useContext, useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router";
import {BrowserRouter as Router, Switch, NavLink, Route} from 'react-router-dom';
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useTranslation } from "react-i18next";
import { useSwipeable } from "react-swipeable";
import General from "./Settings/General";
import Account from "./Settings/Account";
import ChangeEmail from "./Settings/ChangeEmail";
import ChangePassword from "./Settings/ChangePassword";
import DeleteAccount from "./Settings/DeleteAccount";
import Context from "../contexts/context";

const Settings = () => {
	const {settings} = useContext(Context);
	const [isActiveSidebar, setIsActiveSidebar] = useState(false);
	const history = useHistory();
	const { t } = useTranslation();
	let location = useLocation();
	const close = e => {
		e.stopPropagation();
		history.push(location.state.prevPath);
		if(settings.vibration) navigator.vibrate(8); // togle vibration
	};
	const back = e => {
		e.stopPropagation();
		history.go(-1);
		if(settings.vibration) navigator.vibrate(8); // togle vibration
	};
	const handlerActiveSidebar = () => {
		setIsActiveSidebar(!isActiveSidebar);
		if(settings.vibration) navigator.vibrate(8); // togle vibration
	};
	const handlers = useSwipeable({
		onSwipedRight: () => {
			setIsActiveSidebar(true);
			if(settings.vibration) navigator.vibrate(8);
		},
		onSwipedLeft: () => {
			setIsActiveSidebar(false);
			if(settings.vibration) navigator.vibrate(8);
		},
	});
	useEffect(() => {
		document.addEventListener('keydown', (event) => {
			if(event.code === 'Escape'){
				history.push(location.state.prevPath);
			}
		});
	//eslint-disable-next-line
	},[])
	return (
		<Router>
			<TransitionGroup component={null}>
			<CSSTransition 
				in={true}
				classNames="scale" 
				timeout={300}>
				<section className="settings" onClick={close} {...handlers}>
					<div className="settings__body" onClick={e => e.stopPropagation()}>
						<div className={`settings__sidebar ${isActiveSidebar ? "active" : ""}`}>
							<header className="settings-sidebar__header">
								<h1 className="settings__title">{t("settings")}</h1>
								<span className="fas fa-times close" onClick={handlerActiveSidebar.bind(null)}></span>
							</header>
							<ul className="settings-sidebar__menu">
								<li>
									<NavLink 
										className="settings-sidebar__item" 
										activeClassName="settings-sidebar__item_active" 
										to="/settings/account"
										onClick={handlerActiveSidebar.bind(null, false)}>
										<i className="far fa-user-circle settings-sidebar__logo"></i>
										<span className="">{t("account")}</span>
									</NavLink>
								</li>
								<li>
									<NavLink 
										className="settings-sidebar__item" 
										activeClassName="settings-sidebar__item_active" 
										to="/settings/genneral"
										onClick={handlerActiveSidebar.bind(null, false)}>
										<i className="fas fa-cog settings-sidebar__logo"></i>
										<span className="">{t("general")}</span>	
									</NavLink>
								</li>
							</ul>
						</div>
						<div className="settings__content">
							<TransitionGroup component={null}>
								<Switch>
									<Route exact path="/settings/account" >
										<CSSTransition in={true} key=".1" timeout={600} classNames="move-back" unmountOnExit>
											<Account close={close} handlerActiveSidebar={handlerActiveSidebar} />
										</CSSTransition>
									</Route>
									<Route exact path="/settings/genneral">
										<CSSTransition in={true} key=".2" timeout={600} classNames="move-back" unmountOnExit>
											<General close={close} handlerActiveSidebar={handlerActiveSidebar} />
										</CSSTransition>
									</Route>
									<Route exact path="/settings/account/email">
										<CSSTransition in={true} key=".3" timeout={600} classNames="move-back" unmountOnExit>
											<ChangeEmail close={close} back={back} handlerActiveSidebar={handlerActiveSidebar} />
										</CSSTransition>
									</Route>
									<Route exact path="/settings/account/password">
										<CSSTransition in={true} key=".4" timeout={600} classNames="move-back" unmountOnExit>
											<ChangePassword close={close} back={back} handlerActiveSidebar={handlerActiveSidebar} />
										</CSSTransition>
									</Route>
									<Route exact path="/settings/account/delete">
										<CSSTransition in={true} key=".5" timeout={600} classNames="move-back" unmountOnExit>
											<DeleteAccount close={close} back={back} handlerActiveSidebar={handlerActiveSidebar} />
										</CSSTransition>
									</Route>
								</Switch>
							</TransitionGroup>
						</div>
					</div>
				</section>
			</CSSTransition>
			</TransitionGroup>
		</Router>
	);
}
 
export default memo(Settings);