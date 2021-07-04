import firebase from "firebase/app";
import "firebase/auth"

const app = firebase.initializeApp({
	apiKey: "AIzaSyBova8AmAIvf-v4IgDzEY7e1-C-1a76QjA",
	authDomain: process.env.REACT_APP_AUTH_DOMAIN,
	projectId: process.env.REACT_APP_PROJECT_ID,
	storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
	appId: process.env.REACT_APP_APP_ID,
	measurementId: process.env.REACT_APP_MEASUREMENT_ID
})
export const auth = app.auth()
export default app