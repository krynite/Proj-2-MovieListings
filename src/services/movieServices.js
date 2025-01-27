//   const getUrl = "http://www.omdbapi.com/?apikey=5a815159&s=batman&page=1";
// 1000 daily limit

const API_KEY = "5a815159"
const url = "http://www.omdbapi.com/?"
const searchTitle = "batman"
const searchPage = "1"





async function getData() {
    

    const getUrl = `${url}apikey=${API_KEY}&s=${searchTitle}&page=${searchPage}`
//   console.log(getUrl)
    let testJson;


    try {
        const response = await fetch(getUrl);
        if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();
        // console.log(json);
        testJson = json

    } catch (error) {
        console.error(error.message);
    }
    // console.log(testJson,`from testJson`)
    // console.log(testJson.totalResults,`from testJson`)
}


async function getAllData() {
    let json = {};
    let allJson = {};
    for(let i = 1; i < 3 ; i++) {
                try {
                    const response = await fetch(`${url}apikey=${API_KEY}&s=${searchTitle}&page=${i}`);
                    // console.log(`typeof response:`, typeof response)
                    // console.log(`response: `,response)
                    if (!response.ok) {
                    throw new Error(`Response status: ${response.status}`);
                    }

                    json = await response.json();
                    console.log(json);
                    // console.log(`testinbg typeof`,typeof json)

                } catch (error) {
                    console.error(error.message);
                }
    }
    // console.log(`Testing allJson`,allJson)

}


// getData();

// export default {getData, getAllData}

getAllData()
export default {getAllData, getData}
