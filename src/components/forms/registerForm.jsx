import React, { useState } from 'react';
import Joi from 'joi-browser';
import Form2 from './form';
import { register } from './../../services/userService';
import auth from '../../services/authService';

const RegisterForm = ({handleSubmit}) => {
    const [data, setData] = useState({ username: '', password: '', name:'' });
    const [errors, setErrors] = useState({});

    const schema = {
        username: Joi.string().email().required().label('Username'),
        password: Joi.string().min(5).required().label('Password'),
        name: Joi.string().required().label("Name")
    } 

    const doSubmit = async () => {
        try {
            const response = await register(data);
            auth.loginwithJwt(response.headers['x-auth-token']);
            // Full reload of the application
            window.location = '/';
        }
        catch (ex) {
            if (ex.response && ex.response.status === 400) {
                const newErrors = { ...errors };
                newErrors.username = ex.response.data;
                setErrors(newErrors);
            }
        }
    }

    return (
        <>
        <h1>Register</h1>
            <form onSubmit={handleSubmit(doSubmit,schema)}>
                {Form2.renderInput("username","Username",schema)}
                {Form2.renderInput("password","Password","password",schema)}
                {Form2.renderInput("name","Name",schema)}
                {Form2.renderButton("Register",schema)}
            </form>
        </>
    );
}
 
export default RegisterForm;