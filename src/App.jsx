// src/App.jsx
import "../src/App.css"
import SearchMovie from "./components/SearchMovies";
import DisplayMovieList from "./components/DisplayMovieList";
import {Route, Routes, Link} from  'react-router-dom'
// import FavList from "./components/FavList"
import DisplayMovieDetail from "./pages/DisplayMovieDetail";
import { useState } from "react";
import DisplayFav from "./components/DisplayFav"



const App = () => {
  const [movieResults, setMovieResults] = useState([])
  const [searchTitle, setSearchTitle] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [favResults, setFavResults] = useState([])
  // const [currentFavPage, setCurrentFavPage] = useState(1)

  return (
    <>
    <Link to="/" className="movie-link">
    <h1>Movie Search</h1>
    <h3>You are searching movies through a public API OMDb </h3>
    </Link>
        <SearchMovie 
          setMovieResults={setMovieResults} 
          setSearchTitle={setSearchTitle} 
          searchTitle={searchTitle} 
          setCurrentPage={setCurrentPage} 
          currentPage={currentPage}/>

    <div className="mainDiv">

        <section className="searchResults">
          <DisplayFav  favResults={favResults} setFavResults={setFavResults}/>
          <Routes>
            <Route path="/"/> {/*Main Page*/}                         {/*Passing movie resuts to be displayed*/}
            <Route path="/SearchedMovies" element={<DisplayMovieList  movies={movieResults} setCurrentPage={setCurrentPage} currentPage={currentPage}/>} /> 
            <Route path="/SearchedMovies/:movieID" element={<DisplayMovieDetail />} /> {/*useParam in DisplayMovieDetails*/}
          </Routes>
        </section>

    </div>

    </>
    
  );
}

export default App
