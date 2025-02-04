# Project: Movie Search App

This project is about creating a user interface that searches the API "https://www.omdbapi.com/". The returned list from the API will be displayed for the user to see the necessary information. If the user likes a specific movie, the user can see more details and add it to their favourites to be viewed later.
Link: (https://proj2-movie-search.netlify.app/)

In the development of this App, React JavaScript was used as the foundation of this App, with the help of Airtable as the backend user stored database.

# Description

This App allows the user to search for English movies/series in their database base on specific keywords.

# Planned future enhancements

1. Add Toastify notification when the seached movie title is fetched successfully and if the favorited movie is saved successfully.
2. Add a function to check if the Favorites Airtable has the same "imdbID". If the movie is saved inside, no further action is needed.
3. Add a delete button in the DisplayFav.jsx. To remove all of the user indicated "imdbID" from the Favorites Airtable records.
