import './App.css'

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { onAuthStateChanged } from 'firebase/auth' //mapeia se autenticação do usuário foi feita com sucesso

//hooks
import { useState, useEffect } from 'react'
import { useAuthentication } from './hooks/useAuthentication'

//context
import { AuthProvider } from './context/AuthContext'

//pages
import Home from './pages/Home/Home'
import About from './pages/About/About'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import CreatePost from './pages/CreatePost/CreatePost'
import Dashboard from './pages/Dashboard/Dashboard'

//components
import Navbar from './components/Navbar'
import Footer from './components/Footer'

function App() {

  const [user, setUser] = useState(undefined)//undefined pois nao há usuário na seção inicial, é indefinido
  const { auth } = useAuthentication()

  const loadingUser = user == undefined

  useEffect(() => {

    onAuthStateChanged(auth, (user) => {//auth - basicamente uma classe que possui funcionalidades para gerenciar autenticação
    //user foi colocado, pois é o que eu quero passar na variável setUser
      setUser(user)
    })
  }, [auth])//smp que mudar a autenticação, o useEffect será executado
  //aula logout - auth muda, executa função novamente e entrega novo user, contexto compartilha usuário que
  //não existe mais e automaticamente não temos mais o usuário

  if (loadingUser) {
    return <p>Carregando...</p>
  }

  return (
    <div className="App">
      <AuthProvider value={{ user }}>{/* com o value-user aq, agr é possível acessar o usuário em todos
      os locais */}
        <BrowserRouter>
          <Navbar />
          <div className='container'>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={!user ? <Login />  : <Navigate to="/" />} />
              <Route path="/register" element={!user ? <Register />  : <Navigate to="/login" />} />
              <Route path="/posts/create" element={user ? <CreatePost /> : <Navigate to="/" />} />
              <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" /> } />
              {/* verificando se há um usuário cadastrado ou não, para assim encaminhar para a página que é necessária */}
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </div>
  )
}

export default App;
