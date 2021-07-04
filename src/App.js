import React from "react";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Loader from "./components/app/Loader";
import NonLandingPages from "./pages/NonLandingPages";

const SingUp = React.lazy(() => import("./pages/SingUp"));
const SingIn = React.lazy(() => import("./pages/SingIn"));
function App() {
	return ( 
		<div className="App">
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
					<Route component={NonLandingPages} />
				</Switch>
			</Router>
		</div>
	);
}

export default App;
