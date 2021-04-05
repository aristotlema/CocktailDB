import React, { useState } from 'react';
import './SearchBar.scss';

const SearchBar = ({ onFormSubmit }) => {
    const [term, setTerm] = useState('');

    const onSubmit = (event) => {
        event.preventDefault();
        onFormSubmit(term);
    }

    return (
        <div className="search-bar">
            <form onSubmit={onSubmit}>
                <input 
                    placeholder="Search..."
                    className="search-bar-input" 
                    type="text" 
                    value={term}
                    onChange={(e) => setTerm(e.target.value)}
                />
            </form>
        </div>
    );

};

export default SearchBar;