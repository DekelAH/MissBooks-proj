
import { AppHeader } from "./cmps/AppHeader.jsx"
import { Home } from "./cmps/Home.jsx"
import { AboutUs } from "./cmps/AboutUs.jsx"
import { BookIndex } from "./cmps/BookIndex.jsx"

const { useState } = React

export function RootCmp() {

    const [page, setPage] = useState('home')

    return (
        <section className="app main-layout">
            <AppHeader page={page} onSetPage={setPage} />
            <main>
                {page === 'home' && <Home />}
                {page === 'about-us' && <AboutUs />}
                {page === 'books' && <BookIndex />}
            </main>
        </section>
    )
}