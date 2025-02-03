import { Link } from "react-router-dom"
import { useEffect } from "react"
import { getFromAirtable } from "../services/movieServices"

const DisplayFav = ({favResults, setFavResults }) => {

        useEffect(() => {
        const fetchData = async () => {
                try {
                    const result = await getFromAirtable()
                    if (result) {
                        console.log(result)
                        setFavResults(result)
                    }
                } catch (error) {
                    console.error('Error fetching data:', error)
                }
        }
        fetchData()
    }, [setFavResults])


    console.log(favResults)




    return (
        <>
            <h3>Test Fav Display</h3>
            <div>
                {favResults.map((favResult)=> {
                    return(
                        <div key={favResult.fields.imdbID}>
                            {favResult.fields.Poster && favResult.fields.Poster !== "N/A" && (
                            <img src = {favResult.fields.Poster}style={{maxWidth: '100px', height: 'auto'}}/>
            )}
                            <p className="favText">Title: {favResult.fields.Title}</p>
                            <p className="favText">Year: {favResult.fields.Year}</p>
                            <p className="favText">Type: {favResult.fields.Type}</p>
                        </div>
                    )
                })}
            </div>
        </>
    )
}
export default DisplayFav;