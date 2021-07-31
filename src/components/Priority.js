import { useEffect, useRef } from "react";
import ReactTooltip from "react-tooltip";
import { useTranslation } from "react-i18next";

const Priority = ({isSelecPriority,isPriorityClass,handlerSelectValuePriority,setIsSelectPriorityOpen,isSelectPriorityOpen}) => {
	let selectPriorityRef = useRef();
	const { t } = useTranslation();
	useEffect(() =>{		
		let hendler = (event) =>{
			if(!selectPriorityRef.current.contains(event.target)){
				setIsSelectPriorityOpen(false);
			}
		}
		document.addEventListener("mousedown", hendler)
		return () =>{
			document.removeEventListener("mousedown", hendler)
		};	
	});
	return (
		<div ref={selectPriorityRef}  className="main-editor-task-form-priority">
			<button 
				type="button"
				data-tip={t("setPriority")}
				className={`main-editor-task-form-priority__btn fas fa-flag ${isPriorityClass}`}
				onClick={() => setIsSelectPriorityOpen(!isSelectPriorityOpen)}>
			</button>
			<ul className={`main-editor-task-form-priority__list ${isSelectPriorityOpen ? "open" : "hidden"}`}>
				{isSelecPriority.map(selecPriority =>{
					return (
					<li
						onClick={handlerSelectValuePriority.bind(null,selecPriority.classValue, selecPriority.priority)}			
						key={selecPriority.id}
						className={`main-editor-task-form-priority__item 
							${selecPriority.classValue === isPriorityClass ? 'focus' : ''}`}>
						<span 
							className={`main-editor-task-form-priority__priority fas fa-flag ${selecPriority.classValue}`}>
						{t("priority")} {selecPriority.priority}</span>
						{selecPriority.classValue === isPriorityClass ? 
							<span className="main-editor-task-form-priority__check check fas fa-check"></span> 
							: null
						}
					</li>)
				})}		
		</ul>
		<ReactTooltip 
			effect="solid" 
			place="bottom" 
			className="tooltip"
			arrowColor="transparent" />
		</div>
	);
}
 
export default Priority;