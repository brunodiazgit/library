import Hero from "./components/Hero"
import BookListContainer from "./components/BookListContainer"
import BookDetailContainer from "./components/BookDetailContainer"
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom"


function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/home" element={<BookListContainer />} />
        <Route path="/book" element={<BookDetailContainer />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
