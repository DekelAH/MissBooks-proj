import { useEffect, useState } from "react"


export function BookEdit({ itemToEdit }) {

    const isEdit = false
    const [book, setBook] = useState({

        authors: [],
        categories: [],
        description: '',
        language: '',
        listPrice: { amount: 0, currencyCode: '', isOnSale: false },
        pageCount: 0,
        publishedDate: 0,
        subtitle: '',
        thumbnail: '',
        title: ''
    })

    useEffect(() => {

        if (itemToEdit) {
            setBook(itemToEdit)
            isEdit = true
        }

    }, [itemToEdit])

    function handleChange({ target }) {
        
        const { name, value } = target
        setBook((prevData) => ({ ...prevData, [name]: value }))
    }

    return (
        <section onSubmit={onSaveBook} className="book-edit">
            <h1>{isEdit ? 'Edit' : 'Add'} Book</h1>
            <form>
                <label htmlFor="authors">Author</label>
                <input onChange={handleChange} type="text" name="authors" id="authors" />

                <label htmlFor="speed">Speed</label>
                <input type="number" name="speed" id="speed" />
                <section className="btns flex">
                    <button>Save</button>
                    <button type="button" className="back-btn" >Back</button>
                </section>
            </form>
        </section>
    )
}