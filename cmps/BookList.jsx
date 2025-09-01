import { BookPreview } from "./BookPreview.jsx";

const { NavLink } = ReactRouterDOM



export function BookList({ books }) {


    return (

        <div className="book-list">
            {
                books.map(book =>
                    <div className="book-card" key={book.id}>
                        <BookPreview book={book} />
                        <section className="btn-section">
                            <button ><NavLink to={`/book/${book.id}`}>Details</NavLink></button>
                            <button>Edit</button>
                            <button>Remove</button>
                        </section>
                    </div>
                )
            }
        </div>
    )
}