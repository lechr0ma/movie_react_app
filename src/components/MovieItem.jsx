import React from 'react';

const MovieItem = ({movie}) => {
    const posterPath = 'https://image.tmdb.org/t/p/w500' + movie.poster_path
    return (
        <div className='movie'>
            <img className='movie__poster' src={posterPath} alt=""/>
            <span className='movie__title'>{movie.title || movie.name}</span>
        </div>
    );
};

export default MovieItem;