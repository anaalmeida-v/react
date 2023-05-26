import detalhesCarros from './components/detalhesCarros';
import styles from'./App.css';

function App() {
  const detailscars = [
    {id: 1, marca: "Fiat", anoVeiculo: 2020, cor: "Vermelho"},
    {id: 2, marca: "HYUNDAY", anoVeiculo: 2017, cor: "Prata"},
    {id: 3, marca: "Renault", anoVeiculo: 2023, cor: "Branco"},
  ]
  return (
    <div className="App">
        <h2 className='app'>Challenge CSS</h2>
        {detailscars.map((cars) => (
          <detalhesCarros
            cars={cars} />
        ))}
      </div>
  );
}

export default App;
