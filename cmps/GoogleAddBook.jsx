import { bookService } from "../services/book.service.js"
import { googleBookService } from "../services/google-book.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { utilService } from "../services/util.service.js"


const { useState } = React


export function GoogleAddBook() {

    const [searchResults, setSearchResults] = useState()

    function handleSearchChange({ target }) {

        utilService.debounce(googleBookService.query(target.value)
            .then(result => {
                setSearchResults(result)
            }))


    }

    function onAddGoogleBook(googleBooktoAdd) {

        bookService.addGoogleBook(googleBooktoAdd)
            .then(result => {
                bookService.save(result)
                showSuccessMsg('Book from google added successfuly!')
            })
            .catch(err => {
                console.log("Error adding wanted book!", err)
                showErrorMsg('Error adding wanted book!')
            })
    }

    return (

        <div className="google-add-book-section">
            <h1>Add Book From Google</h1>
            <form className="google-add-book-form">
                <label htmlFor="text">Google Search</label>
                <input onChange={handleSearchChange} type="text" name="text" id="text" placeholder="Enter book title..."></input>
            </form>
            <div className="google-search-results">
                <ul>
                    {searchResults &&
                        searchResults.map(googleBook => {

                            return (
                                <div className="result" key={googleBook.id}>
                                    <li>{googleBook.volumeInfo.title}</li>
                                    <button onClick={() => { onAddGoogleBook(googleBook) }} className="add-google-book-btn">+</button>
                                </div>
                            )
                        })
                    }
                </ul>
            </div>
        </div>
    )
}