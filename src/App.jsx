// src/App.jsx
import "../src/App.css"
import SearchMovie from "./components/SearchMovies";
import DisplayMovieList from "./components/DisplayMovieList";
import {Route, Routes} from  'react-router-dom'
import FavList from "./components/FavList"
import DisplayMovieDetail from "./pages/DisplayMovieDetail";


const App = () => {

  return (
    <>
    <h1>Movie Search</h1>
    <h3>You are searching movies through a public API OMDb </h3>

   <div className="mainDiv">
        <SearchMovie></SearchMovie>
        <section>
          <Routes>
            <Route path="/" element={<h1>nth here</h1>}/>
            <Route path="/SearchedMovies" element={<DisplayMovieList/>}/>
            <Route path="/SearchedMovies/:movieID" element={<DisplayMovieDetail/>}/>
            <Route path="*" element={<h2>Whoops, nothing here!</h2>} />
          </Routes>
        </section>
        <section></section>
    </div>
      {/* <div>
        <h2>Favorite Movies </h2>
        <Routes>
          <Route path="" element={<FavList/>}/>
        </Routes>
      </div> */}
    
    </>
    
  );
}

export default App
