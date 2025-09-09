import { bookService } from "../services/book.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"

const { useState } = React

export function AddReview({ bookId, onAddReview }) {

    const [review, setReview] = useState({

        fullname: '',
        rating: 0,
        readAt: ''
    })

    function onSaveReview(ev) {
        ev.preventDefault()
        bookService.addReview(bookId, review)
            .then(() => {
                showSuccessMsg('Review added successfuly!')
                onAddReview(review)
            })
            .catch((error) => {

                console.log('Error adding review!', error)
                showErrorMsg('Error adding review!')
            })

    }

    function handleChange({ target }) {

        let { value, name: field } = target
        switch (target.type) {
            case 'text':
                value = target.value
                break;
            case 'number':
                value = +target.value
                break;
            case 'date':
                value = target.value
                break;
            default:
                value = target.value
                break;
        }

        setReview((prevReview) => ({ ...prevReview, [field]: value }))
    }

    const { fullname, rating, readAt } = review
    return (

        <section className="add-review-section">
            <form onSubmit={onSaveReview} className="add-review-form">
                <div className="header">
                    <h2>Reviews</h2>
                    <button>Add Review</button>
                </div>
                <div className="input-section">
                    <label htmlFor="fullname">Full Name</label>
                    <input onChange={handleChange} value={fullname} type="text" name="fullname" id="fullname" />
                </div>
                <div className="input-section">
                    <label htmlFor="rating">Rate</label>
                    <input onChange={handleChange} value={rating} type="number" min="1" max="5" name="rating" id="rating" />
                </div>
                <div className="input-section">
                    <label htmlFor="readAt">Reading Date</label>
                    <input onChange={handleChange} value={readAt} type="date" name="readAt" id="readAt" />
                </div>
            </form>
        </section>
    )
}

