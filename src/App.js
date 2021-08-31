import React from "react";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Loader from "./components/app/Loader";
import NonLandingPages from "./pages/NonLandingPages";
import PrivateRoute from "./components/PrivateRoute";
import { useAuth } from "./contexts/AuthContext";
import ForgotPassword from "./pages/ForgotPassord";
import { CSSTransition } from "react-transition-group";

const SingUp = React.lazy(() => import("./pages/SingUp"));
const SingIn = React.lazy(() => import("./pages/SingIn"));
function App() {
	const {loader, currentUser} = useAuth();

	return ( 
		<div className="App">
				<CSSTransition 
					in={loader && !!currentUser} 
					timeout={400}
					classNames="opacity"
					unmountOnExit>
					<Loader/>
				</CSSTransition>
				<Router>
					<Switch>
						<Route 
							path="/singup" 
							component={() => 
							<React.Suspense fallback={ <Loader/>}>
								<SingUp/> {/* Sing Up */}
							</React.Suspense> }/>
						<Route 
							path="/singin" 
							component={() => 
							<React.Suspense fallback={ <Loader/>}>
								<SingIn/>  {/* Sing In */}
							</React.Suspense> }/>
						<Route 
							path="/forgotPassword" 
							component={() => 
							<React.Suspense fallback={ <Loader/>}>
								<ForgotPassword/> {/* Forgot Password */}
							</React.Suspense> }/>
						<PrivateRoute component={() => {
							return (
								!loader && <NonLandingPages/>
							)
						}}/>
					</Switch>
				</Router>
		</div>
	);
}

export default App;
