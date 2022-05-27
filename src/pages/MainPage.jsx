import React, {useEffect, useState} from 'react';
import PurpleButton from "../components/UI/PurpleButton";
import SearchInput from "../components/UI/SearchInput";
import MovieItem from "../components/MovieItem";
import FilterModal from "../components/FilterModal";
import ItemsService from "../services/itemsService";
import {useDispatch} from "react-redux";
import {getError, getLoading, loadingOK} from "../redux/mainSlice";


const MainPage = () => {
    const [items, setItems] = useState([])
    const [page, setPage] = useState(1)
    const [pageSize, setSize] = useState(10)
    const [query, setQuery] = useState({
        name: '',
        title: '',
        year: '2020',
        lang: 'en',
        media_type: 'movie'
    })
    const [isQuery, setIsQuery] = useState(false)
    const [timeoutID, setID] = useState(0)
    const [modal, setModal] = useState(false)
    const [isLoading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const cut = items && items.slice((page - 1) * pageSize, page * pageSize)
    const pagesCount = items && Math.ceil(items.length / pageSize)
    const dispatch = useDispatch()
    const searchQuery = (text) => {
        setIsQuery(true)
        setQuery({...query, title: text, name: text})
    }
    const writeItems = (data) => {
        setItems(data)
        setLoading(false)
    }
    const writeError = (error) => {
        setError(error)
        setLoading(false)
    }
    //here with func
    const delayedQuery = () => {
        clearTimeout(timeoutID)
        const id = setTimeout(() => {
            dispatch(getLoading())
            ItemsService.fetchByQuery(query).then(res => {
                writeItems(res)
                setPage(1)
                dispatch(loadingOK())
            }).catch(
                e => dispatch(getError(e.message))
            )
        }, 500)
        setID(id)
    }
    const trendyQuery = () => {
        setLoading(true)
        dispatch(getLoading())
        ItemsService.fetchTrendy().then(
            result => {
                writeItems(result)
                dispatch(loadingOK())
            }
        ).catch(e => {
            dispatch(getError(e.message))
            writeError(e.message)
        })
    }

    const nextPage = () => {
        if (page === pagesCount - 1 && !isQuery) {
            const offset = pagesCount * pageSize
            dispatch(getLoading())
            ItemsService.fetchMoreTrendy(offset)
                .then(
                    result => {
                        setItems([...items, ...result])
                        dispatch(loadingOK())
                    }
                )
                .catch(
                    e => dispatch(getError(e.message))
                )
        }
        setPage(page + 1)
    }
    const prevPage = () => {
        setPage(page - 1)
    }
    const getModal = () => {
        setIsQuery(true)
        setModal(!modal)
    }
    useEffect(() => {
        isQuery ? delayedQuery() : trendyQuery()
    }, [query])
    return (
        <div className='main'>
            {modal && <FilterModal
                query={query}
                setQuery={setQuery}
                onClick={getModal}
                pageSize={pageSize}
                setSize={setSize}
            />}
            <h2>Movie finder</h2>
            <div className="main__filter">
                <SearchInput value={query.title} onChange={searchQuery} placeholder='Search movie'/>
                <PurpleButton onClick={getModal}>Filter</PurpleButton>
            </div>
            {isLoading && <h2 style={{marginTop: 10}}>Loading</h2>}
            {error && <h2 style={{marginTop: 10}}>{error}</h2>}
            {!items.length && !isLoading && <h2 style={{textAlign: "center", marginTop: 10}}>No data</h2>}
            {cut && <div className="main__content">
                {cut.map(el => <MovieItem key={el.id} movie={el}/>)}
            </div>}
            {cut.length > 0 && <div className="main__pagination">
                <PurpleButton disabled={page === 1} onClick={prevPage}>Prev</PurpleButton>
                <span>Page {page} of {pagesCount}</span>
                <PurpleButton disabled={page === pagesCount} onClick={nextPage}>Next</PurpleButton>
            </div>}
        </div>
    );
};

export default MainPage;