import React, { useContext, useEffect, useState } from 'react';
import firebase from '../firebase';
import profileImg from '../img/user2.png';
import useGetDate from '../customHooks/useGetDate';
import { useTranslation } from 'react-i18next';
import themes from "../theme/schema.json";
import useFetchSettings from '../customHooks/API/useFetchSettings';
import useFetchStats from '../customHooks/API/useFetchStats';

const AuthContext = React.createContext()

export function useAuth(){
	return useContext(AuthContext)
}

export function AuthProvider ({children}){
	const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('User')));	
	const {today} = useGetDate();
	const {i18n} = useTranslation();
	const {fetchSettings} = useFetchSettings();
	const {fetchStats} = useFetchStats()
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState();
	const [googleAccount, setGoogleAccount] = useState();
	async function defaultValue(u){
		const task = {
			body: "Hello my dear friend. Your first task today is to complete !!!",
			completed: false,
			date: today(),
			priority: 3,
			comment: "This is comment. Try and u add comment"
		};
		const settings ={
			language: "en",
			theme: "blueDark"
		};
		const taskRef = firebase.database().ref(`users/${u.user.uid}/tasks`);
		const statsDaysItemsRef = firebase.database().ref(`users/${u.user.uid}/stats/days_items`);
		const statsRef = firebase.database().ref(`users/${u.user.uid}/stats`);
		const settingsRef = firebase.database().ref(`users/${u.user.uid}/settings`);
		await taskRef.push(task);
		await settingsRef.update(settings);
		await statsDaysItemsRef.update({
			date: today(),
			total_completed: 0
		})
		await statsRef.update({
			completed_count: 0
		})
	}
	
	function isProviderGoogle(){
		for (const i of currentUser.providerData) {
			if(i.providerId === "google.com"){
				setGoogleAccount(i);
				return true
			}
		}
		return false
	}
	function isProviderPasswordUser(){
		for (const i of currentUser.providerData) {
			if(i.providerId === "password"){
				return true
			}
		}
		return false
	}
	async function reauthenticate(currentPassword){
		let cred =  firebase.auth.EmailAuthProvider.credential(currentUser.email, currentPassword);
		return currentUser.reauthenticateWithCredential(cred)
	}
	async function unlinkGoogle(){
		setError("");
		try{
			for (const i of currentUser.providerData) {
				if(i.providerId === "google.com"){
					await currentUser.unlink(i.providerId);
					setGoogleAccount(null);
				}
			}
		} catch(e){
			setError(e.message);
		}
	}
	async function LinkInGoogle(){
		setError("");
		try{
			let provider = new firebase.auth.GoogleAuthProvider();
			await firebase.auth().currentUser.linkWithPopup(provider);
		} catch(e){
			setError(e.message);
		}
	}
	async function singup(email,password,name){
		setError("");
		const u = await firebase.auth().createUserWithEmailAndPassword(email, password);
		await u.user.updateProfile({
			displayName: name,
			photoURL: profileImg
		})
		defaultValue(u);
	}
	async function singInWithGoogle(){
		setError("");
		const u = await firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider());
		if (u.additionalUserInfo.isNewUser) {
			defaultValue(u);
		}
	}
	const singin = async (email,password) => await firebase.auth().signInWithEmailAndPassword(email, password);
	const logout = async () => await firebase.auth().signOut();
	const resetPassword = async email => await firebase.auth().sendPasswordResetEmail(email);
	async function changeName(name){
		setError("");
		const user = JSON.parse(localStorage.getItem('User'));
		user.displayName = name;
		localStorage.setItem('User', JSON.stringify(user));
		await currentUser.updateProfile({displayName: name});		
	};
	async function changePassword(currentPassword, newPassword){
		setError("");
		if(!isProviderPasswordUser()){
			try{
				currentUser.linkWithCredential(firebase.auth.EmailAuthProvider.credential(currentUser.email, newPassword)).then((u)=>{
					setCurrentUser(u.user);
					localStorage.setItem('User', JSON.stringify(u.user))
				});
			} catch(e){
				setError(e.message);
			}
		}	
		else{
			try{
				await reauthenticate(currentPassword);
				await currentUser.updatePassword(newPassword);
			} catch(e){
				setError(e.message);
			}
		}
	}
	async function deleteAccount(currentPassword){
		setError("");
		try{
			reauthenticate(currentPassword);
			removeAvatar();
			await currentUser.delete();
			await firebase.database().ref(`users/${currentUser.uid}`).remove();
		} catch(e){
			setError(e.message);
		}
	}
	async function changeEmail(currentPassword, newEmail){
		try{
			setError("");
			reauthenticate(currentPassword);
			await currentUser.updateEmail(newEmail);
		} catch(e){
			setError(e.message)
		}
	}
	async function updateLanguage(lng){
		setError("");
		const settingsRef = firebase.database().ref(`users/${currentUser.uid}/settings`);
		await settingsRef.update({
			language: lng
		})
		i18n.changeLanguage(lng);
	}
	async function updateTheme(themeName){
		setError("");
		const settingsRef = firebase.database().ref(`users/${currentUser.uid}/settings`);
		await settingsRef.update({
			theme: themeName
		})
	}
	async function uploadAvatar(img){
		setError("");
		if(img.size <= 4194304){
			const storageRef = firebase.storage().ref();
			const fileRef = storageRef.child(currentUser.uid);
			await fileRef.put(img);
			const user = JSON.parse(localStorage.getItem('User'));
			user.photoURL = await fileRef.getDownloadURL();
			localStorage.setItem('User', JSON.stringify(user));
			await currentUser.updateProfile({
				photoURL: await fileRef.getDownloadURL()
			})
		} else{
			setError("image must be lower 4 MB");
		}
	}
	async function removeAvatar(){
		setError("");
		try{
			const ref = firebase.storage().ref(currentUser.uid)
			try {
				await ref.getDownloadURL()
				let desertRef = firebase.storage().refFromURL(currentUser.photoURL);
				await desertRef.delete();
			} catch(e){}
			finally{
				const user = JSON.parse(localStorage.getItem('User'));
				user.photoURL = profileImg;
				localStorage.setItem('User', JSON.stringify(user));
				await currentUser.updateProfile({
					photoURL: profileImg
				})
			}
		} catch(e){
			setError(e.message);
		}
	}
	useEffect(() =>{ // check if stats no today, clear stats
		async function fetchData() {
			setError("");
			const stats = JSON.parse(localStorage.getItem('stats'));
			if(stats){
				if(stats.days_items.date !== today()){
					stats.days_items.total_completed = 0;
					localStorage.setItem('stats', JSON.stringify(stats));
					const statsRef = firebase.database().ref(`users/${currentUser.uid}/stats/days_items`);
					await statsRef.update({
						total_completed: 0
					})
				}
			}
		}
		fetchData();
	// eslint-disable-next-line
	},[])
	useEffect(() => {
		const unsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
			if(user){
				setCurrentUser(user)
				localStorage.setItem('User', JSON.stringify(user)); // set local user
				const sidebar_on = JSON.parse(localStorage.getItem('sidebar_on'));// set local sidebar_on
				localStorage.setItem('sidebar_on', JSON.stringify(sidebar_on ?? true));
				localStorage.setItem('themes', JSON.stringify(themes));
				fetchSettings(user); // set settings local
				await fetchStats(user) // set stats local
				setLoading(false); // hide loading
			} else{
				setCurrentUser(null);
				localStorage.removeItem('User');
				localStorage.removeItem('settings');
				localStorage.removeItem('sidebar_on');
				localStorage.removeItem('stats');
				localStorage.removeItem('themes');
				setLoading(false);
			}
		})
    	return unsubscribe
	// eslint-disable-next-line
  	},[])
	const value={
		currentUser,
		singup,
		singin,
		singInWithGoogle,
		logout,
		resetPassword,
		deleteAccount,
		changeName,
		uploadAvatar,
		removeAvatar,
		updateLanguage,
		changePassword,
		changeEmail,
		updateTheme,
		error,
		LinkInGoogle,
		isProviderPasswordUser,
		isProviderGoogle,
		unlinkGoogle,
		googleAccount
	}
	return (
		<AuthContext.Provider value={value}>
			{!loading && children}
		</AuthContext.Provider>
	);
}
