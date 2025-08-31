import { bookService } from "../services/bookService.js"

const { useState, useEffect } = React


export function BookIndex() {

    const [books, setBooks] = useState(null)
    useEffect(() => {

        bookService.query()
            .then(setBooks)
            .catch((err) => console.log('Error getting books data', err))
    })
    return (

        <section className="book-index">
            <h1>Hello From Book Index</h1>
            {books}
        </section>

    )
}