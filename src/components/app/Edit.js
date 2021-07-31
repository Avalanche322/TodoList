import { useState, useContext } from "react";
import TextareaAutosize from "react-textarea-autosize";
import Comment from "../Comment";
import Context from "../../contexts/context";
import Priority from "../Priority";
import Day from "../Day";
import useGetPriority from "../../customHooks/useGetPriority";
import useGetDay from "../../customHooks/useGetDay";
import useGetDate from "../../customHooks/useGetDate";
import useEditTask from "../../customHooks/API/useEditTask";
import { useTranslation } from "react-i18next";

const Edit = () => {
	const { taskEdit: task,setTaskEdit } = useContext(Context);
	const [body,setBody] = useState(task.body);
	const [comment,setComment] = useState(task.comment);
	const [date, setDate] = useState(task.date);
	const [priority, setPriority] = useState(task.priority);
	const [error, setError] = useState('');
	const {today,tommorow,nextWeek,nextWeekend} = useGetDate();
	const { t } = useTranslation();

	/*hook edit task*/
	const{editTask} = useEditTask();

	function handlerSubmit(e){
		e.preventDefault();
		try{
			editTask(body,date,priority,comment,task);
			setTaskEdit({id:null});
		} catch(e){
			setError(e.message);
			alert(error);
		}
	}
	/* Select day*/
	const {handlerDayOpen,isSelectDayOpen,isSelectDay,setIsDay,setIsDayClass,setIsSelectDayOpen} = useGetDay();
	const isDayClass = date === today() ? "fas fa-calendar-week" : date === tommorow() ? "fas fa-sun" : date === nextWeek() ? "fas fa-fast-forward" : date === nextWeekend() ? "fas fa-couch" : date === "" ? "far fa-calendar-times" : "fas fa-calendar-week";
	const isDay = date === today() ? "Today" : date === tommorow() ? "Tommorow" : date === nextWeek() ? "Next Week" : date === nextWeekend() ? "Next Weekend" : date === "" ? "No date"  : date;

	function handlerSelectValueDay(day,date,classValue){
		setIsDay(day);
		setIsDayClass(classValue);
		setDate(date);
		setIsSelectDayOpen(false);
	}
	const {isSelecPriority,handlerPriorityOpen,isSelectPriorityOpen,setIsPriorityClass} = useGetPriority();
	function handlerSelectValuePriority(classValue, priority){
		setIsPriorityClass(classValue);
		setPriority(priority);
		handlerPriorityOpen(false);
	}
	/* Select comment*/
	function handlerSetComment(text) {
		setComment(text);
	}
	return (
		<li>
			<form className="main-editor-task__form" onSubmit={handlerSubmit}>
				<div className="main-editor-task-form__edit">
					<TextareaAutosize 
						className="main-editor-task-form__text" 
						maxRows="6" 
						minRows="1" 
						autoFocus 
						placeholder="Task name"
						value={body}
						onChange={(e) => setBody(e.target.value)}>
					</TextareaAutosize>
					<div className="main-editor-task-form__bottom">
						<Day
							handlerDayOpen={handlerDayOpen} 
							isDayClass={isDayClass}
							isSelectDayOpen={isSelectDayOpen}
							isDay={isDay}
							date={date}
							handlerSetDate={setDate}
							isSelectDay={isSelectDay}
							handlerSelectValueDay={handlerSelectValueDay}/>
						<div className="main-editor-task-form__group">
							<Priority 
								isSelecPriority={isSelecPriority} 
								isPriorityClass={priority === 4 ? '' : `priority-${priority}`}
								handlerSelectValuePriority={handlerSelectValuePriority}
								setIsSelectPriorityOpen={handlerPriorityOpen}
								isSelectPriorityOpen={isSelectPriorityOpen}/>
							<Comment comment={comment} setComment={handlerSetComment}/>
						</div>
					</div>
				</div>
				<div className="main-editor-task-form__action">
				<button 
					className="main-editor-task-form__btn-submit btn-submit" 
					type="submit"
					disabled={!body.trim()}>
				{t("save")}</button>
				<button 
					className="main-editor-task-form__btn-cancel btn-cancel"
					type="button"
					onClick={() => setTaskEdit({id:null})}>
				{t("cancel")}</button>
			</div>
			</form>
		</li>
	);
}
 
export default Edit;