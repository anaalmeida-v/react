//components
import FirstComponent from './components/FirstComponent';
//importação de FirstComponent para o arquivo JS FirstComponent
import TemplateExpressions from './components/TemplateExpressions';
//styles / CSS
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Fundamentos React</h1>
      <FirstComponent />
      <TemplateExpressions />
    </div>
  );
}

export default App;
