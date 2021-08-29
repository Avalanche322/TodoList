import { useState} from "react";
import { useSwipeable } from "react-swipeable";
import {Route, Switch} from 'react-router-dom';
import {ThemeProvider} from "styled-components";
import { useLocation } from "react-router";
import Sidebar from "../components/app/Sidebar";
import Header from "../components/app/Header";
import useWindowSize from '../customHooks/useWindowSize';
import Context from "../contexts/context"
import Home from "../pages/Home";
import Inbox from "../pages/Inbox";
import { GlobalStyles } from "../theme/GlobalStles";
import useTheme from "../customHooks/useTheme";
import Settings from "../pages/Settings";
import NotFound from "../pages/NotFound";
import TaskDetails from "./TaskDetails";
import ModalBox from "../components/app/ModalBox";
import { useAuth } from "../contexts/AuthContext";

const NonLandingPages  = () => {
	const {setIsNewUserDialog,isNewUserDialog} = useAuth();
	const settings = JSON.parse(localStorage.getItem('settings'));
	const comments = JSON.parse(localStorage.getItem('comments'));
	const [tasks,setTasks] = useState(JSON.parse(localStorage.getItem('tasks')) );
	const [addForm, setAddForm] = useState(false); // add task toggle open
	const [taskEdit, setTaskEdit] = useState({id:null}); // task edit toggle open
	const {windowSize} = useWindowSize();
	const {theme,setTheme} = useTheme();
	const [isActiveHeader, setIsActiveHeader] = useState(false); // sidebar header
	let location = useLocation(); // location for settings and task details
	let background = location.state && location.state.background;
	const [, setRerenderComponnent] = useState({}); // rerender component
	const handlers = useSwipeable({
		onSwipedRight: () => {
			setIsActiveHeader(true);
			if(settings.vibration) navigator.vibrate(8);
		},
		onSwipedLeft: () => {
			setIsActiveHeader(false);
			if(settings.vibration) navigator.vibrate(8);
		},
	});
	return (
		<ThemeProvider theme={theme}>
			<GlobalStyles/>
			<Context.Provider value={{addForm,setAddForm,taskEdit,setTaskEdit,theme,setTheme,settings,comments,tasks,setTasks,setRerenderComponnent}}>		
				<div className='wrapper'>
					{isNewUserDialog && <ModalBox setIsNewUserDialog={setIsNewUserDialog} isNewUserDialog={isNewUserDialog} />}
					{windowSize.width <= 768 ? <Header isActive={isActiveHeader} setIsActive={setIsActiveHeader}/> : <Sidebar/>}
					<main className="main" {...handlers}>
						<Switch location={background || location}>
							<Route exact path="/" component={Home} />
							<Route exact path="/inbox" component={Inbox} />
							<Route path="*" component={NotFound}/>
						</Switch>
					</main>
					{background && <Route path= "/settings/account" component={Settings}/>}
					{background && <Route path={`/task/:id`} component={TaskDetails}/>}
				</div> 	
			</Context.Provider>
		</ThemeProvider>
	);
}
 
export default NonLandingPages ;