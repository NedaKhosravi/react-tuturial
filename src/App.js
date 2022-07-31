import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import Movies from './components/navPages/movies';
import Customers from './components/navPages/customers';
import Rentals from './components/navPages/rentals';
import NotFound from './components/navPages/notFound';
import MovieForm from './components/navPages/movieForm';
import NavBar from './components/navBar';
import LoginForm from './components/forms/loginForm';
import RegisterForm from './components/forms/registerForm';
import Logout from './components/logout';
import auth from './services/authService';
import ProtectedRoute from './common/protectedRoute';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

class App extends Component {
  state = {};

  componentDidMount() {
    const user = auth.getCurrentUser()
    // Update the state
    this.setState({ user });
  }
  
  render() {
    const { user } = this.state;
    return (
      <>
      <ToastContainer/>
        <NavBar user={user} />
      <main className='container'>
          <Switch>
            <Route path="/login" component={LoginForm} />
            <Route path="/logout" component={Logout} />
            <Route path="/register" component={RegisterForm} />
            {/* ProtectedRoute is aware of the current user */}
            <ProtectedRoute path="/movies/:id" component={MovieForm}/>
            <Route path="/movies" render={props => <Movies {...props} user={this.state.user} />}></Route>
            <Route path="/cutomers" component={Customers}></Route>
            <Route path="/rentals" component={Rentals}></Route>
            <Route path="/not-found" component={NotFound}></Route>
            <Redirect from="/" exact to="/movies"/>
            <Redirect to="/not-found"/>
        </Switch>
      </main>
      </>
    );
  }
}

export default App;
