import './App.css';

//1 - config react router
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar';
import SearchForm from './components/SearchForm';

//pages
import Home from './pages/Home'
import About from './pages/About'
import Product from './pages/Product'
import Info from './pages/Info'
import NotFound from './pages/NotFound'
import Search from './pages/Search'

function App() {
  return (
    <div className="App">
      <h1>React Router</h1>
      <BrowserRouter>
      {/*2 - links com react router*/}
        <Navbar />{/*se repete entre as rotas, mas tem elementos no React Router*/}
        {/* 9 - search */}
        <SearchForm />
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        {/* 6 - nested route */}
        <Route path="/products/:id/info" element={<Info />} />
        {/* 4 - rota dinâmica */}
        <Route path="/products/:id" element={<Product />} />{/* linkando produtos a uma rota dinâmica*/}
        {/* 9 - search */}
        <Route path="/search" element={<Search />}></Route>
        {/* redirect */}
        <Route path='/company' element={<Navigate to="/about"/>} />
        {/* 7 - no match route */}
        <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App

//elementos fora do routes, estarão sendo exibidos em todas as telas