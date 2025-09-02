const { useState, useEffect } = React


export function BookFilter({ filterBy, onSetFilterBy }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    const [priceRangeValue, setPriceRangeValue] = useState(0)
    const [isChecked, setIsChecked] = useState(false)

    const { txt, price, pageCount, publishedDate, onSale } = filterByToEdit

    useEffect(() => {

        setFilterByToEdit(filterByToEdit)
    }, [filterByToEdit])


    function handleChange({ target }) {

        let { value, name: field } = target

        switch (target.type) {
            case 'range':
                value = +target.value
                setPriceRangeValue(value)
                break;
            case 'text':
                value = target.value
                break;
            case 'number':
                value = +target.value
                break;
            case 'checkbox':

                setIsChecked(target.checked)
                value = target.checked
                break;
            default:
                break;
        }

        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }

    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilterBy(filterByToEdit)
    }


    return (

        <section className="book-filter">
            <h2>Filter our books</h2>
            <form className="filter-form" onSubmit={onSubmitFilter}>
                <label htmlFor="txt">Title</label>
                <input onChange={handleChange} type="text" value={txt} name="txt" id="txt" /> |

                <label htmlFor="price">Price</label>
                <input onChange={handleChange} type="range" value={price} min="0" max="500" name="price" id="price" />
                <output>{priceRangeValue}</output> |

                <label htmlFor="pageCount">Pages</label>
                <input onChange={handleChange} type="number" value={pageCount} min="0" name="pageCount" id="pageCount" />|

                <label htmlFor="publishedDate">Published</label>
                <input onChange={handleChange} type="number" value={publishedDate} min="1940" name="publishedDate" id="publishedDate" />|

                <label htmlFor="onSale">On Sale</label>
                <input onChange={handleChange} checked={isChecked} type="checkbox" value={onSale} name="onSale" id="onSale" />

                <button className="filter-btn" type="submit">Filter</button>
            </form>
        </section>

    )
}