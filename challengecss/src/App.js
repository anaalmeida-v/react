import './App.css';
import DetalhesCarros from './components/DetalhesCarros'

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
          <DetalhesCarros
            key={cars.id}
            marca={cars.marca}
            anoVeiculo={cars.anoVeiculo}
            cor={cars.cor} />
        ))}
      </div>
  );
}

export default App;
