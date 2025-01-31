// src/App.jsx
import "../src/App.css"
import SearchMovie from "./components/SearchMovies";
import DisplayMovieList from "./components/DisplayMovieList";
import {Route, Routes} from  'react-router'
import FavList from "./components/FavList"


const App = () => {

  return (
    <>
    <h1>Movie Search</h1>
    <h3>You are searching movies through a public API OMDb </h3>

   <div className="mainDiv">
        <SearchMovie></SearchMovie>
        <section>
          <h2>Search Results: </h2>
          <Routes>
            <Route path="SearchedMovies" element={<DisplayMovieList/>}/>
          </Routes>
        </section>
    </div>
      <div>
        <h2>Favorite Movies </h2>
        <Routes>
          <Route path="" element={<FavList/>}/>
        </Routes>
      </div>
    
    </>
    
  );
}

export default App
