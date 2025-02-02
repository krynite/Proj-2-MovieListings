import { useState, useEffect } from "react"
import {getData} from "../services/movieServices"
// import DisplayMovieList from "./DisplayMovieList"
// import DisplayMovieDetail from "../pages/DisplayMovieDetail"
import { useNavigate } from "react-router"


const SearchMovie = ({setMovieResults, searchTitle, setSearchTitle, currentPage, setCurrentPage}) => {
    const [inputData,setInputData] = useState({title:''})
    const [submitData, setSubmitData] = useState({title:''})
    const navigate = useNavigate()


    useEffect(() => {
        const fetchData = async () => {
            if (searchTitle) {  // Only fetch if we have a search term
                try {
                    const result = await getData(searchTitle, currentPage)
                    if (result.Search) {
                        setMovieResults(result.Search)
                    }
                } catch (error) {
                    console.error('Error fetching data:', error)
                }
            }
        }

        fetchData()
    }, [currentPage, searchTitle, setMovieResults])

    

    const handleChange = ({target}) => {
        const {name, value} = target
        setInputData({...inputData, [name]: value})
    }

    const handleSubmit = async (event) => {             
        event.preventDefault();

        try {
            const result = await getData(inputData.title,currentPage)
            setSearchTitle(inputData.title)
            setCurrentPage(1)
            console.log(result.Search)
            setMovieResults(result.Search)
            navigate('/SearchedMovies')

        }catch (error){
            console.error(error.message);
        }
        setSubmitData(inputData.title)
        console.log(submitData)
        getData(submitData)
    }

    return (
        <>
            <form onSubmit={handleSubmit} value={inputData.title}>
                <label>Movie Title:  </label><input id="title" name="title" value={inputData.title} onChange={handleChange}/><br/>
                <button type="submit">Search Button</button>
            </form>
        </>

    )


}
export default SearchMovie;