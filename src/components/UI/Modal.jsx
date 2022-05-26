import React from 'react';

const Modal = ({children, onClick}) => {
    return (
        <div className='modal' onClick={onClick}>
            {children}
        </div>
    );
};

export default Modal;