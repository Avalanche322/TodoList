import { useContext } from "react";
import { ContextMenu, MenuItem } from "react-contextmenu";
import ReactTooltip from "react-tooltip";
import Context from "../contexts/context";
import useGetPriority from "../customHooks/useGetPriority";
import useGetDay from "../customHooks/useGetDay";
import useDeleteTask from "../customHooks/API/useDeleteTask";
import firebase from "../firebase";
import { useAuth } from '../contexts/AuthContext';
import { useTranslation } from "react-i18next";

const CustomContexMenu = ({selectTask}) => {
	const {isSelecPriority} = useGetPriority();
	const {setTaskEdit,setAddForm } = useContext(Context);
	const {isSelectDay} = useGetDay();
	const {deleteTask} = useDeleteTask();
	const {currentUser} = useAuth();
	const { t } = useTranslation();
	function changeDay(date){
		const taskRef = firebase.database().ref(`users/${currentUser.uid}/tasks`).child(selectTask.id);
		taskRef.update({
			date
		});
	}
	function changePriority(priority){
		const taskRef = firebase.database().ref(`users/${currentUser.uid}/tasks`).child(selectTask.id);
		taskRef.update({
			priority
		});
	}
	const handelTaskEdit = () =>{
		setTaskEdit(selectTask);
		setAddForm(false);
	}
	return (
		<ContextMenu className="context-menu" id="contextmenu">
			<MenuItem >
				<span className="far fa-edit context-menu__edit" onClick={handelTaskEdit.bind(null)}>{t("editTask")}</span>
			</MenuItem>
			<MenuItem >
				<div className="context-menu__schedul">
					<h3 className="context-menu-schedul__title context-menu__title">{t("schedule")}</h3>
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
					<h3 className="context-menu-priority__title context-menu__title">{t("priority")}</h3>
					<div className="context-menu-priority__list context-menu__list">
							{isSelecPriority.map(selecPriority =>{
								return (
									<span 
										key={selecPriority.id}
										data-tip={`${t("priority")} ${selecPriority.priority}`}
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
					className="fas fa-trash-alt context-menu__delete"
					onClick={deleteTask.bind(null,selectTask)}
					>{t("delete")}</span>
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