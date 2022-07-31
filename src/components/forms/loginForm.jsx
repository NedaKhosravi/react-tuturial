import React, { Component } from 'react';
import Joi from 'joi-browser';
import Form from './form';
import auth from '../../services/authService';

class LoginForm extends Form {
    state = {
        data: { username: '', password: '' },
        errors: {}
    }

    schema = {
        username: Joi.string().required().label('Username'),
        password: Joi.string().required().label('Password')
    } 

    doSubmit = async () => {
        try {
            const { data } = this.state;
            // Json web token
            await auth.login(data.username, data.password);
            // Full reload of the application
            window.location = '/';
        }
        catch (ex) {
            if (ex.response && ex.response.status === 400) {
                const errors = { ...this.state.errors };
                errors.username = ex.response.data;
                this.setState({ errors });
            }
        }
    }

    render() { 
        return (
            <>
            <h1>Login page</h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput("username","Username")}
                    {this.renderInput("password","Password","password")}
                    {this.renderButton("Login")}
            </form>
            </>
        );
    }
}
 
export default LoginForm;