//components
import FirstComponent from './components/FirstComponent';
//importação de FirstComponent para o arquivo JS FirstComponent
import TemplateExpressions from './components/TemplateExpressions';
//styles / CSS
import './App.css';
import MyComponent from './components/MyComponent';
import Events from './components/Events';
import Challenge from './components/Challenge';


function App() {
  return (
    <div className="App">
      <h1>Fundamentos React</h1>
      <FirstComponent />
      <TemplateExpressions />
      <MyComponent />
      <Events />
      <Challenge />
    </div>
  );
}

export default App;
