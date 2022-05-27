import React, {useState} from 'react';
import Modal from "./UI/Modal";
import AddItem from "./AddItem";
import SearchInput from "./UI/SearchInput";
import PurpleButton from "./UI/PurpleButton";
import tmdbService from "../services/tmdbService";
import CloseButton from "./UI/CloseButton";
import {useDispatch} from "react-redux";
import {getError, getLoading, loadingOK} from "../redux/mainSlice";

const AddModal = ({dispatch, media, remove}) => {
    const reduxDispatch = useDispatch()
    const [items, setItems] = useState([])
    const [totalPages, setTotal] = useState(null)
    const [query, setQuery] = useState({
        search: '',
        media: media,
        page: 1
    })
    const fetchItems = () => {
        reduxDispatch(getLoading())
        tmdbService.fetchQuery(query).then(r => {
            setItems(r.results)
            setTotal(r.total_pages)
            reduxDispatch(loadingOK())
        }).catch(e => reduxDispatch(getError(e.response.data.errors[0])))
    }
    const searchItems = () => {
        setQuery({...query, page: 1})
        fetchItems()
    }
    const setSearch = (text) => {
        setQuery({...query, search: text})
    }
    const setPage = (val) => {
        setQuery({...query, page: query.page + val})
        fetchItems()
    }
    return (
        <Modal onClick={remove}>
            <div onClick={e => e.stopPropagation()} className="add__container">
                <CloseButton onClick={remove}/>
                <div className="add__search">
                    <SearchInput onChange={setSearch} value={query.search} placeholder='Search...'/>
                    <PurpleButton onClick={searchItems}>
                        Search
                    </PurpleButton>

                </div>
                <h2>Search results</h2>
                {items.length > 0 ? <div className="add__content">
                        {items.map(e => <AddItem dispatch={dispatch} media={query.media} item={e} key={e.id}/>)}
                    </div>
                    :
                    <h2>No data</h2>}
                {items.length > 0 && <div className="add_pagination">
                    <PurpleButton onClick={() => query.page > 1 && setPage(-1)}>
                        Prev
                    </PurpleButton>
                    Page {query.page}
                    <PurpleButton onClick={() => query.page < totalPages && setPage(1)}>
                        Next
                    </PurpleButton>
                </div>}
            </div>
        </Modal>
    );
};

export default AddModal;