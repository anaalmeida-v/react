import "./App.css";

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { HookUseContext } from "./components/HookUseContext";

//pages
import Home from "./pages/Home";
import About from "./pages/About";

function App() {
  return (
    <div className="App">
      <HookUseContext>{/*envolver tudo facilita na hora consumir esse contexto*/}
        <h1>React Hooks</h1>
        <BrowserRouter>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/about" element={<About />}></Route>
          </Routes>
        </BrowserRouter>
      </HookUseContext>
    </div>
  );
}

export default App;
