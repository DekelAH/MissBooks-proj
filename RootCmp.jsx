
import { AppHeader } from "./cmps/AppHeader.jsx"
import { Home } from "./cmps/Home.jsx"
import { AboutUs } from "./cmps/AboutUs.jsx"
import { BookIndex } from "./cmps/BookIndex.jsx"
import { NotFound } from "./cmps/NotFound.jsx"

const Router = ReactRouterDOM.HashRouter
const { Routes, Route, Navigate } = ReactRouterDOM

export function RootCmp() {


    return (
        <Router>
            <section className="app main-layout">
                <AppHeader />
                <main>
                    <Routes>
                        <Route path="/" element={<Navigate to="/home" />}></Route>
                        <Route path="/home" element={<Home />}></Route>
                        <Route path="/about-us" element={<AboutUs />}></Route>
                        <Route path="/book" element={<BookIndex />}></Route>
                        <Route path="*" element={<NotFound />}></Route>
                    </Routes>
                </main>
            </section>
        </Router>
    )
}