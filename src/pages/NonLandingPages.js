import React, {useState} from "react";
import { useSwipeable } from "react-swipeable";
import {Route, Switch} from 'react-router-dom';
import {ThemeProvider} from "styled-components";
import { useLocation } from "react-router";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import ReactTooltip from "react-tooltip";
import Sidebar from "../components/app/Sidebar";
import Header from "../components/app/Header";
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
import TaskDetails from "./TaskDetails";
import ModalBox from "../components/app/ModalBox";
import { useAuth } from "../contexts/AuthContext";

const NonLandingPages  = () => {
	const settings = JSON.parse(localStorage.getItem('settings'));
	const comments = JSON.parse(localStorage.getItem('comments'));
	const [addForm, setAddForm] = useState(false); // add task toggle open
	const [taskEdit, setTaskEdit] = useState({id:null}); // task edit toggle open
	const {windowSize} = useWindowSize();
	const {error, loader,taskListAll} = useFetchTasks();
	const {theme,setTheme} = useTheme();
	const {setIsNewUserDialog,isNewUserDialog} = useAuth();
	const [isActiveHeader, setIsActiveHeader] = useState(false); // sidebar header
	let location = useLocation(); // location for settings and task details
	let background = location.state && location.state.background;
	const handlers = useSwipeable({ // swipe open and close sidebar (mobile)
		onSwipedRight: () => setIsActiveHeader(true),
		onSwipedLeft: () => setIsActiveHeader(false),
	});
	return (
		<TransitionGroup component={null}>
			<ThemeProvider theme={theme}>
			<GlobalStyles/>
			<Context.Provider value={{addForm,setAddForm,taskEdit,setTaskEdit,theme,setTheme,settings,comments}}>
				
				{!error ? <div className="wrapper" {...handlers}>
					<CSSTransition 
						in={loader} 
						timeout={400}
						classNames="opacity"
						unmountOnExit>
						<Loader/>
					</CSSTransition>
					{/*{isNewUserDialog && !loader && 
						<ModalBox setIsNewUserDialog={setIsNewUserDialog} isNewUserDialog={isNewUserDialog} />
					}*/}
					<CSSTransition
						in={isNewUserDialog && !loader}
						timeout={400}
						classNames="scale"
						unmountOnExit
						>
						<ModalBox setIsNewUserDialog={setIsNewUserDialog} isNewUserDialog={isNewUserDialog} />
					</CSSTransition>
					{windowSize.width <= 768 ? <Header isActive={isActiveHeader} setIsActive={setIsActiveHeader}/> : <Sidebar/>}
					{taskListAll && <Switch location={background || location}>
						<Route exact path="/" component={Home} />
						<Route exact path="/inbox" component={Inbox} />
						<Route path="*" component={NotFound}/>
					</Switch>}
					{!loader && background && <Route path= "/settings/account" component={Settings}/>}
					{!loader && background && <Route path={`/task/:id`} component={TaskDetails}/>}
					<ReactTooltip 
						effect="solid"		
						className="tooltip"
					arrowColor="transparent" />
				</div> 
				: <div className="denger fas fa-exclamation-circle full-error">{ error }</div>}
				
			</Context.Provider>
		</ThemeProvider>
		</TransitionGroup>
	);
}
 
export default NonLandingPages ;