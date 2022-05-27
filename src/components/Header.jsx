import React from 'react';
import WhiteLink from "./UI/WhiteLink";
import {useSelector} from "react-redux";
import LoadingAnim from "./UI/LoadingAnim";
import HeaderError from "./UI/HeaderError";

const Header = () => {
    const {isLoading, isError} = useSelector(state => state.main)
    return (
        <div className='header'>
            {isLoading && <LoadingAnim/>}
            {isError && <HeaderError/>}
            <div className="header__logo">
                <WhiteLink to={'/'}>
                    LOGO
                </WhiteLink>
            </div>
            <div className="header__nav">
                <WhiteLink to={'/'}>Home</WhiteLink>
                <WhiteLink to={'/new'}>CRUD page</WhiteLink>
            </div>
        </div>
    );
};

export default Header;