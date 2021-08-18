import { useState } from "react";
import firebase from "../../firebase";

const useFetchStats = () => {
	const [error, setError] = useState();
	function fetchStats(user){
		try{
			const statsRef = firebase.database().ref(`users/${user.uid}/stats`);
			let listener = statsRef.once('value', (snapshot) => {
				const statsVal = snapshot.val();
				if(statsVal){
					localStorage.setItem('stats', JSON.stringify(statsVal));
				}
			})
			return () => statsRef.off('value', listener);
		} catch(e){
			setError(e.message);
		}
	}
	return {fetchStats, error}
}
 
export default useFetchStats;