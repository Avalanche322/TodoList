import { useState,useContext } from "react";
import Context from "../../contexts/context";
import TextareaAutosize from "react-textarea-autosize";
import Comment from "../Comment";
import Priority from "../Priority";
import Day from "../Day";
import useGetPriority from "../../customHooks/useGetPriority";
import useGetDay from "../../customHooks/useGetDay";
import useGetDate from "../../customHooks/useGetDate";
import useAddTask from "../../customHooks/API/useAddTask";
import { useTranslation } from "react-i18next";

const AddTask = () => {
	/*hook add task*/
	const {addTask} = useAddTask();
	/* Select day*/
	const {handlerDayOpen,handlerSelectValueDay,date,isDayClass,isSelectDayOpen,handlerSetDate,isDay,isSelectDay,} = useGetDay();	
	/* Select priority*/
	const {handlerSelectValuePriority,priority,isSelecPriority,isPriorityClass,handlerPriorityOpen,isSelectPriorityOpen,} = useGetPriority();
	/* Select comment*/
	const [comment, setComment] = useState('');
	function handlerSetComment(text) {
		setComment(text);
	}
	/*Common*/
	const { addForm, setAddForm,setTaskEdit } = useContext(Context);
	const {today} = useGetDate();
	const [body, setBody] = useState('');
	const [error, setError] = useState('');
	const { t } = useTranslation();

	function handelTextArea(e){
		if(e.nativeEvent.inputType === "insertLineBreak"){
			handlerSubmit(e);
			return
		};
		setBody(e.target.value);
	}

	function handlerDefault() {
		setBody('');
		handlerSelectValueDay('Today',today(),'fas fa-calendar-week');
		handlerSelectValuePriority('', 4);
		setComment('');
	}
	function handlerSubmit(e){
		e.preventDefault();
		try{
			addTask(body,date,priority,comment);
			handlerDefault();
		} catch(e){
			setError(e.message);
			alert(error);
		}
	}
	function handelCancel() {
		setAddForm(false);
		handlerDefault();
	}
	function handelAddTask() {
		setAddForm(true);
		setTaskEdit({id:null});
	}
	return (
		<div className="main__editor-task">
			{addForm && 
				<form className="main-editor-task__form" onSubmit={handlerSubmit}>
					<div className="main-editor-task-form__edit">
						<TextareaAutosize 
							className="main-editor-task-form__text" 
							maxRows="6" 
							minRows="1" 
							autoFocus 
							placeholder="Task name"
							value={body}
							onChange={(e) => handelTextArea(e)}>
						</TextareaAutosize>
						<div className="main-editor-task-form__bottom">
							<Day
								handlerDayOpen={handlerDayOpen} 
								isDayClass={isDayClass} 
								isSelectDayOpen={isSelectDayOpen}
								isDay={isDay}
								date={date}
								handlerSetDate={handlerSetDate}
								isSelectDay={isSelectDay}
								handlerSelectValueDay={handlerSelectValueDay}/>
							<div className="main-editor-task-form__group">
								<Priority 
									isSelecPriority={isSelecPriority} 
									isPriorityClass={isPriorityClass} 
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
						{t("addTask")}</button>
						<button 
							className="main-editor-task-form__btn-cancel btn-cancel"
							type="button"
							onClick={handelCancel.bind(null)}>
						{t("cancel")}</button>
					</div>
				</form>
			}
			{!addForm && 
				<button className="main-editor-task__btn" onClick={handelAddTask.bind(null)}>
					<i className="fas fa-plus"></i>
					<span>{t("addTask")}</span>
				</button>
			}
		</div>
	);
}
 
export default AddTask;