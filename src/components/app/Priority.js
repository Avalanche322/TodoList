import { useEffect, useRef } from "react";

const Priority = ({isSelecPriority,isPriorityClass,handlerSelectValuePriority,setIsSelectPriorityOpen,isSelectPriorityOpen}) => {
	let selectPriorityRef = useRef();
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
		<div ref={selectPriorityRef}  className="main-add-task-form-priority">
			<button 
				type="button"
				className={`main-add-task-form-priority__btn fas fa-flag ${isPriorityClass}`}
				onClick={() => setIsSelectPriorityOpen(!isSelectPriorityOpen)}>
			</button>
			<ul className={`main-add-task-form-priority__list ${isSelectPriorityOpen ? "open" : "hidden"}`}>
				{isSelecPriority.map(selecPriority =>{
					return (
					<li
						onClick={handlerSelectValuePriority.bind(null,selecPriority.classValue, selecPriority.priority)}			
						key={selecPriority.id}
						className={`main-add-task-form-priority__item 
							${selecPriority.classValue === isPriorityClass ? 'focus' : ''}`}>
						<span 
							className={`main-add-task-form-priority__priority fas fa-flag ${selecPriority.classValue}`}>
						Priority {selecPriority.priority}</span>
						{selecPriority.classValue === isPriorityClass ? 
							<span className="main-add-task-form-priority__check check fas fa-check"></span> 
							: null
						}
					</li>)
				})}		
		</ul>
		</div>
	);
}
 
export default Priority;