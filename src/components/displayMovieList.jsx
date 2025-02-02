// import getData from "../services/movieServices"

// import { useState } from "react"
import { Link } from "react-router-dom"
import { getData } from "../services/movieServices"
import { useNavigate } from "react-router-dom"
import { useState } from "react"


const DisplayMovieList = ({movies, setCurrentPage, currentPage}) =>{
    // const navigate = useNavigate()

    // console.log(movies)
    if(!movies || movies.length === 0 ){
      return <div>No Movies Found.</div>
    }

      const handleNextPage = (event) => {
        if (event === 'next') {
            setCurrentPage(currentPage +1)
            // console.log(`test2:`, currentPage)
        } else if (event === 'previous' && currentPage > 1) {
            setCurrentPage(currentPage-1)
            // console.log(`test4:`, currentPage)
        }

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
            <button onClick={()=>handleNextPage('previous')}>Prev</button>  <button onClick={()=>handleNextPage('next')}>Next</button>
          </div>
        </>




    )
}
export default DisplayMovieList; 