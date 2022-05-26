import React from 'react';
import {Link} from "react-router-dom";

const WhiteLink = ({to, children}) => {
    return (
        <Link
            className='white_link'
            to={to}>
            {children}
        </Link>
    );
};

export default WhiteLink;