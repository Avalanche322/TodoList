import { useState } from "react";
const useGetPriority = () => {
	const [isSelectPriorityOpen, setIsSelectPriorityOpen] = useState(false);
	const [isPriorityClass, setIsPriorityClass] = useState('');
	const [priority, setPriority] = useState(4);
	const [isSelecPriority] = useState ([
		{id:1, priority:1, classValue:"priority-1"},
		{id:2, priority:2, classValue:"priority-2"},
		{id:3, priority:3, classValue:"priority-3"},
		{id:4, priority:4, classValue:""}
	])
	function handlerPriorityOpen(val){
		setIsSelectPriorityOpen(val)
	}
	function handlerSelectValuePriority(classValue, priority){
		setIsPriorityClass(classValue);
		setPriority(priority);
		handlerPriorityOpen(false);
	}
	return {
		handlerSelectValuePriority,
		priority,
		isSelecPriority,
		isPriorityClass,
		handlerPriorityOpen,
		isSelectPriorityOpen,
	}
}
 
export default useGetPriority;