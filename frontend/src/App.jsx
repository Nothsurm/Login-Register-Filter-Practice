import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home'
import SignIn from "./pages/SignIn";
import Header from "./components/Header";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/signin' element={<SignIn/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

