import { bookService } from "../services/book.service.js"
import { AddReview } from "./AddReview.jsx"

import { LongTxt } from "./LongTxt.jsx"

const { useState, useEffect } = React
const { useParams, useNavigate, Link } = ReactRouterDOM



export function BookDetails() {

    const [book, setBook] = useState(null)
    const [reviews, setReviews] = useState([])
    const params = useParams()


    useEffect(() => {

        bookService.get(params.bookId)
            .then(book => {
                setBook(book)
                setReviews(book.reviews)
            })
            .catch(err => console.log("Error fetching required book!", err))
    }, [params.bookId])

    function onRemoveReview(reviewId) {

        setReviews(book.reviews = reviews.filter(review => review.id !== reviewId))
        bookService.save(book);
    }

    function onAddReview(review) {

        console.log(review)
        //reviews.push(review)
    }

    return (

        book &&
        <section className="book-details-section">
            <div className="book-details">
                <img className="book-details-image" src={book.thumbnail} alt="book-image" />
                {book.listPrice.isOnSale && <h2 className="on-sale">On Sale!</h2>}
                <div className="details">
                    <h2>Title: {book.title}</h2>
                    <h2>Author: {book.authors[0]}</h2>
                    <h1>Category: <span>{book.categories[0]}</span></h1>
                    <h1>Description: <LongTxt text={book.description} limit={100} /></h1>
                    <h1>Language: <span>{book.language}</span></h1>
                    <h1>Subtitle: <span>{book.subtitle}</span></h1>
                    <h1>Price: <span className={bookService.setPriceColor(book.listPrice.amount)}>{book.listPrice.amount} {book.listPrice.currencyCode}</span></h1>
                    <h1>Pages: <span>{bookService.setReadingDifficultyByPageCount(book.pageCount)}</span></h1>
                    <h1>Published: <span>{bookService.setBookTimeStamp(book.publishedDate)}</span></h1>
                </div>
                <div className="btn-section">
                    <button ><Link to={`/book/${book.preBookId}`}>Prev</Link></button>
                    <button ><Link to={`/book/${book.nextBookId}`}>Next</Link></button>
                </div>
            </div>
            <div className="reviews-section">
                <div className="add-review">

                    <AddReview bookId={book.id} onAddReview={onAddReview} />
                </div>
                <div className="reviews">
                    <h2>Reviews</h2>
                    {reviews &&
                        reviews.map(review => {
                            return (
                                <div className="review" key={review.id}>
                                    <h1>Name: {review.fullname}</h1>
                                    <h1>Rate: {review.rating}</h1>
                                    <h1>Read Date: {review.readAt}</h1>
                                    <button onClick={() => onRemoveReview(review.id)} className="remove-review-btn">X</button>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </section>

    )
}