import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import firebase from '../firebase';
import profileImg from '../img/user2.png';
import useGetDate from '../customHooks/useGetDate';
import themes from "../theme/schema.json";
import useFetchSettings from '../customHooks/API/useFetchSettings';
import useFetchStats from '../customHooks/API/useFetchStats';
import useFetchComment from '../customHooks/API/useFetchComment';
import useFetchSort from '../customHooks/API/useFetchSort';

const AuthContext = React.createContext()

export function useAuth(){
	return useContext(AuthContext)
}

export function AuthProvider ({children}){
	const {i18n} = useTranslation();
	const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('User')));	
	const {fetchComment} = useFetchComment();
	const {fetchSort} = useFetchSort();
	const {today,converToShortDate} = useGetDate();
	const {fetchSettings} = useFetchSettings();
	const {fetchStats} = useFetchStats();
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState();
	const [googleAccount, setGoogleAccount] = useState();
	const [isNewUserDialog, setIsNewUserDialog] = useState(false);
	async function defaultValue(u){
		const task = {
			body: "Hello my dear friend. Your first task today is to complete !!!",
			completed: false,
			date_added: today(),
			date: converToShortDate(today()),
			priority: 3,
		};
		const settings = {
			language: "en",
			theme: "blueDark",
			vibration: true,
			completed_sound_desktop: false,
			completed_sound_mobile: true,
		};
		const sort = {
			home: null,
			inbox: null
		}
		const stats = {
			completed_count: 0,
			days_items: {
				date: today(),
				total_completed: 0
			}
		}
		const taskRef = firebase.database().ref(`users/${u.user.uid}/tasks`);
		const insertData = await taskRef.push(task);
		
		const comment = {text: "This is comment. Try and u add comment",posted_uid: insertData.key, date_posted: today()};
		const taskCommentRef = firebase.database().ref(`users/${u.user.uid}/comments`);

		const statsRef = firebase.database().ref(`users/${u.user.uid}/stats`);
		
		const settingsRef = firebase.database().ref(`users/${u.user.uid}/settings`);

		const sortRef = firebase.database().ref(`users/${u.user.uid}/sort`);
		
		await taskCommentRef.push(comment)
		await settingsRef.update(settings);
		await statsRef.update(stats);
		await sortRef.update(sort);
		localStorage.setItem('comments', JSON.stringify([comment]));
		localStorage.setItem('stats', JSON.stringify(stats));
		localStorage.setItem('settings', JSON.stringify(settings));
		localStorage.setItem('sort', JSON.stringify(sort));
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
		try{
			let cred =  firebase.auth.EmailAuthProvider.credential(currentUser.email, currentPassword);
			return currentUser.reauthenticateWithCredential(cred)
		} catch(e){
			setError(e.message);
		}
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
		try{
			const u = await firebase.auth().createUserWithEmailAndPassword(email, password);
			await u.user.updateProfile({
				displayName: name,
				photoURL: profileImg
			})
			defaultValue(u);
			setIsNewUserDialog(true);
		} catch(e){
			setError(e.message);
		}
	}
	async function singInWithGoogle(){
		setError("");
		try{
			const u = await firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider());
			if (u.additionalUserInfo.isNewUser) {
				defaultValue(u);
				setIsNewUserDialog(true);
			}
		} catch(e){
			setError(e.message);
		}
	}
	const singin = async (email,password) => await firebase.auth().signInWithEmailAndPassword(email, password);
	const logout = async () => await firebase.auth().signOut();
	const resetPassword = async email => await firebase.auth().sendPasswordResetEmail(email);
	async function changeName(name){
		setError("");
		try{
			const user = JSON.parse(localStorage.getItem('User'));
			user.displayName = name;
			localStorage.setItem('User', JSON.stringify(user));
			await currentUser.updateProfile({displayName: name});	
		} catch(e){
			setError(e.message);
		}
	};
	async function changePassword(currentPassword, newPassword){
		setError("");
		if(!isProviderPasswordUser()){
			try{
				await firebase.auth().currentUser.reauthenticateWithPopup(new firebase.auth.GoogleAuthProvider());
				const u = await currentUser.linkWithCredential(firebase.auth.EmailAuthProvider.credential(currentUser.email, newPassword))
				setCurrentUser(u.user);
				localStorage.setItem('User', JSON.stringify(u.user))
			} catch(e){
				if(e.code === "auth/user-mismatch"){}
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
		try{
			setError("");
			await reauthenticate(currentPassword);
			await removeAvatar();
			await currentUser.delete();
			await firebase.database().ref(`users/${currentUser.uid}`).remove();
			return true
		} catch(e){
			setError(e.message);
			return false
		}
	}
	async function changeEmail(currentPassword, newEmail){
		try{
			setError("");
			await reauthenticate(currentPassword);
			await currentUser.updateEmail(newEmail);
		} catch(e){
			setError(e.message)
		}
	}
	async function updateSettings(settings){
		const currentSettings = JSON.parse(localStorage.getItem('settings'));
		setError("");
		const settingsRef = firebase.database().ref(`users/${currentUser.uid}/settings`);
		await settingsRef.update(settings);
		if(currentSettings.language !== settings.language){
			i18n.changeLanguage(settings.language);
		}
	}
	async function updateSort(sort){
		setError("");
		const sortRef = firebase.database().ref(`users/${currentUser.uid}/sort`);
		await sortRef.update(sort);
		localStorage.setItem('sort', JSON.stringify(sort))
	}
	async function uploadAvatar(img){
		setError("");
		if(img){
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
				if(stats.days_items.date !== converToShortDate(today())){
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
				setCurrentUser(user);
				localStorage.setItem('User', JSON.stringify(user)); // set local user
				localStorage.setItem('themes', JSON.stringify(themes));
				const sidebar_on = JSON.parse(localStorage.getItem('sidebar_on'));// set local sidebar_on
				localStorage.setItem('sidebar_on', JSON.stringify(sidebar_on ?? true));
				fetchSettings(user); // set settings local
				fetchStats(user); // set stats local
				fetchComment(user);
				fetchSort(user);
				setLoading(false); // hide loading
			} else{
				setCurrentUser(null);
				localStorage.removeItem('User');
				localStorage.removeItem('settings');
				localStorage.removeItem('stats');
				localStorage.removeItem('themes');
				localStorage.removeItem('sort');
				localStorage.removeItem('comments');
				localStorage.removeItem('sidebar_on');
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
		changePassword,
		changeEmail,
		updateSettings,
		error,
		setError,
		LinkInGoogle,
		isProviderPasswordUser,
		isProviderGoogle,
		unlinkGoogle,
		googleAccount,
		setIsNewUserDialog,
		isNewUserDialog,
		updateSort
	}
	return (
		<AuthContext.Provider value={value}>
			{!loading && children}
		</AuthContext.Provider>
	);
}
