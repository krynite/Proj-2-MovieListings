import getData from "../services/movieServices"

import { useState } from "react"



const DisplayMovieList = ({movies}) =>{


    // console.log(movies)
    if(movies.length === 0 ){
      return <div>No Movies Found.</div>
    }




    return (
        <>
          <div>
            {movies.map((movie)=>{
              <div key={movie.imdbID}>
                <ul className="rightList">
                  <li>Title: {movie.Title}</li>
                  <li>Year: {movie.Year}</li>
                  <li>Type: {movie.Type}</li>
                </ul>
              </div>
              

            })}
          </div>
        </>




    )
}
export default DisplayMovieList; 