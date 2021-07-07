import React, { useContext, useEffect, useState } from 'react'
import firebase from '../firebase'
import profileImg from '../img/user2.png';

const AuthContext = React.createContext()

export function useAuth(){
	return useContext(AuthContext)
}

export function AuthProvider ({children}){
	const [currentUser, setCurrentUser] = useState();
	const [loading, setLoading] = useState(true);

	function singup(email,password,name){
		return (firebase.auth().createUserWithEmailAndPassword(email, password)
		.then((u) => {
			return u.user.updateProfile({
				displayName: name,
				photoURL: profileImg
			})
		}))		
	}
	function singin(email,password){
		return firebase.auth().signInWithEmailAndPassword(email, password)
	}
	function singInWithGoogle(){
		return firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
	}
	function singInWithFacebook(){
		return firebase.auth().signInWithPopup(new firebase.auth.FacebookAuthProvider())
	}
	function logout() {
    return firebase.auth().signOut()
  }
	useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {		 
			setCurrentUser(user);
			setLoading(false);
    })

    return unsubscribe
  	}, [])

	const value={
		currentUser,
		singup,
		singin,
		singInWithGoogle,
		singInWithFacebook,
		logout
	}

	return (
		<AuthContext.Provider value={value}>
			{!loading && children}
		</AuthContext.Provider>
	);
}
