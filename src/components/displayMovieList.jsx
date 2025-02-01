// import getData from "../services/movieServices"

// import { useState } from "react"
import { Link } from "react-router-dom"


const DisplayMovieList = ({movies}) =>{


    // console.log(movies)
    if(movies.length === 0 ){
      return <div>No Movies Found.</div>
    }




    return (
        <>
          <div>
            {movies.map((movie)=>{
              return (
              <div key={movie.imdbID}>
                <Link to={`/SearchedMovies/${movie.imdbID}`}>
                {/* <ul className="rightList"> */}
                  <p>Title: {movie.Title}</p>
                  <p>Year: {movie.Year}</p>
                  <p>Type: {movie.Type}</p>
                </Link> <br/>
              </div>
              )

            })}
            <button>Page 1</button>  <button>Next Page</button>
          </div>
        </>




    )
}
export default DisplayMovieList; 