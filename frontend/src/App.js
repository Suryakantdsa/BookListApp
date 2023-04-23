import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Register from './Component/Register';
import Login from './Component/Login';
import AddnewBook from './Component/AddnewBook';
import EditBook from './Component/EditBook';
import BookInfo from './Component/BookInfo';
import Home from './Component/Home';
import PrivateComponent from './Component/PrivateComponent';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<PrivateComponent />}>
            <Route path='/addbook' element={<AddnewBook />} />
            <Route path='/editbook/:id' element={<EditBook />} />
            <Route path='/home/:id' element={<BookInfo />} />
            <Route path='/home' element={<Home />} />
          </Route>
          <Route path='/signup' element={<Register />} />
          <Route path='/' element={<Register />} />
          <Route path='/signin' element={<Login />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
