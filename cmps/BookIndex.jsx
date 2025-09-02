import { bookService } from "../services/bookService.js"
import { BookFilter } from "./BookFilter.jsx"
import { BookList } from "./BookList.jsx"

const { useState, useEffect } = React


export function BookIndex() {

    const [books, setBooks] = useState(null)
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())

    useEffect(() => {

        bookService.query(filterBy)
            .then(setBooks)
            .catch((err) => console.log('Error getting books data', err))

    }, [filterBy])

    function onSetFilterBy(filterBy) {

        setFilterBy(prevFilter => ({ ...prevFilter, ...filterBy }))
    }

    function onRemoveBook(bookId) {
        bookService.remove(bookId)
            .then(() => {
                setBooks(books => books.filter(book => book.id !== bookId))
            })
            .catch(err => {
                console.log('Problems removing book:', err)
            })
    }

    if (!books) return <div className="loading-overlay">Loading BoOoOoks...</div>

    return (

        <section className="book-index">

            <BookFilter onSetFilterBy={onSetFilterBy} filterBy={filterBy} />
            <BookList
                key={books.map(book => book.id)}
                books={books}
                onRemoveBook={onRemoveBook}
            />
        </section>

    )
}