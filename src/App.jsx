// src/App.jsx
import "../src/App.css"
import SearchMovie from "./components/searchMovies";
import DisplayMovieList from "./components/displayMovieList";


const App = () => {

  return (
    <>
    <h1>Movie Search</h1>
    <h3>You are searching movies through a public API OMDb </h3>

   <div className="mainDiv">
        <SearchMovie></SearchMovie>
        {/* <section>
          <h2>Movie Name</h2>
          <label>Plot: Simple Plot  --------------------------------------------------------------------------------------------------------------------- </label><br/>
          <label>Description: </label><br/>
          <label>Rotten Tomato Score: </label><br/>
          <label>Release Date: </label><br/>
          <label>Cost: </label><br/>
        </section><br/> */}
        <section>
          <h2>This is a list of Search Results: </h2>
          <DisplayMovieList></DisplayMovieList>
          {/* <ul className="rightList">
              <li>Seach Result 1 ---------------------------------------------------------------------------------------------------------------------</li>
              <li>Seach Result 2</li>
              <li>Seach Result 3</li>
          </ul> */}
        </section>
    </div>
      <div>
        <h2>Favorite Movies </h2>
        <ul className="favMovieList">
            <li>Movie 1</li>
            <li>Movie 2</li>
            <li>Movie 3</li>
        </ul>
      </div>
    
    </>
    
  );
}

export default App
