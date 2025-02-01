import { useParams } from "react-router-dom";
import {getMovieId} from "../services/movieServices"
import {useEffect, useState} from "react"

const DisplayMovieDetail = () => {
    const { movieID } = useParams()
    const [movieDetails, setMovieDetails] = useState(null)
    
    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const data = await getMovieId(movieID)
                setMovieDetails(data)
            } catch (error) {
                console.error('Error fetching movie details:', error)
            }
        }

        if (movieID) {
            fetchMovieDetails()
        }
    }, [movieID])

    if (!movieDetails) {
        return <div>Loading...</div>
    }

    return (
        <div className="movie-details">
            <h2>{movieDetails.Title}</h2>
            <div className="movie-info">
                <p><strong>Year:</strong> {movieDetails.Year}</p>
                <p><strong>Rated:</strong> {movieDetails.Rated}</p>
                <p><strong>Runtime:</strong> {movieDetails.Runtime}</p>
                <p><strong>Genre:</strong> {movieDetails.Genre}</p>
                <p><strong>Director:</strong> {movieDetails.Director}</p>
                <p><strong>Actors:</strong> {movieDetails.Actors}</p>
                <p><strong>Plot:</strong> {movieDetails.Plot}</p>
                <p><strong>IMDb Rating:</strong> {movieDetails.imdbRating}</p>
            </div>
        </div>
    )
}

export default DisplayMovieDetail