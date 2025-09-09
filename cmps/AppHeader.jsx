const { Link, NavLink } = ReactRouterDOM

export function AppHeader() {


    return (
        <header className="app-header full main-layout">
            <section className="header-container">
                <h1>Miss Books</h1>
                <nav>
                    <NavLink to="/home">Home</NavLink> |
                    <NavLink to="/book">Books</NavLink> |
                    <NavLink to="/google-add">Google Add Book</NavLink> |
                    <NavLink to="/about-us">About Us</NavLink> 
                </nav>
            </section>
        </header>
    )
}
