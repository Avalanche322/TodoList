import React, {useState} from "react";
import {Switch} from 'react-router-dom';
import {ThemeProvider} from "styled-components";
import { useLocation } from "react-router";
import ReactTooltip from "react-tooltip";
import Sidebar from "../components/app/Sidebar";
import Header from "../components/app/Header";
import PrivateRoute from "../components/PrivateRoute";
import useWindowSize from '../customHooks/useWindowSize';
import useFetchTasks from "../customHooks/API/useFetchTasks";
import Context from "../contexts/context"
import Loader from "../components/app/Loader";
import Home from "../pages/Home";
import Inbox from "../pages/Inbox";
import { GlobalStyles } from "../theme/GlobalStles";
import useTheme from "../customHooks/useTheme";
import Settings from "../pages/Settings";
import NotFound from "../pages/NotFound";

const NonLandingPages  = () => {
	const [addForm, setAddForm] = useState(false); // add task toggle open
	const [taskEdit, setTaskEdit] = useState({id:null}); // task edit toggle open
	const size = useWindowSize();
	const {loader, error, taskListAll} = useFetchTasks();
	const {theme,setTheme} = useTheme();
	let location = useLocation();
	let background = location.state && location.state.background;
	return (
		<ThemeProvider theme={theme}>
			<GlobalStyles/>
			<Context.Provider value={{addForm, setAddForm,taskEdit, setTaskEdit,theme,setTheme}}>
				<div className="wrapper">
					{loader &&  <Loader/>}
					{ error && <div className="denger">{ error }</div> }
					{size.width <= 768 ? <Header/> : <Sidebar/>}
					{taskListAll && <Switch location={background || location}>
						<PrivateRoute 
						exact path="/" 
						component={Home}/>
						<PrivateRoute 
						exact path="/inbox" 
						component={Inbox}/>
						<PrivateRoute 
						path="*" 
						component={NotFound}/>
					</Switch>}
					{!loader && background && <PrivateRoute 
						path= "/settings"
						component={Settings}/>}
					<ReactTooltip 
						effect="solid"		
						className="tooltip"
					arrowColor="transparent" />
				</div>
			</Context.Provider>
		</ThemeProvider>
	);
}
 
export default NonLandingPages ;