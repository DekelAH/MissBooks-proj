const { useState, useEffect } = React


export function BookFilter({ filterBy, onSetFilterBy }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    const [rangeValue, setRangeValue] = useState(0)

    const { txt, price } = filterByToEdit

    useEffect(() => {

        setFilterByToEdit(filterByToEdit)
    }, [filterByToEdit])


    function handleChange({ target }) {

        let { value, name: field } = target

        switch (target.type) {
            case 'range':
                value = +target.value
                setRangeValue(value)
                break;
            case 'text':
                value = target.value
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
                <input onChange={handleChange} type="text" value={txt} name="txt" id="txt" />

                <label htmlFor="price">Price</label>
                <input onChange={handleChange} type="range" value={price} min="0" max="500" name="price" id="price"/>
                <output>{rangeValue}</output>

                <button type="submit">Filter</button>
            </form>
        </section>

    )
}