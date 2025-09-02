import { BookPreview } from "./BookPreview.jsx";

const { NavLink } = ReactRouterDOM



export function BookList({ books, onRemoveBook }) {


    return (

        <div className="book-list">
            {
                books.map(book =>
                    <div className="book-card" key={book.id}>
                        <BookPreview book={book} />
                        <section className="btn-section">
                            <button><NavLink to={`/book/${book.id}`}>Details</NavLink></button>
                            <button><NavLink to={`/book/${book.id}`}>Edit</NavLink></button>
                            <button onClick={() => onRemoveBook(book.id)}>Remove</button>
                        </section>
                    </div>
                )
            }
        </div>
    )
}