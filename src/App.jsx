import BookListContainer from "./components/BookListContainer"
import BookDetailContainer from "./components/BookDetailContainer"
import NavBar from "./components/NavBar"
import SignUp from "./components/SignUp"
import SignIn from "./components/SignIn"
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom"


function App() {

  return (
    <BrowserRouter>
    <NavBar/>
      <Routes>
        <Route path="/" element={<BookListContainer />} />
        <Route path="/books/:id" element={<BookDetailContainer />} />
        <Route path="/login" element={<SignIn/>} />
        <Route path="/register" element={<SignUp/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
