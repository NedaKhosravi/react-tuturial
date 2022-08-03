import React, { useState} from 'react';
import Joi from 'joi-browser';
import auth from '../../services/authService';
import { Redirect } from 'react-router-dom';
import Input from './input';
import Form from './form';

const LoginForm = (props) => {
    const [data, setData] = useState({ username: '', password: '' });
    const [errors, setErrors] = useState({});

    const schema = {
        username: Joi.string().required().label('Username'),
        password: Joi.string().required().label('Password')
    } 

    const doSubmit = async () => {
        try {
            // Json web token
            await auth.login(data.username, data.password);
            console.log("done");

            const { state } = props.location;
            // Full reload of the application
            window.location = state ? state.from.pathname : '/';
        }
        catch (ex) {
            if (ex.response && ex.response.status === 400) {
                const theseErrors = { ...errors };
                theseErrors.username = ex.response.data;
                setErrors(theseErrors);
            }
        }
    }

    // const handleSubmit3 = e =>{
    //     //  if the event does not get explicitly handled, its default action should not be taken as it normally would be.
    //     e.preventDefault();
    //     const errors = validate(schema);
    //     setErrors(errors || {});
    //     if (errors) return;
    //     doSubmit();
    // }

    // const handleChange3 = ( {currentTarget: input}) => {
    //     const newErrors = { ...errors };
    //     const errorMessage = validateProperty(input, schema);
    //     if (errorMessage) newErrors[input.name] = errorMessage;
    //     else delete newErrors[input.name];

    //     const newData = { ...data };
    //     newData[input.name] = input.value; // name = username or password
    //     setData(newData);
    //     setErrors(newErrors);
    // }

    // const validateProperty = ({name, value}) => {
    //     const obj = { [name]: value };
    //     const newSchema = { [name]: schema[name] };
    //     const { error } = Joi.validate(obj, newSchema);
    //     return error ? error.details[0].message : null;
    // }

    // const validate3 = () => {
    //     // If we want to validate the entire object and report all validation problems => set abortEarly: false 
    //     const {error} = Joi.validate(data, schema, { abortEarly: false });
    //     if (!error) return null;

    //     const newErrors = {};
    //     for (let item of error.details)
    //         newErrors[item.path[0]] = item.message;
    //     return newErrors;
    // }
    
    if (auth.getCurrentUser()) return <Redirect to='/' />
    const { handleSubmit, handleChange, validate, test } = props;
    return (
        <>
            <h1>Login</h1>
            <form onSubmit={() => handleSubmit(schema, doSubmit)}>
            <Input
                type="text"
                name="username"
                defaultValue={data["username"]}
                label="Username"
                onChange={() => handleChange(schema)}
                error={errors["username"]}
            />
            <Input
                type="password"
                name="password"
                defaultValue={data["password"]}
                label="Password"
                onChange={() => handleChange(schema)}
                error={errors["password"]}
            />
                <button disabled={Object.values(validate(schema)).length > 0 ? true : false} className="btn btn-primary">Login</button>
        </form>
        </>
    );
}
 
export default LoginForm;