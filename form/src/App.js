import logo from './logo.svg';
import './App.css';
import MyForm from './components/MyForm';

function App() {
  return (
    <div className="App">
      <h2>Forms</h2>
      <MyForm user={{name: "Aninha", email:"aninha@gmail.com"}} />
    </div>
  );
}

export default App;
