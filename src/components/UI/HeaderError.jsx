import React from 'react';
import CloseButton from "./CloseButton";
import {useDispatch, useSelector} from "react-redux";
import {closeError} from "../../redux/mainSlice";

const HeaderError = () => {
    const dispatch = useDispatch()
    const {error} = useSelector(state => state.main)
    return (
        <div className='header__error'>
            <div className="error__close">
                <CloseButton onClick={() => dispatch(closeError())}/>
            </div>
            {error}
        </div>
    );
};

export default HeaderError;