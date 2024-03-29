import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home'
import SignIn from "./pages/SignIn";
import Header from "./components/Header";
import { Toaster } from "react-hot-toast";
import Products from "./pages/Products";

export default function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
      <Header />
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/signin' element={<SignIn/>}></Route>
        <Route path='/products' element={<Products/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

