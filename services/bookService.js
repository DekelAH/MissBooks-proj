import { storageService } from "./async-storage.service.js";
import { utilService } from "./util.service.js";


const BOOK_KEY = 'bookDB'
_createBooks();

export const bookService = {

    query,
    get,
    remove,
    save
}

function query() {

    return storageService.query(BOOK_KEY)
        .then((books) => {
            if (books) return books
        })
}

function get(bookId) {

    return storageService.get(BOOK_KEY, bookId)
        .then((book) => { if (book) return book })
}

function remove(bookId) {

    return storageService.remove(BOOK_KEY, bookId)
}

function save(book) {

    if (book.id) {
        return storageService.put(BOOK_KEY, book)
    } else {
        return storageService.post(BOOK_KEY, book)
    }
}

function _createBooks() {

    const ctgs = ['Love', 'Fiction', 'Poetry', 'Computers', 'Religion']
    const books = []
    for (let i = 0; i < 20; i++) {
        const book =
        {
            id: utilService.makeId(),
            title: utilService.makeLorem(2),
            subtitle: utilService.makeLorem(4),
            authors: [utilService.makeLorem(1)],
            publishedDate: utilService.getRandomIntInclusive(1950, 2024),
            description: utilService.makeLorem(20),
            pageCount: utilService.getRandomIntInclusive(20, 600),
            categories: [ctgs[utilService.getRandomIntInclusive(0, ctgs.length - 1)]],
            thumbnail: `http://coding-academy.org/books-photos/${i + 1}.jpg`,
            language: "en",
            listPrice: {
                amount: utilService.getRandomIntInclusive(80, 500),
                currencyCode: "EUR", isOnSale: Math.random() > 0.7
            }
        }

        books.push(book)
    }
    console.log('books', books)
}