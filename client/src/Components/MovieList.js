import React from 'react';


const MovieList = (props) => {

    const FavoritesComponent = props.favoritesComponent;

    return (
        <>
        {props.movies.map((movie, index) => 
        <div className="image-container d-flex jusitfy-content-start m-5 col">
            <img src={movie.Poster} alt='movie'></img>
            <div className="overlay d-flex align-items-center justify-content-center">
                <FavoritesComponent />
            </div>
        </div>)};
        </>
    );
};

export default MovieList;