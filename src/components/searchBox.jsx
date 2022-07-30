import React from 'react';

const SearchBox = ({value, onChange}) => {
    return ( 
        <input
            type="text"
            name="query"
            className='form-control my-3'
            placeholder='Search...'
            value={value}
            // e.currentTarget.value = value of the input feild
            onChange={e => onChange(e.currentTarget.value)}
        />
     );
}
 
export default SearchBox;