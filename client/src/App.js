/* eslint-disable react-hooks/exhaustive-deps */
import "./App.css";
import MovieList from "./Components/MovieList.js";
import React, { useEffect, useState } from "react";
import MovieHeading from "./Components/MovieHeading.js";
import SearchBox from "./Components/SearchBox.js";
import AddFavorites from "./Components/AddFavorites.js";
import RemoveFavorites from "./Components/RemoveFavorites.js";



function App() {
  // this state is the search results. The results are stored in this array.
  const [movies, setMovies] = useState([]);
  // this state is the favorites. When a fill is clicked, it will be added to the favorites array or "state".
  const [favorites, setFavorites] = useState([]);
  // this state is the search value or "input"
  const [searchValue, setSearchValue] = useState("");

  // this functin is to make an HTTP request from the movie API
  const getMovieRequest = async (searchValue) => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=edad88ee`;

    const response = await fetch(url);

    // turns response in  javaScript Object Notation (json) form
    const responseJson = await response.json();

    // if a json reponse if given through the search, then pass responseJson.search through the setMovies state
    if (responseJson.Search) {
      setMovies(responseJson.Search);
    }
  };

  // searchValue is the response from the API, so it is then creating an array with [searchValue]
  useEffect(() => {
    getMovieRequest(searchValue);
  }, [searchValue]);

  useEffect(() => {
    const movieFavorites = JSON.parse(
      localStorage.getItem("react-movie-app-favorites")
    );

    setFavorites(movieFavorites);
  }, []);

  const saveToLocalStorage = (items) => {
    localStorage.setItem("react-movie-app-favorites", JSON.stringify(items));
  };

  // this function will update the state with a new array of movies
  const addFavoriteMovie = (movie) => {
    const newFavoriteList = [...favorites, movie];
    setFavorites(newFavoriteList);
    saveToLocalStorage(newFavoriteList);
  };

  // this function filters through the favorite list, that then deletes the movies with the movie.imdbID id
  const removeFavoriteMovie = (movie) => {
    const newFavoriteList = favorites.filter(
      (favorite) => favorite.imdbID !== movie.imdbID
    );
    setFavorites(newFavoriteList);
    saveToLocalStorage(newFavoriteList);
  };

  return (
    <div className="container-fluid movie-app">
      <div className="row d-flex align-items-center mt-4 mb-4">
        <MovieHeading heading="Movies" />
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>
      <div className="row">
        <MovieList
          movies={movies}
          handleFavoritesClick={addFavoriteMovie}
          favoritesComponent={AddFavorites}
        />
      </div>
      <div className="row d-flex align-items-center mt-4 mb-4">
        <MovieHeading heading="Favorites" />
      </div>
      <div className="row">
        <MovieList
          movies={favorites}
          handleFavoritesClick={removeFavoriteMovie}
          favoritesComponent={RemoveFavorites}
        />
      </div>
    </div>
  );
}

export default App;
