import { useRef, useEffect } from "react";

const Day = ({handlerDayOpen,isDayClass,isSelectDayOpen,isDay,date,handlerSetDate,isSelectDay,handlerSelectValueDay}) => {
	let selectDayRef = useRef();
	useEffect(() =>{		
		let hendler = (event) =>{
			if(!selectDayRef.current.contains(event.target)){
				handlerDayOpen(false);				
			}
		}
		document.addEventListener("mousedown", hendler)
		return () =>{
			document.removeEventListener("mousedown", hendler)
		};	
	});
	return (
		<div ref={selectDayRef} className="main-add-task-form-day">
			<button 
				className={`main-add-task-form-day__btn ${isDayClass}`} 
				type="button"
				onClick={() => handlerDayOpen(!isSelectDayOpen)}>
			{isDay}
			</button>
			<ul className={`main-add-task-form-day__list ${isSelectDayOpen ? "open" : "hidden"}`}>
				<li>
					<input 
						value={date}
						className="main-add-task-form-day__input" 
						type="text"
						onChange={(e) => handlerSetDate(e.target.value)}/>
				</li> 
				{isSelectDay.map(selectDay =>{
					return (
						<li 
							style={selectDay.day === isDay ? {display:'none'} : {}}
							onClick={handlerSelectValueDay.bind(null,selectDay.day,selectDay.date,selectDay.classValue)}	
							key={selectDay.id}>
							<span className={`main-add-task-form-day__day ${selectDay.classValue}`}>{selectDay.day}</span> 
							<span className="main-add-task-form-day__date">{selectDay.date}</span>
						</li>)
				})}			
			</ul>
		</div>
	);
}
 
export default Day;