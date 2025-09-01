import { bookService } from "../services/bookService.js"
import { BookList } from "./BookList.jsx"

const { useState, useEffect } = React


export function BookIndex() {

    const [books, setBooks] = useState(null)
    useEffect(() => {

        bookService.query()
            .then(setBooks)
            .catch((err) => console.log('Error getting books data', err))
    }, [])


    if (!books) return <div className="loading-overlay">Loading BoOoOoks...</div>

    return (

        <section className="book-index">

            <BookList
                key={books.map(book => book.id)}
                books={books}
            />
        </section>

    )
}