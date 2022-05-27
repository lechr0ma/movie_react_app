import React from 'react';
import PurpleButton from "./UI/PurpleButton";
import ItemsService from "../services/itemsService";
import {useDispatch} from "react-redux";
import {getError, getLoading, loadingOK} from "../redux/mainSlice";

const AddItem = ({item, dispatch, media}) => {
    const reduxDispatch = useDispatch()
    const addItem = () => {
        const rightItem = {...item, media_type: media}
        reduxDispatch(getLoading())
        ItemsService.addItem(rightItem).then(
            r => {
                dispatch({type: 'ADD', payload: r})
                reduxDispatch(loadingOK())
            }
        ).catch(e => reduxDispatch(getError(e.message)))
    }
    return (
        <div className='add__item'>
            <span className='add__title'>{item.title || item.name}</span>
            <span className='crud__title'>{item.release_date?.slice(0, 4) || item.first_air_date?.slice(0, 4)}</span>
            <PurpleButton onClick={addItem}>
                Add to DB
            </PurpleButton>
        </div>
    );
};

export default AddItem;