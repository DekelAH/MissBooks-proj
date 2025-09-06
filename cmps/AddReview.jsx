import { bookService } from "../services/book.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"

const { useState } = React

export function AddReview({ bookId }) {

    const [review, setReview] = useState(null)

    function onSaveReview(ev) {
        ev.preventDefault()
        bookService.addReview(bookId, review)
            .then(showSuccessMsg('Review added successfuly!'))
            .catch((error) => {

                console.log('Error adding review!', error)
                showErrorMsg('Error adding review!')
            })
    }


    return (

        <section className="add-review-section">
            <form onSubmit={onSaveReview} className="add-review-form">
                <div className="input-section">
                    <label htmlFor="fullname">Full Name</label>
                    <input onChange={handleChange} value={fullname} type="text" name="fullname" id="fullname" />
                </div>

                <button>Add Review</button>
            </form>
        </section>
    )
}

