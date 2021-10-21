/* eslint-disable react-hooks/exhaustive-deps */
import './App.css';
import MovieList from './Components/MovieList.js';
import React, { useEffect, useState } from 'react';
import MovieHeading from './Components/MovieHeading.js';
import SearchBox from './Components/SearchBox.js';
import AddFavorites from './Components/AddFavorites.js';


function App() {

  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const getMovieRequest = async (searchValue) => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=edad88ee`;

    const response = await fetch(url);

    const responseJson = await response.json();

    if (responseJson.Search) {
    setMovies(responseJson.Search);
    };
  };

  useEffect(() => {
    getMovieRequest(searchValue);
  }, [searchValue]);




  return (
    <div className='container-fluid movie-app'>
      <div className='row d-flex align-items-center mt-4 mb-4'>
      <MovieHeading heading = 'Movies'/>
      <SearchBox searchValue = {searchValue} setSearchValue = {setSearchValue} />
      </div>
      <div className='row'>
      <MovieList movies={movies} favoritesComponent = {AddFavorites} />
      </div>
    </div>
  );
}

export default App;
