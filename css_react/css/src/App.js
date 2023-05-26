import './App.css';
import MyComponent from './components/MyComponent';
import {useState} from "react";

function App() {
  const n = 15
  const [name] = useState("Aninha")

  return (
    <div className="App">
      {/* CSS Global */}
      <h1> React com CSS</h1>
      {/* CSS de Componente */}
      <MyComponent />
      <p>Este parágrafo é do App.js</p>
      {/* Inline CSS */}
      <p style={{ color: "blue", padding: "25px", borderTop: "2px solid red" }}>Este elemento foi estilizado de forma inline</p>
      {/* no style acima, a primeira chave aberta serve para adicionar algo dinâmico e a segunda
      serve para adicionar um objeto */}
      {/* CSS Inline Dinâmico */}
      <h2 style={n < 10 ? ({ color: "purple" }) : ({ color: "pink" })}>CSS Dinâmico</h2>
      <h2 style={n > 10 ? ({ color: "purple" }) : ({ color: "pink" })}>CSS Dinâmico</h2>

      <h2 style={
        name == "Aninha"
          ? { color: "green", backgroundColor: "#000" }
          : null
      }
      >
        Teste nome</h2>
    </div>
  );
}

export default App;
