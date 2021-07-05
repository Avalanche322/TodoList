import Sidebar from "../components/app/Sidebar";
import Header from "../components/app/Header";
import PrivateRoute from "../components/PrivateRoute";
import useWindowSize from '../customHooks/useWindowSize';
import React from "react";
import Loader from "../components/app/Loader";
import {Switch} from 'react-router-dom'

const Home = React.lazy(() => import("../pages/Home"));
const Inbox = React.lazy(() => import("../pages/Inbox"));
const Settings = React.lazy(() => import("../pages/Settings"));

const NonLandingPages  = () => {
	const size = useWindowSize();
	return (
		<div className="wrapper">
			{size.width <= 768 ? <Header/> : <Sidebar/>}
			<Switch>
				<PrivateRoute 
				exact path="/" 
				component={() => 
				<React.Suspense fallback={ <Loader/>}>
					<Home/> {/* Home */}
				</React.Suspense> 
				}/>
				<PrivateRoute 
				exact path="/inbox" 
				component={() => 
				<React.Suspense fallback={ <Loader/>}>
					<Inbox/> {/* Inbox */}
				</React.Suspense> 
				}/>
				<PrivateRoute 
				exact path="/settings" 
				component={() => 
				<React.Suspense fallback={ <Loader/>}>
					<Settings/> {/* Settings */}
				</React.Suspense> 
				}/>
			</Switch>
		</div>
	);
}
 
export default NonLandingPages ;