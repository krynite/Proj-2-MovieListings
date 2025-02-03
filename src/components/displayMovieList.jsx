// import getData from "../services/movieServices"

import { Link } from "react-router-dom"
// import { getData } from "../services/movieServices"
// import { useNavigate } from "react-router-dom"
// import { useState } from "react"


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
        <div>
            {movies.map((movie) => (
                <div key={movie.imdbID} className="movie-container">
                    <Link to={`/SearchedMovies/${movie.imdbID}`} className="movie-link">
                        <div className="movie-item">
                            <div className="poster-container">
                                {movie.Poster && movie.Poster !== "N/A" ? (
                                    <img 
                                        src={movie.Poster}
                                        alt={movie.Title}
                                        className="movie-poster"
                                    />
                                ) : (
                                    <div className="no-poster">No Poster Available</div>
                                )}
                            </div>
                            <div className="movie-details">
                                <ul>
                                    <li>Title: {movie.Title}</li>
                                    <li>Year: {movie.Year}</li>
                                    <li>Type: {movie.Type}</li>
                                </ul>
                            </div>
                        </div>
                    </Link>
                </div>
            ))}
            <div className="nextPageButton">
                <button onClick={() => handleNextPage('previous')} disabled={currentPage <= 1}>Prev</button>
                <button onClick={() => handleNextPage('next')}>Next</button>
            </div>
        </div>
    )
}
export default DisplayMovieList; 