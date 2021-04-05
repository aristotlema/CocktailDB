import React from 'react';
import './Button.scss';

const Button = ({ buttonTitle }) => {
    return <button className="app-button">{buttonTitle}</button>;
};

export default Button;