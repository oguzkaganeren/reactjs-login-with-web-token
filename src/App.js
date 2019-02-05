import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Login from './auth/Login';
import Register from './auth/Register';
import ForgotPassword from './auth/ForgotPassword';
import Main from './Main';
import PrivateRoute from './PrivateRoute';
class App extends Component {
	render() {
		return (
			<Router>
				<div>
					<Route exact path="/" component={Main} />
					<Route exact path="/login" component={Login} />
					<Route exact path="/register" component={Register} />
					<Route exact path="/forgotpassword" component={ForgotPassword} />
				</div>
			</Router>
		);
	}
}

export default App;
