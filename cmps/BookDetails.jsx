import { bookService } from "../services/bookService.js"

const { useState, useEffect } = React
const { useParams, useNavigate, Link } = ReactRouterDOM



export function BookDetails() {

    const [book, setBook] = useState(null)
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {

        bookService.get(params.bookId)
            .then(book => setBook(book))
            .catch(err => console.log("Error fetching required book!", err))

        
    }, [params.bookId])

    return (

        book &&
        <section className="book-details">
            <img className="book-details-image" src={book.thumbnail} alt="book-image" />
            <div className="details">
                <h2>Title: {book.title}</h2>
                <h2>Author: {book.authors[0]}</h2>
                <h1>Category: <span>{book.categories[0]}</span></h1>
                <h1>Description: <span>{book.description}</span></h1>
                <h1>Language: <span>{book.language}</span></h1>
                <h1>Subtitle: <span>{book.subtitle}</span></h1>
                <h1>Price: <span>{book.listPrice.amount} {book.listPrice.currencyCode}</span></h1>
                <h1>Sale: <span>{book.listPrice.isOnSale}</span></h1>
                <h1>Pages: <span>{book.pageCount}</span></h1>
                <h1>Published: <span>{book.publishedDate}</span></h1>
            </div>
            <div className="btn-section">
                <button ><Link to={`/book/${book.preBookId}`}>Prev</Link></button>
                <button ><Link to={`/book/${book.nextBookId}`}>Next</Link></button>
            </div>
        </section>

    )
}