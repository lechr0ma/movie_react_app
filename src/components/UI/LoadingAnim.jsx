import React from 'react';
import load from '../../img/pngegg.png'

const LoadingAnim = () => {
    return (
        <div className='loading__animation'>
            <img style={{width: 40, height: 40}} src={load}/>
        </div>
    );
};

export default LoadingAnim;