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

    function setReadingDifficultyByPageCount(pageCount) {

        if (pageCount > 500) {
            return 'Serious Reading'
        }
        if (pageCount > 200) {
            return 'Decent Reading'
        }
        return 'Light Reading'
    }

    function setBookTimeStamp(year) {

        let currentDate = new Date()
        let timeStamp = currentDate.getFullYear() - year
        if (timeStamp >= 10) {
            return 'Vintage Book'
        } else if (timeStamp <= 1) {
            return 'New Book'
        }
        return year
    }

    function setPriceColor(price) {

        if (price > 150) {

            return 'price-expensive'
        } else if (price < 20) {

            return 'price-cheap'
        }
    }

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
                <h1>Price: <span className={setPriceColor(book.listPrice.amount)}>{book.listPrice.amount} {book.listPrice.currencyCode}</span></h1>
                <h1>Sale: <span>{book.listPrice.isOnSale}</span></h1>
                <h1>Pages: <span>{setReadingDifficultyByPageCount(book.pageCount)}</span></h1>
                <h1>Published: <span>{setBookTimeStamp(book.publishedDate)}</span></h1>
            </div>
            <div className="btn-section">
                <button ><Link to={`/book/${book.preBookId}`}>Prev</Link></button>
                <button ><Link to={`/book/${book.nextBookId}`}>Next</Link></button>
            </div>
        </section>

    )
}