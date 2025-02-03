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




async function addToFav(movieInfo) {
  //? info from bruno -> URL
  const urlAir = "https://api.airtable.com/v0/appfPOUufQUjrWkOe/Table%201?maxRecords=3&view=Grid%20view";
  //? info from bruno Body

  let fields = {                    //too much data, reducing as its very laggy.
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





// async function getFromAirtable(){
//     const urlAir = "https://api.airtable.com/v0/appfPOUufQUjrWkOe/Table%201?maxRecords=3&view=Grid%20view";

//     try {
//     const response = await fetch(urlAir, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: "Bearer patyNwS3TS4fEIOsH.00e89440c4d24c460e50374c8ca2514902eb1cd8d3a562abeff98f818ac3acff",
//       },
//     });
//     if (!response.ok) {
//       throw new Error(`Response status: ${response.status}`);
//     }

//         const json = await response.json();
//         console.log(json);
//     } catch (error) {
//     console.error(error.message);
//   }
// }


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








// getFromAirtable()






export  {getData, getMovieId, addToFav, getFromAirtable}
