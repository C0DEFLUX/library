import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {Add, AdminLogin, Book, Dashboard, Edit, Home, Login, MyBooks, PageNotFound} from "./components";
import './index.css';


function App () {

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/admin" element={<AdminLogin/>}/>
                <Route path="/book/:id" element={<Book/>}/>
                <Route path="/dashboard" element={<Dashboard/>}/>
                <Route path="/dashboard/add" element={<Add/>} />
                <Route path="/dashboard/edit/:id" element={<Edit/>} />
                <Route path="/my-books/:id" element={<MyBooks/>}/>
            </Routes>
        </Router>
    )
}

export default App