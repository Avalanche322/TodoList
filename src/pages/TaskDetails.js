import {BrowserRouter as Router,useParams } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import { useLocation,useHistory } from "react-router";
import { memo, useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import useCompletedTask from "../customHooks/API/useCompletedTask";
import Edit from "../components/app/Edit";
import { useAuth } from "../contexts/AuthContext";
import firebase from "../firebase";
import Day from "../components/Day";
import Priority from "../components/Priority";
import useGetDay from "../customHooks/useGetDay";
import useGetPriority from "../customHooks/useGetPriority";
import CommentDetails from "../components/app/CommentDetails";
import ActivyDetails from "../components/app/ActivyDetails";
import Context from "../contexts/context";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import useDeleteData from "../customHooks/API/useDeleteData";

const TaskDetailt = () => {
	const {settings,tasks} = useContext(Context);
	const [toogleEdit, setToogleEdit] = useState(true);
	const [taskEdit, setTaskEdit] = useState();
	const [date, setDate] = useState();
	const [priority, setPriority] = useState();
	const [isCommentsActive, setIsCommentsActive] = useState(true);
	const [isActivyActive, setIActivyActive] = useState(false);
	const history = useHistory();
	const {t} = useTranslation();
	let location = useLocation();
	const { id } = useParams();
	const {completedTask} = useCompletedTask();
	const {currentUser} = useAuth();
	const {deleteTask} = useDeleteData();
	/* Select day*/
	const {setIsSelectDayOpen,isSelectDayOpen,isSelectDay,isDayClass,isDay,handlerSelectValueDay,setIsDay,setIsDayClass,handlerInputDateSubmit} = useGetDay();
	/* Select priority*/
	const {isSelecPriority,handlerPriorityOpen,isSelectPriorityOpen,handlerSelectValuePriority} = useGetPriority();
	useEffect(() =>{
		for (const task of tasks) {
			if(task.id === id){
				setTaskEdit(task);
				setDate(task.date);
				setPriority(task.priority);
				//break
			}
		}
	// eslint-disable-next-line
	},[])
	useEffect(() => {
		// title for page
		taskEdit ? document.title = `${taskEdit.body} | TodoList` : document.title = 'TodoList'
	// eslint-disable-next-line
	}, [taskEdit])
	function changeDate(date){
		const taskRef = firebase.database().ref(`users/${currentUser.uid}/tasks`).child(taskEdit.id);
		taskRef.update({
			date
		});
	}
	function changePriority(priority){
		const taskRef = firebase.database().ref(`users/${currentUser.uid}/tasks`).child(taskEdit.id);
		taskRef.update({
			priority
		});
	}
	function close(e){
		e.stopPropagation();
		history.push(location.state.prevPath);
	};
	function handlerTaskEdit(){
		if(settings.vibration) navigator.vibrate(10); // togle vibration
		setTaskEdit(taskEdit);
		setToogleEdit(false);
	}
	function hundelCompletedTask(e,taks){
		completedTask(taks);
		close(e);
	}
	function cancelEdit(){
		setToogleEdit(true);
	}
	function handlerDelete(task){
		history.push(location.state.prevPath);
		deleteTask(task);
	}
	function handlerTogglePage(val1,val2){
		if(settings.vibration) navigator.vibrate(10); // togle vibration
		setIsCommentsActive(val1);
		setIActivyActive(val2);
	}
	return (
		<TransitionGroup component={null}>
		<Router>
			<section className="task-detail" onClick={close}>
				{taskEdit && <div className="task-detail__body" onClick={e => e.stopPropagation()}>
				<header className="task-detail__header">
					<h2 className="task-detail__title">{t("taskDetails")}</h2>
					<span className="fas fa-times close" onClick={close}></span>
				</header>
				{toogleEdit ? 
					<div className="task-detail__overview">
						<div className="task-detail__task">
							<input 
								className="task__inp-cbx" 
								id={`cbx${taskEdit.id}`} 
								type="checkbox" 
								style={{display: "none"}} 
							/>
							<label 
								className="task__cbx" htmlFor={`cbx${taskEdit.id}`} 
								onClick={(e) => hundelCompletedTask(e,taskEdit)}>
								<span className={`priority-cbx-${taskEdit.priority}`}>
									<svg width="8px" height="8px" viewBox="0 0 12 9">
									<polyline points="1 5 4 8 11 1"></polyline>
									</svg>
								</span>
							</label>
							<div className="task-detail__group">
								<p 
									className={`task-detail__text task__text ${taskEdit.completed ? "completed" : ""}`} 
									onClick={handlerTaskEdit.bind(null)}>
								{taskEdit.body}</p>
								<Day
									task={taskEdit}
									handlerInputDateSubmit={handlerInputDateSubmit}
									setIsSelectDayOpen={setIsSelectDayOpen} 
									isDayClass={isDayClass}
									isSelectDayOpen={isSelectDayOpen}
									isDay={isDay}
									date={date}
									handlerSetDate={changeDate}
									isSelectDay={isSelectDay}
									handlerSelectValueDay={handlerSelectValueDay}
									setIsDay={setIsDay}
									setIsDayClass={setIsDayClass}/>
							</div>
						</div>
						<div className="task-detail__actions">	
							<Priority 
								isSelecPriority={isSelecPriority} 
								isPriorityClass={priority === 4 ? '' : `priority-${priority}`}
								handlerSelectValuePriority={handlerSelectValuePriority}
								setIsSelectPriorityOpen={handlerPriorityOpen}
								isSelectPriorityOpen={isSelectPriorityOpen}
								handlerSetPriority={changePriority}/>
								<div>
									<button 
										type="button" 
										className="far fa-edit btn"
										data-tip={t("editTask")}
										onClick={handlerTaskEdit.bind(null)}></button>
								</div>
								<div>
									<button 
										type="button"
										data-tip={t("delete")}
										className="fas fa-trash-alt btn task-detail__delete"
										onClick={handlerDelete.bind(null,taskEdit)}></button>
								</div>
						</div>
					</div> 
				: <Edit cancel={cancelEdit} task={taskEdit}/>}
				<div className="task-detail__tabs">
					<div className="task-detail-tabs__menu">
						<button 
							className={`task-detail-tabs__btn ${isCommentsActive ? 'active' : ''}`} 
							onClick={handlerTogglePage.bind(null,true,false)}
						>{t("comments")}</button>
						<button 
							className={`task-detail-tabs__btn ${isActivyActive ? 'active' : ''}`} 
							onClick={handlerTogglePage.bind(null,false,true)}
						>{t("activity")}</button>
					</div>
					<CSSTransition key=".1" in={isCommentsActive} timeout={{enter:400,exit:0}} classNames="move-back" unmountOnExit>
						<CommentDetails taskId={id}/>
					</CSSTransition>
					<CSSTransition key=".2" in={isActivyActive} timeout={{enter:400,exit:0}} classNames="move-back" unmountOnExit>
						<ActivyDetails task={taskEdit}/>
					</CSSTransition>
				</div>
			</div>}
			</section>
			<ReactTooltip 
				effect="solid" 
				place="bottom" 
				className="tooltip"
				arrowColor="transparent" />
		</Router>
		</TransitionGroup>
	);
}
 
export default memo(TaskDetailt);