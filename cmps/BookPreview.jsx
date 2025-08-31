

export function BookPreview({ book }) {

    return (

        <div className="book-preview">
            <h1>{book.title}</h1>
            <h2>{book.subtitle}</h2>
            <h2>{book.authors[0]}</h2>
            <span>{book.publishedDate}</span>
            <span>{book.pageCount}</span>
            <span>{book.listPrice.amount}</span>
            <span>{book.listPrice.isOnSale}</span>
        </div>
    )
}