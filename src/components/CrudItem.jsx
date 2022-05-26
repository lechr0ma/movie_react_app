import React from 'react';
import PurpleButton from "./UI/PurpleButton";

const CrudItem = ({item, onClick, remove}) => {
    return (
       <li onClick={() => onClick(item)} className='crud__item'>
           <span className='crud__title'>{item.title || item.name}</span>
           <PurpleButton onClick={(e)=>{e.stopPropagation(); remove(item)}}>
               Delete
           </PurpleButton>
       </li>
    );
};

export default CrudItem;