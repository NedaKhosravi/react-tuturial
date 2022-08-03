import React, {useState } from 'react';
import Joi from 'joi-browser';
import Input from './input';
import Select from './select';
import LoginForm from './loginForm';


const Form = () => {
    const [data, setData] = useState({ username: '', password: '' });
    const [errors, setErrors] = useState({});

    // Check for errors
    const validate = (schema) => {
        // If we want to validate the entire object and report all validation problems => set abortEarly: false 
        const {error} = Joi.validate(data, schema, { abortEarly: false });
        if (!error) return null;

        const errors = {};
        for (let item of error.details)
            errors[item.path[0]] = item.message;
        return errors;
    }

    // Get error message
    const validateProperty = (name, value, schema) => {
        const obj = { [name]: value };
        const newSchema = { [name]: schema[name] };
        const { error } = Joi.validate(obj, newSchema);
        return error ? error.details[0].message : null;
    }

    const handleSubmit = (e , schema, doSubmit) =>{
        //  if the event does not get explicitly handled, its default action should not be taken as it normally would be.
        e.preventDefault();
        const errors = validate(schema);
        setErrors(errors || {});
        if (errors) return;
        doSubmit();
        console.log("hi from submit");
    }

    // Single source of truth
    const handleChange = ( {currentTarget: input} , schema) => {
        const newErrors = { ...errors };
        if(input === undefined) {return}
        const errorMessage = validateProperty(input.name,input.value, schema);
        if (errorMessage) newErrors[input.name] = errorMessage;
        else delete newErrors[input.name];

        const newData = { ...data };
        newData[input.name] = input.value; // name = username or password
        setData(newData);
        setErrors(newErrors);
    }
    const test = (text) => {
        console.log(text);
    }

    // const renderButton = (label, schema) => {
    //     return (<button disabled={validate(schema)} className="btn btn-primary">{label}</button>);
    // }

    // const renderInput = (name, label, type="text", schema) => {
    //     return (
    //         <Input
    //         type={type}
    //         name={name}
    //         value={data[name]}
    //         label={label}
    //         onChange={handleChange(schema)}
    //         error={errors[name]}
    //     />
    //     );
    // }

    // const renderSelect = (name, label, options, schema) => {
    //     return (
    //         <Select
    //             name={name}
    //             value={data[name]}
    //             label={label}
    //             options={options}
    //             onChange={handleChange(schema)}
    //             error={errors[name]}
    //         />
    //     );
    // }
    return (
        <>
            <LoginForm handleSubmit={handleSubmit} handleChange={handleChange} validate={validate} test={test} validateProperty={validateProperty} />
        </>
    )
}
 
export default Form;