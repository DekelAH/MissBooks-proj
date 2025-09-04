import { bookService } from "../services/book.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { BookFilter } from "./BookFilter.jsx"
import { BookList } from "./BookList.jsx"

const { Link } = ReactRouterDOM
const { useNavigate } = ReactRouterDOM
const { useState, useEffect } = React


export function BookIndex() {

    const [books, setBooks] = useState(null)
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())
    const navigate = useNavigate()
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
                showSuccessMsg('Book removed successfuly!')
            })
            .catch(err => {
                console.log('Problem removing book:', err)
                showErrorMsg('Problem removing book')
            })
    }

    if (!books) return <div className="loading-overlay">Loading BoOoOoks...</div>

    return (

        <section className="book-index">
            <div className="tools">
                <button><Link to={'/book/edit'}>Add Book</Link></button>
                <BookFilter onSetFilterBy={onSetFilterBy} filterBy={filterBy} />
            </div>
            <BookList
                key={books.map(book => book.id)}
                books={books}
                onRemoveBook={onRemoveBook}
            />
        </section>

    )
}