import { memo, useEffect, useRef, useContext } from "react";
import ReactTooltip from "react-tooltip";
import { useTranslation } from "react-i18next";
import Context from "../contexts/context";

const Priority = ({isSelecPriority,isPriorityClass,handlerSelectValuePriority,setIsSelectPriorityOpen,isSelectPriorityOpen,handlerSetPriority}) => {
	const {settings} = useContext(Context);
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
	function handlerIsActive(){
		setIsSelectPriorityOpen(!isSelectPriorityOpen);
		if(settings.vibration) navigator.vibrate(10); // togle vibration
	}
	return (
		<div ref={selectPriorityRef} className="priority">
			<button 
				type="button"
				data-tip={t("setPriority")}
				className={`priority__btn  drop-down__btn fas fa-flag ${isPriorityClass}`}
				onClick={handlerIsActive.bind(null)}>
			</button>
			<ul className={`priority__list drop-down__list ${isSelectPriorityOpen ? "open" : "hidden"}`}>
				{isSelecPriority.map(selecPriority =>{
					return (
					<li tabIndex="1"
						onClick={handlerSelectValuePriority.bind(null,selecPriority.classValue, selecPriority.priority,handlerSetPriority)}
						// pass handlerSetPriority for update local state edit			
						key={selecPriority.id}
						className={`priority__item 
							${selecPriority.classValue === isPriorityClass ? 'focus' : ''}`}>
						<span 
							className={`priority__priority fas fa-flag ${selecPriority.classValue}`}>
						{t("priority")} {selecPriority.priority}</span>
						{selecPriority.classValue === isPriorityClass ? 
							<span className="check fas fa-check"></span> 
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
 
export default memo(Priority);