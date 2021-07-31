import { useTranslation } from "react-i18next";
import firebase from "../../firebase";
import { useState } from "react";

const useFetchSettings = () => {
	const {i18n} = useTranslation();
	const [error, setError] = useState('');
	function fetchSettings(user){
		try{
			const settingsRef = firebase.database().ref(`users/${user.uid}/settings`);
			let listener = settingsRef.on('value', async (snapshot) => {
				const settingsVal = await snapshot.val();	
				if(settingsVal){
					i18n.changeLanguage(settingsVal.language);
					localStorage.setItem('settings', JSON.stringify(settingsVal));
				}
			})
			return () => settingsRef.off('value', listener);
		} catch(e){
			setError(e.message);
		}
	}
	return {fetchSettings,error}
}
 
export default useFetchSettings;