import React, {useEffect, useReducer, useState} from 'react';
import SearchInput from "../components/UI/SearchInput";
import CrudItem from "../components/CrudItem";
import EditModal from "../components/EditModal";
import {crudReducer} from "../reducers/crudReducer";
import PurpleButton from "../components/UI/PurpleButton";
import AddModal from "../components/AddModal";
import ItemsService from "../services/itemsService";
import useDelayed from "../hooks/useDelayed";
import {useDispatch} from "react-redux";
import {getError, getLoading, loadingOK} from "../redux/mainSlice";


const initialState = {
    isLoading: true,
    data: [],
    error: ''
}
const CrudPage = () => {
    const reduxDispatch = useDispatch()
    const [state, dispatch] = useReducer(crudReducer, initialState)
    const [query, setQuery] = useState({
        media_type: 'movie',
        title: '',
        name: ''
    })
    const [editModal, setEdit] = useState({isModal: false, modalItem: {}})
    const [addModal, setAdd] = useState(false)
    //here with the hook
    const delayedSearch = useDelayed(query)
    const getModal = (item) => {
        setEdit({
            isModal: true,
            modalItem: item
        })
    }

    const removeModal = () => {
        setEdit({
            isModal: false,
            modalItem: {}
        })
        setAdd(false)
    }
    const removeItem = (item) => {
        reduxDispatch(getLoading())
        ItemsService.deleteItem(item)
            .then(res => {
                dispatch({type: 'DELETE', payload: res})
                reduxDispatch(loadingOK())
            })
            .catch(e =>
                reduxDispatch(getError(e.message))
            )
    }

    useEffect(() => {
            reduxDispatch(getLoading())
            ItemsService.fetchByQuery(delayedSearch)
                .then(
                    res => {
                        dispatch({type: 'FETCH', payload: res})
                        reduxDispatch(loadingOK())
                    })
                .catch(e =>
                    reduxDispatch(getError(e.message))
                )
        }
        , [delayedSearch])
    return (
        <div className='crud__container'>
            {editModal.isModal && <EditModal remove={removeModal} dispatch={dispatch} item={editModal.modalItem}/>}
            {addModal && <AddModal remove={removeModal} dispatch={dispatch} media={query.media_type}/>}
            <div className="crud__options">
                <h2>Search:</h2>
                <SearchInput value={query.title} placeholder='Search'
                             onChange={(e) => setQuery({...query, title: e, name: e})}/>
                <h2>Type: </h2>
                <select onChange={event => setQuery({...query, media_type: event.target.value})}
                        className='crud__media'>
                    <option value="movie">Movie</option>
                    <option value="tv">TV</option>
                </select>
                <PurpleButton onClick={() => setAdd(true)}>
                    Add new {query.media_type}
                </PurpleButton>
            </div>
            {state.isLoading && <h2>Loading</h2>}
            {state.error && <h2>{state.error}</h2>}
            {!state.data.length && !state.isLoading && <h2>No data</h2>}
            {state.data &&
                <ul className="crud__list">
                    {state.data.map(e => <CrudItem remove={removeItem} onClick={getModal} key={e.id} item={e}/>)}
                </ul>
            }
        </div>
    );
};
export default CrudPage;