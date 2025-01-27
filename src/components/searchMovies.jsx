import { useState } from "react"

const SearchMovie = () => {
    const [formData,setFormData] = useState({

    })


    const handleChange = ({target}) => {
        const {title, value } = target
        setFormData({...formData, [title]: value})
        

    }


    const handleSubmit = () => {
        // send input to search in api
        console.log(`Submit button pressed.`)
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label>Movie Title:  </label><input name="name" value={formData.title} onChange={handleChange}/>
                <button>Search Button</button>
            </form>
        </>

    )


}
export default SearchMovie;