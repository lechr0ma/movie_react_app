import React from 'react';

const PurpleButton = ({children, onClick, disabled}) => {
    return (
        <button disabled={disabled} onClick={onClick} className='purple_button'>
            {children}
        </button>
    );
};

export default PurpleButton;