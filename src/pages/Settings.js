import React ,{ useState } from "react";
import { useHistory, useLocation } from "react-router";
import {BrowserRouter as Router, Switch, NavLink} from 'react-router-dom'
import PrivateRoute from "../components/PrivateRoute";
import General from "./Settings/General";
import Account from "./Settings/Account";
import ChangeEmail from "./Settings/ChangeEmail";
import ChangePassword from "./Settings/ChangePassword";
import DeleteAccount from "./Settings/DeleteAccount"
import { useTranslation } from "react-i18next";

const Settings = () => {
	const [isActiveSidebar, setIsActiveSidebar] = useState(false);
	const history = useHistory();
	const { t } = useTranslation();
	let location = useLocation();
	const close = e => {
		e.stopPropagation();
		history.push(location.state.prevPath);
	};
	const back = e => {
		e.stopPropagation();
		history.go(-1);
	};
	const handelActiveSidebar = (val) => {
		setIsActiveSidebar(val);
	};
	return (
		<Router>
			<section className="settings" onClick={close}>
				<div className="settings__body" onClick={e => e.stopPropagation()}>
					<div className={`settings__sidebar ${isActiveSidebar ? "active" : ""}`}>
						<header className="settings-sidebar__header">
							<h1 className="settings__title">{t("settings")}</h1>
							<span className="fas fa-times close" onClick={handelActiveSidebar.bind(null, false)}></span>
						</header>
						<ul className="settings-sidebar__menu">
							<li>
								<NavLink 
									className="settings-sidebar__item" 
									activeClassName="settings-sidebar__item_active" 
									to="/settings/account"
									onClick={handelActiveSidebar.bind(null, false)}>
									<i className="far fa-user-circle settings-sidebar__logo"></i>
									<span className="">{t("account")}</span>
								</NavLink>
							</li>
							<li>
								<NavLink 
									className="settings-sidebar__item" 
									activeClassName="settings-sidebar__item_active" 
									to="/settings/genneral"
									onClick={handelActiveSidebar.bind(null, false)}>
									<i className="fas fa-cog settings-sidebar__logo"></i>
									<span className="">{t("general")}</span>	
								</NavLink>
							</li>
						</ul>
					</div>
					<div className="settings__content">
						<Switch>
							<PrivateRoute 
								exact path="/settings/account" 
								component={() =>
									<Account close={close} handelActiveSidebar={handelActiveSidebar} />
								}/>
							<PrivateRoute 
								exact path="/settings/genneral" 
								component={() =>
									<General close={close} handelActiveSidebar={handelActiveSidebar} />
								}/>
							<PrivateRoute 
								exact path="/settings/account/email" 
								component={() =>
									<ChangeEmail close={close} back={back} handelActiveSidebar={handelActiveSidebar} />
								}/>
							<PrivateRoute 
								exact path="/settings/account/password" 
								component={() =>
									<ChangePassword close={close} back={back} handelActiveSidebar={handelActiveSidebar} />
								}/>
							<PrivateRoute 
								exact path="/settings/account/delete" 
								component={() =>
									<DeleteAccount close={close} back={back} handelActiveSidebar={handelActiveSidebar} />
								}/>	
						</Switch>
					</div>
				</div>
			</section>
		</Router>
	);
}
 
export default Settings;