import './App.css';

//1 - config react router
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar';

//pages
import Home from './pages/Home'
import About from './pages/About'
import Product from './pages/Product'
import Info from './pages/Info'
import NotFound from './pages/NotFound'

function App() {
  return (
    <div className="App">
      <h1>React Router</h1>
      <BrowserRouter>
      {/*2 - links com react router*/}
        <Navbar />{/*se repete entre as rotas, mas tem elementos no React Router*/}
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        {/* 6 - nested route */}
        <Route path="/products/:id/info" element={<Info />}></Route>
    
        {/* 4 - rota dinâmica */}
        <Route path="/products/:id" element={<Product />}></Route>{/* linkando produtos a uma rota dinâmica*/}
        
        {/* 7 - no match route */}
        <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App

//elementos fora do routes, estarão sendo exibidos em todas as telas