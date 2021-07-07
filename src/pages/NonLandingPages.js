import React from "react";
import {Switch} from 'react-router-dom';
import { useLocation } from "react-router";
import ReactTooltip from "react-tooltip";
import Sidebar from "../components/app/Sidebar";
import Header from "../components/app/Header";
import PrivateRoute from "../components/PrivateRoute";
import useWindowSize from '../customHooks/useWindowSize';
import useFetchTasks from "../customHooks/API/useFetchTasks"
import Loader from "../components/app/Loader";
import Home from "../pages/Home";
import Inbox from "../pages/Inbox"

//const Home = React.lazy(() => import("../pages/Home"));
//const Inbox = React.lazy(() => import("../pages/Inbox"));
const Settings = React.lazy(() => import("../pages/Settings"));
const NotFound = React.lazy(() => import("../pages/NotFound"));

const NonLandingPages  = () => {
	const size = useWindowSize();
	const {loader, error, taskListAll} = useFetchTasks();
	let location = useLocation();
	let background = location.state && location.state.background;
	return (
		<div className="wrapper">
			{loader && <Loader/>}
			{ error && <div className="denger">{ error }</div> }
			{size.width <= 768 ? <Header/> : <Sidebar/>}
			{taskListAll && <Switch location={background || location}>
				<PrivateRoute 
				exact path="/" 
				component={Home}/>
				<PrivateRoute 
				path="/inbox" 
				component={Inbox}/>
				<PrivateRoute 
				path="*" 
				component={() => 
				<React.Suspense fallback={ <Loader/>}>
					<NotFound/> {/* NotFound 404 */}
				</React.Suspense> 
				}/>
			</Switch>}
			{background && <PrivateRoute 
				path= "/settings"
				component={() => 
					<React.Suspense fallback={ <Loader/>}>
						<Settings/> {/* Settings */}
					</React.Suspense> 
				}/>}
			<ReactTooltip 
				effect="solid"		
				className="tooltip"
				arrowColor="transparent" />
		</div>
	);
}
 
export default NonLandingPages ;