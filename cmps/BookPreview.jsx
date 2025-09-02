

export function BookPreview({ book }) {

    
    return (

        <div className="book-preview">
            <img className="book-image" src= {book.thumbnail}/>
            {book.listPrice.isOnSale && <h2 className="on-sale">On Sale!</h2>} 
            <h1>Title: {book.title}</h1>
            <h1>Author: {book.authors[0]}</h1>
            <span>Published: {book.publishedDate}</span>
            <span>Pages: {book.pageCount}</span>
            <span>Price: {book.listPrice.amount} {book.listPrice.currencyCode}</span>
            <span>Sale: </span>
        </div>
    )
}