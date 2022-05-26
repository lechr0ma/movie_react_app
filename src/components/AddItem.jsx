import React from 'react';
import PurpleButton from "./UI/PurpleButton";
import ItemsService from "../services/itemsService";

const AddItem = ({item, dispatch, media}) => {
    const addItem = () => {
        const rightItem = {...item, media_type: media}
        console.log(rightItem)
        ItemsService.addItem(rightItem).then(
          r => {
              console.log(r)
              dispatch({type: 'ADD', payload: r})
          }
        )
    }
    return (
        <div className='add__item'>
            <span className='add__title'>{item.title || item.name}</span>
            <span className='crud__title'>{item.release_date?.slice(0,4)|| item.first_air_date?.slice(0,4)}</span>
            <PurpleButton onClick={addItem}>
                Add to DB
            </PurpleButton>
        </div>
    );
};

export default AddItem;