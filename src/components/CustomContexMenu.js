import { ContextMenu, MenuItem } from "react-contextmenu";
import ReactTooltip from "react-tooltip";
import useGetPriority from "../customHooks/useGetPriority";
import useGetDay from "../customHooks/useGetDay";
import useCompletedTask from "../customHooks/API/useCompletedTask";
import firebase from "../firebase";
import { useAuth } from '../contexts/AuthContext';

const CustomContexMenu = ({taskId}) => {
	const {isSelecPriority} = useGetPriority();
	const {isSelectDay} = useGetDay();
	const {completedTask} = useCompletedTask();
	const {currentUser} = useAuth();
	function changeDay(date){
		const taskRef = firebase.database().ref(`users/${currentUser.uid}/tasks`).child(taskId);
		taskRef.update({
			date
		});
	}
	function changePriority(priority){
		const taskRef = firebase.database().ref(`users/${currentUser.uid}/tasks`).child(taskId);
		taskRef.update({
			priority
		});
	}
	return (
		<ContextMenu className="context-menu" id="contextmenu">
			<MenuItem >
				<span className="far fa-edit context-menu__edit">Edit task</span>
			</MenuItem>
			<MenuItem >
				<div className="context-menu__schedul">
					<h3 className="context-menu-schedul__title context-menu__title">Schedule</h3>
					<div className="context-menu-schedul__list context-menu__list">
						{isSelectDay.map(selectDay =>{
							return (
								<span 
									data-tip={selectDay.day}
									className={`fas ${selectDay.classValue} context-menu-list__item`}
									onClick={changeDay.bind(null,selectDay.date)}
									key={selectDay.id}>
								</span>)
						})}
					</div>
				</div>
			</MenuItem>
			<MenuItem>
				<div className="context-menu__priority">
					<h3 className="context-menu-priority__title context-menu__title">Priority</h3>
					<div className="context-menu-priority__list context-menu__list">
							{isSelecPriority.map(selecPriority =>{
								return (
									<span 
										key={selecPriority.id}
										data-tip={`Priority ${selecPriority.priority}`}
										className={`fas fa-flag ${selecPriority.classValue} context-menu-list__item`}
										onClick={changePriority.bind(null,selecPriority.priority)}
									></span>
								)
							})}
					</div>
				</div>
			</MenuItem>
			<MenuItem>
				<span 
					className="fas fa-trash-alt context-menu__delte"
					onClick={completedTask.bind(null,taskId)}
					>Delete</span>
			</MenuItem>
			<ReactTooltip 
				effect="solid" 		
				className="tooltip"
				place="bottom"
				arrowColor="transparent" />
      </ContextMenu>
	);
}
 
export default CustomContexMenu;