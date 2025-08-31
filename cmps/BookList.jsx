import { BookPreview } from "./BookPreview.jsx";




export function BookList({ books }) {


    return (

        <div className="book-list">
            {
                books.map(book =>
                    <div className="book-card" key={book.id}>
                        <BookPreview book={book} />
                        <section className="btn-section">
                            <button>Remove</button>
                            <button>Details</button>
                            <button>Edit</button>
                        </section>
                    </div>
                )
            }
        </div>
    )
}