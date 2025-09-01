const { Link, NavLink } = ReactRouterDOM


export function NotFound() {

    return (
        <section className="not-found-container">
            <section className="not-found">
                <h2>Ooops... Error <span className="error-num">404</span></h2>
            </section>
            <p>
                Sorry but the page you are looking for does not exist.
            </p>
            <NavLink to="/book">Back</NavLink>
        </section>
    )
}