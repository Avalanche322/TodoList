import { useState } from "react";
import firebase from "../../firebase";

const useFetchSort = () => {
	const [error, setError] = useState();
	function fetchSort(user){
		try{
			const sortRef = firebase.database().ref(`users/${user.uid}/sort`);
			let listener = sortRef.once('value', (snapshot) => {
				const sortVal = snapshot.val();
				if(sortVal){
					localStorage.setItem('sort', JSON.stringify(sortVal));
				}
			})
			return () => sortRef.off('value', listener);
		} catch(e){
			setError(e.message);
		}
	}
	return {fetchSort, error}
}
 
export default useFetchSort;