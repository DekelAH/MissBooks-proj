
import { AppHeader } from "./cmps/AppHeader.jsx"
import { Home } from "./cmps/Home.jsx"
import { AboutUs } from "./cmps/AboutUs.jsx"
import { BookIndex } from "./cmps/BookIndex.jsx"
import { NotFound } from "./cmps/NotFound.jsx"
import { BookDetails } from "./cmps/BookDetails.jsx"
import { BookEdit } from "./cmps/BookEdit.jsx"
import { UserMsg } from "./cmps/UserMsg.jsx"
import { GoogleAddBook } from "./cmps/GoogleAddBook.jsx"
import { OurTeam } from "./cmps/OurTeam.jsx"
import { OurGoals } from "./cmps/OurGoals.jsx"

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
                        <Route path="/about-us" element={<AboutUs />}>
                            <Route path="/about-us/our-team" element={<OurTeam />} />
                            <Route path="/about-us/our-goals" element={<OurGoals/>} />
                        </Route>
                        <Route path="/book" element={<BookIndex />}></Route>
                        <Route path="/book/:bookId" element={<BookDetails />}></Route>
                        <Route path="/book/edit" element={<BookEdit />}></Route>
                        <Route path="/book/edit/:bookId" element={<BookEdit />}></Route>
                        <Route path="/google-add" element={<GoogleAddBook />}></Route>
                        <Route path="*" element={<NotFound />}></Route>
                    </Routes>
                </main>
                <UserMsg />
            </section>
        </Router>
    )
}