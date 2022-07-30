import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import jwtDecode from 'jwt-decode';
import Movies from './components/navPages/movies';
import Customers from './components/navPages/customers';
import Rentals from './components/navPages/rentals';
import NotFound from './components/navPages/notFound';
import MovieForm from './components/navPages/movieForm';
import NavBar from './components/navBar';
import LoginForm from './components/forms/loginForm';
import RegisterForm from './components/forms/registerForm';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

class App extends Component {
  state = {};

  componentDidMount() {
    try {
      // Get the json web token from the storage
      const jwt = localStorage.getItem('token');
      // Decode it to get the current user
      const user = jwtDecode(jwt);
      // Update the state
      this.setState({ user });
    }
    catch(ex){}
  }
  
  render() {
    return (
      <>
      <ToastContainer/>
        <NavBar user={ this.state.user} />
      <main className='container'>
          <Switch>
            <Route path="/login" component={LoginForm} />
            <Route path="/register" component={RegisterForm } />
            <Route path="/movies/:id" component={MovieForm}/>
            <Route path="/movies" component={Movies}></Route>
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
