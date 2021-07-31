import { useEffect, useState, React, useRef } from "react";
import TextareaAutosize from "react-textarea-autosize";
import Comment from "../Comment";
import Priority from "../Priority";
import Day from "../Day";
import useGetPriority from "../../customHooks/useGetPriority";
import useGetDay from "../../customHooks/useGetDay";
import useGetDate from "../../customHooks/useGetDate";
import useAddTask from "../../customHooks/API/useAddTask";
import { useTranslation } from "react-i18next";

const QuickAddTask = ({isOpen, handlerIsOpen}) => {
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
	const {today} = useGetDate();
	const [body, setBody] = useState('');
	let quickAddTasRef = useRef();
	const [error, setError] = useState('');
	const { t } = useTranslation();
	
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
			handlerIsOpen(false);
			handlerDefault();
		} catch(e){
			setError(e.message);
			alert(error);
		}
	}
	useEffect(() =>{
		if(isOpen){
			let hendler = (event) =>{
				if(!quickAddTasRef.current.contains(event.target)){
					handlerIsOpen(false);
				}
			}
			document.addEventListener("mousedown", hendler)
			return () =>{
				document.removeEventListener("mousedown", hendler)
			}
		}
	})
	return (
		<div>
			{isOpen &&
				<div className="quick-add">
					<div ref={quickAddTasRef} className="quick-add__body">
						<div className="quick-add__header">
							<h3 className="quick-add__title">{t("quickAddTask")}</h3>
							<span className="fas fa-times quick-add__close close" onClick={() =>{
								handlerIsOpen(false);
								handlerDefault();
							}}>
							</span>
						</div>
						<form className="main-editor-task__form" onSubmit={handlerSubmit}>
							<div className="main-editor-task-form__edit">
								<TextareaAutosize 
									className="main-editor-task-form__text" 
									maxRows="6" 
									minRows="1" 
									autoFocus 
									placeholder={t("taskName")}
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
									disabled={!body.trim()}
									type="submit">
								{t("addTask")}</button>
							</div>
						</form>
					</div>
				</div>
			}
		</div>
	);
}
 
export default QuickAddTask;