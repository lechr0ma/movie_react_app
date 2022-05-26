import React from 'react';

const CloseButton = ({onClick}) => {
    return (
        <button onClick={onClick} className='close__button'>
            &#215;
        </button>
    );
};

export default CloseButton;