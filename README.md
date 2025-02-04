# Project: Movie Search App

This project is about creating a user interface that searches the API "https://www.omdbapi.com/". The returned list from the API will be displayed for the user to see the necessary information. If the user likes a specific movie, the user can see more details and add it to their favourites to be viewed later.
[Link:] (https://proj2-movie-search.netlify.app/)

In the development of this App, React JavaScript was used as the foundation of this App, with the help of Airtable as the backend user stored database.

# Description

This App allows the user to search for English movies/series in their database base on specific keywords. And add them to favorites.

# User story

Initial wireframe can be found here in this [trello board](https://trello.com/invite/b/67974780df2ef03ff5037822/ATTIf857da460ef354acbe39695f45654e876206315E/ga-proj-2)
Updated wireframe compared to the old one in this [draw.io](https://drive.google.com/file/d/1K5uQw1gSgCPVGSRnGFCGnYlezhiL-kt5/view?usp=sharing)
Note: Right wireframe is the updated one.

Changes made to the initial wireframe:

1. Repositioned Favorited(DisplayFav.jsx) compoment to be directly below if the Search(SearchMovies.jsx) component. This is done as Searched results on the right pushes the Favorited components too far to the bottom. Repositioned so Favorited component can be seen at all times.
2. Removed the detaild description of the Movie/Series that is located between the Search component and the Favorite component. And repositioned it as a URL route.

# API used

1. OMDb API (https://www.omdbapi.com/)

# Pseudocode

The development of the App was split to 3 different aspects of completion.

1. Aspect #1: A component that specifically deals with fetching and posting data through and fro from API and Airtable. This component will deal with internet facing data. Designated name of component is "movieService.js".
2. Aspect #2: Taking in the output of Aspect #1 (movieService.js). Designed a search and pagination around the limitations of the API. This is also the time to design a way to display further details of the interested movie. Designated name of components are "SearchMovies.jsx" and "DisplayMovieList.jsx".
3. Aspect #3: Using the above developed components and services, develop data exchange with our Airtable data. This aspect should achieve the the role of receiving searched title and current page from the "SearchMovies.jsx" component and input the selected information required in the display of the Favorited movies. Designated component to display Favorited movie is "DisplayFav.jsx".

## Aspect #1 - movieService.js

Within this service componment, it must serve the internet facing data. This will be the point of contact from local codes to fetch data from API and Airtable as well as POST to Airtable.

### getData()

This function is to specifically fetch data from the OMDb API with specific search terms. The query from the user is than reorganized by the requirements of OMDb API.
To achieve the correct query, you can check out their documentations [here](https://www.omdbapi.com/)

async function getData(searchTitle,numSearchPage = 1) {

    const searchPage = numSearchPage.toString()

    const getUrl = `${url}apikey=${API_KEY}&s=${searchTitle}&page=${searchPage}`

// console.log(getUrl)

    try {
        const response = await fetch(getUrl);
        if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();
        // console.log(json);
        return json
    } catch (error) {
        console.error(error.message);
    }

}

### getMovieId()

This function is for the purpose of fetching a more detailed information on the movie. This function is used in the "DisplayMovieList.jsx" component. When a user wishes to see more details, they may click on the movie listed in this "DisplayMovieList.jsx", in doing so will trigger this getMovieId() function below. Since we already have the unique "imdbId" (records on API returns), we will use this specific "imdbId" to query a more detailed search of the selected movie. This will return a more detailed information on the selected movie.
Note: It takes in the arguement from selected "imdbId" from the selected movie to search the API for the specific movie. Doing things this way reduces the need to fetch unessesary data in the query.

async function getMovieId(movieId) {

    const getUrl = `${url}apikey=${API_KEY}&i=${movieId}`

    try {
        const response = await fetch(getUrl);
        if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();
        return json;
    } catch (error) {
        console.error(error.message);
    }

}

### addtoFav()

This function is to "POST data to our Airtable. As user is only presented the "Add to Favourites" button in the movie details page, we will restrict the information that will be saved in the Airtable. Saved data must be enough to display basic information of the favorited movie such as posters, movie title, year and type. However, the unique "imdbID" from the OMDb API records MUST be recorded as this will serve a future purpose of fetching detailed data of the favorited movie should the user want to do so from the Favorited Display component "DisplayFav.jsx".

async function addToFav(movieInfo) {
//? info from bruno -> URL
const urlAir = "https://api.airtable.com/v0/appfPOUufQUjrWkOe/Table%201?maxRecords=3&view=Grid%20view";
//? info from bruno Body

let fields = { //too much data, reducing as its very laggy.
"imdbID": movieInfo.imdbID,
"Title": movieInfo.Title,
"Type": movieInfo.Type,
"Poster": movieInfo.Poster,
"Year": movieInfo.Year
}

const data = {fields};
console.log(data)
try {
const response = await fetch(urlAir, {
method: "POST",
headers: {
"Content-Type": "application/json",
Authorization: "Bearer patyNwS3TS4fEIOsH.00e89440c4d24c460e50374c8ca2514902eb1cd8d3a562abeff98f818ac3acff",
},
body: JSON.stringify(data),
});
if (!response.ok) {
throw new Error(`Response status: ${response.status}`);
}

    const json = await response.json();
    console.log(json);

} catch (error) {
console.error(error.message);
}
}

### getFromAirTable()

The purpose of this function is to simply fetch all the current records. "DisplayFav.jsx" component will call this function for the records.

async function getFromAirtable() {

    const urlAir = "https://api.airtable.com/v0/appfPOUufQUjrWkOe/Table%201?maxRecords=100&view=Grid%20view";

    try {
        const response = await fetch(urlAir, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer patyNwS3TS4fEIOsH.00e89440c4d24c460e50374c8ca2514902eb1cd8d3a562abeff98f818ac3acff",
      },
    });
        if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        console.log(json.records)
        return json.records;
    } catch (error) {
        console.error(error.message);
    }

}

## Aspect #2 - SearchMovies.jsx + DisplayMovieList.jsx + DisplayFav.jsx

The purpose of Aspect #2 is to ensure that the search input keyed in by the user, is cached and used to query the getData() in the "movieServices.js" to be correctly queried to the API. This is done through the use of the "SearchMovies.jsx" component. Upon successful query, the returned records are than displayed using the "DisplayMovieList.jsx" component. Should the user want to see more details and add the move to their favorites, the user may select the targeted movie through the use of "DisplayMovieDetail.jsx" component.

### SearchMovies.jsx

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

### DisplayMovieList.jsx

Note: currentPage and setCurrentPage had to be lifted for changing search page to function as the data is used in two locations.

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

### DisplayMovieDetail.jsx

In this component, it houses the "Back" button. useNavigate is used as a quick way to go back to the movie results list.
Note: the use of "const { movieID } = useParams()", this is used in URL manipulation, this works concurrent with line 31 where movies are mapped out and tagged accordingly.
Note: useEffect() was used here as I was receiving multiple returns.

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
                <p><strong>Year:</strong> {movieDetails.Year}</p> ...
        <       <... all the displayed information is here ...>
            </div>
            <button onClick={handleBackClick}>Back</button>
        </div>
    )

}

# Key Learnings

## Keeping to the purpose of the components.

It is easier to navigate through the components if the component only does what it says. By keeping to the purpose of the component and deconstructing them when needed, this ensures easier troubleshooting in the future without much ripple effect to the other segments of the code. Although this is good, this requires more states to be lifted so information is handled correctly. Note that doing it correctly doesnt entail doing it effectively. In our case above, for the page changer button in DisplayMovieList.jsx to work, currentPage state must be lifted.

## Planning ahead - Overview of code

Planning ahead of "what" data is needed to achieve the desired effect and the "where" of the data flow is very important in the planning phase. Having this done in detail will ensure cleaner and more efficient development of the codes.
And overview gui layout of pseudo code will help in the development of the app.

# Planned future enhancements

1. Add Toastify notification when the seached movie title is fetched successfully and if the favorited movie is saved successfully.
2. Add a function to check if the Favorites Airtable has the same "imdbID". If the movie is saved inside, no further action is needed.
3. Add a delete button in the DisplayFav.jsx. To remove all of the user indicated "imdbID" from the Favorites Airtable records.
4. Add single click function to disable the "Add to Fav" button. To prevent multiple
5. Adding more route information, to ensure that the page can be shared correctly.
