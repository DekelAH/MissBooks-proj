
import { bookService } from "../services/bookService.js"

const { useState, useEffect } = React
const { useNavigate, useParams } = ReactRouterDOM


export function BookEdit() {
    const [bookToEdit, setBookToEdit] = useState({

        authors: [],
        categories: [],
        description: '',
        language: '',
        amount: 0,
        currencyCode: '',
        isOnSale: false,
        pageCount: 0,
        publishedDate: 0,
        subtitle: '',
        thumbnail: '',
        title: ''
    })
    const navigate = useNavigate()
    const { bookId } = useParams()

    useEffect(() => {

        if (bookId) {
            bookService.get(bookId)
                .then(book => {
                    book.amount = book.listPrice.amount
                    book.currencyCode = book.listPrice.currencyCode
                    book.isOnSale = book.listPrice.isOnSale
                    delete book.listPrice
                    setBookToEdit(book)
                })
                .catch(err => console.log("Error fetching required book!", err))
        }
    }, [])

    function onSaveBook(ev) {
        ev.preventDefault()
        bookService.save(bookToEdit)
            .then(book => {
                navigate('/book')
                console.log('book:', book)
            })
            .catch(err => console.log('Error trying to save the book', err))
    }

    function handleChange({ target }) {

        let { value, name: field } = target
        switch (target.type) {
            case 'range':
                value = +target.value
                break;
            case 'text':
                value = target.value
                break;
            case 'number':
                value = +target.value
                break;
            case 'checkbox':
                value = target.checked
                break;
            default:
                value = target.value
                break;
        }

        setBookToEdit((prevBook) => ({ ...prevBook, [field]: value }))
    }

    const { authors, categories, description, language, amount, currencyCode, isOnSale, pageCount, publishedDate, subtitle, title } = bookToEdit
    return (
        <section onSubmit={onSaveBook} className="book-edit">
            <h2>{bookId ? 'Edit' : 'Add'} Book</h2>
            <form className="edit-form">
                <div className="input-section">
                    <label htmlFor="title">Title</label>
                    <input onChange={handleChange} value={title} type="text" name="title" id="title" />
                </div>
                <div className="input-section">
                    <label htmlFor="authors">Author</label>
                    <input onChange={handleChange} value={authors} type="text" name="authors" id="authors" />
                </div>
                <div className="input-section">
                    <label htmlFor="categories">Category</label>
                    <input onChange={handleChange} value={categories} type="text" name="categories" id="categories" />
                </div>
                <div className="input-section">
                    <label htmlFor="description">Description</label>
                    <textarea onChange={handleChange} value={description} name="description" id="description" rows="5" cols="40" placeholder="Enter your description here..."></textarea>
                </div>
                <div className="input-section">
                    <label htmlFor="language">Language</label>
                    <input onChange={handleChange} value={language} type="text" name="language" id="language" />
                </div>
                <div className="input-section">
                    <label htmlFor="amount">Price</label>
                    <input onChange={handleChange} value={amount} type="number" name="amount" id="amount" />
                </div>
                <div className="input-section">
                    <label htmlFor="currencyCode">Currency</label>
                    <input onChange={handleChange} value={currencyCode} type="text" name="currencyCode" id="currencyCode" />
                </div>
                <div className="input-section">
                    <label htmlFor="isOnSale">On Sale</label>
                    <input onChange={handleChange} value={isOnSale} checked={isOnSale} type="checkbox" name="isOnSale" id="isOnSale" />
                </div>
                <div className="input-section">
                    <label htmlFor="pageCount">Pages</label>
                    <input onChange={handleChange} value={pageCount} type="number" name="pageCount" id="pageCount" />
                </div>
                <div className="input-section">
                    <label htmlFor="publishedDate">Year</label>
                    <input onChange={handleChange} value={publishedDate} type="number" name="publishedDate" id="publishedDate" />
                </div>
                <div className="input-section">
                    <label htmlFor="subtitle">Subtitle</label>
                    <input onChange={handleChange} value={subtitle} type="text" name="subtitle" id="subtitle" />
                </div>
                <section className="btns flex">
                    <button>Save</button>
                </section>
            </form>
        </section>
    )
}