import { bookService } from "../services/bookService.js"
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
            })
            .catch(err => {
                console.log('Problems removing book:', err)
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