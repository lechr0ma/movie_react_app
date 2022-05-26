import React from 'react';
import WhiteLink from "./UI/WhiteLink";
import {useSelector} from "react-redux";
import LoadingAnim from "./UI/LoadingAnim";

const Header = () => {
    const {isLoading, isError, error} = useSelector(state => state.main)
    return (
        <div className='header'>
            {isLoading && <LoadingAnim/>}
            <div className="header__logo">
                <WhiteLink to={'/'}>
                    LOGO
                </WhiteLink>
            </div>
            <div className="header__nav">
                <WhiteLink  to={'/'}>Home</WhiteLink>
                <WhiteLink  to={'/new'}>CRUD page</WhiteLink>
            </div>
        </div>
    );
};

export default Header;