import React from 'react';
import Modal from "./UI/Modal";


const FilterModal = ({onClick, query, setQuery, pageSize, setSize}) => {

    return (
        <Modal onClick={onClick}>
            <div onClick={(e) => e.stopPropagation()} className="filter__container">
                <div className="filter__header">
                    <h2>Filter settings</h2>
                </div>
                <div className="filter__options">
                    <div className="filter__select">
                        <span>
                            Media type
                        </span>
                        <select value={query.media_type} onChange={e=>setQuery({...query, media_type: e.target.value})}>
                            <option value="movie">Movie</option>
                            <option value="tv">TV</option>
                        </select>
                    </div>
                    <div className="filter__select">
                        <span>
                            Year
                        </span>
                        <select value={query.year} onChange={e => setQuery({...query, year: e.target.value})}>
                            <option value="2020">2020</option>
                            <option value="2010">2010</option>
                            <option value="2000">2000</option>
                            <option value="1990">1990</option>
                            <option value="1980">1980</option>
                            <option value="1970">1970</option>
                            <option value="1960">1960</option>
                        </select>
                    </div>
                    <div className="filter__select">
                        <span>
                            Language
                        </span>
                        <select value={query.lang} onChange={e=>setQuery({...query, lang: e.target.value})}>
                            <option value="en">en</option>
                            <option value="kr">kr</option>
                        </select>
                    </div>
                    <div className="filter__select">
                        <span>
                            View Items
                        </span>
                        <select value={pageSize} onChange={e => setSize(e.target.value)}>
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                            <option value={30}>30</option>
                        </select>
                    </div>
                </div>
                <button onClick={onClick} className='filter__button'>
                    Close
                </button>
            </div>
        </Modal>
    );
};

export default FilterModal;