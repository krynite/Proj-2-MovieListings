//   const getUrl = "http://www.omdbapi.com/?apikey=5a815159&s=batman&page=1";
// 1000 daily limit

const API_KEY = "5a815159"
const url = "http://www.omdbapi.com/?"
// const searchTitle = "batman"






async function getData(searchTitle,numSearchPage = 1) {
    
    const searchPage = numSearchPage.toString()
    
    const getUrl = `${url}apikey=${API_KEY}&s=${searchTitle}&page=${searchPage}`
//   console.log(getUrl)

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

export default getData
