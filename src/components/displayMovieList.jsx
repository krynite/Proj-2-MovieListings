import getData from "../services/movieServices"
import getAllData from "../services/movieServices"
import { useState } from "react"


const DisplayMovieList = () =>{

    const [movies,setMovie] = useState([{
      Title: 'Batman Returns: Rob Burman on Mold Making and Costumes',
      Year: '2012',
      imdbID: 'tt2186524',
      Type: 'movie',
      Poster: 'https://m.media-amazon.com/images/M/MV5BMDFkOTU4NmEtNTM5ZC00ZTRlLWJmNjItNjY3NzY0MmJjNzM5XkEyXkFqcGdeQXVyMTY2MzYyNzA@._V1_SX300.jpg'
    },
    {
      Title: 'Batman: The Enemy Within',
      Year: '1995',
      imdbID: 'tt2099561',
      Type: 'movie',
      Poster: 'N/A'
    }
    ])
    console.log(movies[1].Title)




    return (
        <>
            <ul className="rightList">
                <li>Title: {movies.title}</li>
                <li>Year: {movies.Year}</li>
                <li>Type: {movies.Type}</li>
                <li>Poster: {movies.Poster}</li>
            </ul>


        
        
        
        
        
        
        </>




    )
}
export default DisplayMovieList; 