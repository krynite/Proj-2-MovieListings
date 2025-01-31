import { useParams } from "react-router";



const DisplayMovieDetail = (prop) => {
    // console.log(prop)
    const {movieID} = useParams();
    console.log(`movieID:`, movieID)

    return (
        <>
        <h2>Movie Details</h2>
            <dl>
                <dt>Weight:</dt>
                <dd></dd>
                <dt>Height:</dt>
                <dd></dd>
            </dl>
        </>

    )

}
export default DisplayMovieDetail