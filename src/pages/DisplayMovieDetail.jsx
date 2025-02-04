import { useParams, useNavigate } from "react-router-dom";
import {getMovieId} from "../services/movieServices"
import {useEffect, useState} from "react"
import { addToFav } from "../services/movieServices";

const DisplayMovieDetail = () => {
    const { movieID } = useParams()
    const navigate = useNavigate()
    const [movieDetails, setMovieDetails] = useState(null)
    
    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const data = await getMovieId(movieID)
                setMovieDetails(data)
            } catch (error) {
                console.error('Error getting movie details:', error)
            }
        }

        if (movieID) {
            fetchMovieDetails()
        }
    }, [movieID])

    const handleBackClick = () => {
        navigate("/SearchedMovies")
    }

    if (!movieDetails) {
        return <div>Loading...</div>
    }


    return (
        <div className="movie-details">
            <h2>{movieDetails.Title}</h2>
            {movieDetails.Poster && movieDetails.Poster !== "N/A" && (
                <img    src = {movieDetails.Poster}
                        style={{maxWidth: '300px', height: 'auto'}}
                />
            )}

            <div className="movie-info">
                <button onClick={()=>addToFav(movieDetails)}>Add to Favorites</button>
                <p><strong>Year:</strong> {movieDetails.Year}</p>
                <p><strong>Rated:</strong> {movieDetails.Rated}</p>
                <p><strong>Runtime:</strong> {movieDetails.Runtime}</p>
                <p><strong>Genre:</strong> {movieDetails.Genre}</p>
                <p><strong>Director:</strong> {movieDetails.Director}</p>
                <p><strong>Actors:</strong> {movieDetails.Actors}</p>
                <p><strong>Plot:</strong> {movieDetails.Plot}</p>
                <p><strong>IMDb Rating:</strong> {movieDetails.imdbRating}</p>
            </div>
            <button onClick={handleBackClick}>Back</button>
        </div>
    )
}

export default DisplayMovieDetail