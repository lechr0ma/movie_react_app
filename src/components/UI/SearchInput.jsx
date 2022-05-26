import React from 'react';

const SearchInput = ({placeholder, onChange, value}) => {

    return (
        <label className='search_label'>
            <input
                onChange={(e) => onChange(e.target.value)}
                value={value}
                placeholder={placeholder}
                className='search_input'
                type="text"/>
            <button
                onClick={() => onChange('')}
                className='search_clear'
            >&#215;</button>
        </label>
    );
};

export default SearchInput;