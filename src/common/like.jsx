// Reusable components that are not specific to the domain
import React, { Component } from 'react';

// Input: liked => boolean
// Output: raise onclicked event

// in sfc we can omit "this" and add props as parameter of the function
const Like = ({liked, onClick}) => {
    let classes = "fa fa-heart";
    if(!liked) classes += "-o"
    return (<i onClick={onClick} style={{cursor:'pointer'}} className={classes} aria-hidden="true"></i>);
} 
export default Like;