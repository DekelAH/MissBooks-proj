import { storageService } from "./async-storage.service.js";
import { utilService } from "./util.service.js";


const BOOK_KEY = 'bookDB'
_createBooks();

export const bookService = {

    query,
    get,
    remove,
    save,
    getDefaultFilter,
    setBookTimeStamp,
    setReadingDifficultyByPageCount,
    setPriceColor
}

function query(filterBy = {}) {

    return storageService.query(BOOK_KEY)
        .then((books) => {

            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                books = books.filter(book => regExp.test(book.title))
            }

            if (filterBy.price) {
                books = books.filter(book => book.listPrice.amount >= filterBy.price)
            }

            if (filterBy.pageCount) {
                books = books.filter(book => book.pageCount >= filterBy.pageCount)
            }

            if (filterBy.publishedDate) {
                books = books.filter(book => book.publishedDate >= filterBy.publishedDate)
            }

            if (filterBy.onSale) {
                books = books.filter(book => book.listPrice.isOnSale)
            }

            return books
        })
}

function get(bookId) {

    return storageService.get(BOOK_KEY, bookId)
        .then(book => _setNextPrevBookId(book))
}

function remove(bookId) {

    return storageService.remove(BOOK_KEY, bookId)
}

function save(book) {

    // book.listPrice = { isOnSale: book.isOnSale, currencyCode: book.currencyCode, amount: book.amount }
    book.thumbnail = `http://ca.org/books-photos/4.jpg`;

    if (book.id) {
        return storageService.put(BOOK_KEY, book)
    } else {
        return storageService.post(BOOK_KEY, book)
    }
}

function getEmptyBook(book = {}) {

    return {}
}

function getDefaultFilter() {

    return { txt: '', price: 0, pageCount: '', publishedDate: '', onSale: '' }
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

function setReadingDifficultyByPageCount(pageCount) {

    if (pageCount > 500) {
        return 'Serious Reading'
    }
    if (pageCount > 200) {
        return 'Decent Reading'
    }
    return 'Light Reading'
}

function setPriceColor(price) {

    if (price > 150) {

        return 'price-expensive'
    } else if (price < 20) {

        return 'price-cheap'
    }
}

function _setNextPrevBookId(book) {

    return query().then((books) => {
        const bookIdx = books.findIndex((currentBook) => currentBook.id === book.id)
        const nextBook = books[bookIdx + 1] ? books[bookIdx + 1] : books[0]
        const preBook = books[bookIdx - 1] ? books[bookIdx - 1] : books[books.length - 1]
        book.nextBookId = nextBook.id
        book.preBookId = preBook.id
        return book
    })
}

function _createBooks() {

    let books = utilService.loadFromStorage(BOOK_KEY)

    if (!books || !books.length) {
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
                description: utilService.makeLorem(120),
                pageCount: utilService.getRandomIntInclusive(20, 600),
                categories: [ctgs[utilService.getRandomIntInclusive(0, ctgs.length - 1)]],
                thumbnail: `http://ca.org/books-photos/${i + 1}.jpg`,
                language: "en",
                listPrice: {
                    amount: utilService.getRandomIntInclusive(80, 500),
                    currencyCode: "EUR", isOnSale: Math.random() > 0.7
                }
            }

            books.push(book)
        }
        utilService.saveToStorage(BOOK_KEY, books)
    }
}