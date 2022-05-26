import React, {useState} from 'react';
import Modal from "./UI/Modal";
import PurpleButton from "./UI/PurpleButton";
import ItemsService from "../services/itemsService";
import CloseButton from "./UI/CloseButton";

const EditModal = ({item, remove, dispatch}) => {
    const posterPath = 'https://image.tmdb.org/t/p/w500' + item.poster_path
    const [isEditable, setEditable] = useState(false)
    const [newItem, setItem] = useState({...item})

    const writeDB = async () => {
        try{
            await ItemsService.updateItem(newItem)
            dispatch({type: 'EDIT', payload: newItem})
            console.log('ok')
        } catch (e) {
            console.log(e.message)
        }

    }
    const saveOptions = () => {
        setEditable(false)
        writeDB()
    }
    const editTitle = (e) => {
        if(newItem.hasOwnProperty('title')){
            setItem({...newItem, title: e})
        } else {
            setItem({...newItem, name: e})
        }
    }
    return (
        <Modal onClick={remove}>
            <div onClick={event => event.stopPropagation()} className="item__container">
                <div className="item__poster">
                    <img style={{width: `100%`, height:`100%`, borderRadius: 20}} src={posterPath} alt="Poster"/>
                </div>
                <div className="item__content">
                    <CloseButton onClick={remove}/>
                    {!isEditable && <div className="item__options">
                        <div className="item__title">
                            <h2>Title:</h2>{newItem.title||newItem.name}
                        </div>
                        <div className="item__overview">
                            <h2>Overview:</h2>{newItem.overview}
                        </div>
                        <div className="item__adult">
                            <h2>Adult:</h2> {newItem.adult ? 'Yes':'No'}
                        </div>
                        <div className="item__video">
                            <h2>Video:</h2> {newItem.video ? 'Yes':'No'}
                        </div>
                        <PurpleButton onClick={()=>setEditable(true)}>Edit</PurpleButton>
                    </div>}
                    {isEditable && <div className="item__options">
                        <div className="item__title">
                            <h2>Title:</h2>
                            <input onChange={(e)=>editTitle(e.target.value)} className='item__title-edit' value={newItem.title||newItem.name} type="text" />
                        </div>
                        <div className="item__overview">
                            <h2>Overview:</h2>
                            <textarea onChange={(e)=>setItem({...newItem, overview: e.target.value})} className='item__overview-edit' value={newItem.overview}></textarea>
                        </div>
                        <div className="item__adult">
                            <h2>Adult:</h2>
                            <input onChange={event => setItem({...newItem, adult: event.target.checked})} checked={newItem.adult} type="checkbox"/>
                        </div>
                        <div className="item__video">
                            <h2>Video:</h2>
                            <input onChange={event => setItem({...newItem, video: event.target.checked})} checked={newItem.video} type="checkbox"/>
                        </div>
                        <PurpleButton onClick={saveOptions}>Save</PurpleButton>
                    </div>}
                </div>
            </div>
        </Modal>
    );
};

export default EditModal;