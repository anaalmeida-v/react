import { useState } from 'react';
import './App.css';
import City from './assets/city.jpg'
import CarDetails from './components/CarDetails'
import ConditionalRender from './components/ConditionalRender';
import ListRender from './components/ListRender';
import ManageData from './components/ManageData';
import ShowUserName from './components/ShowUserName';

function App() {
  const name = "Joaquim"
  const [userName] = useState("Maria")

  return (
    <div className="App">
      <h1>Avançando em React</h1>
      {/*Imagem em public*/}
      <div>
        <img src="/img1.jpg" alt="Paisagem" />
      </div>
        {/*Imagem em assets*/}
      <div>
        <img src={City} alt="Cidade" />
      </div>
      <ManageData />
      <ListRender />
      <ConditionalRender />
      {/*props*/}
      <ShowUserName name={userName}/>
      {/*no exemplo acima o component ShowUserName, tem acesso a uma prop chamada name com o 
      valor de "Matheus*/}
      {/*destructuring*/}
      <CarDetails brand="VW" km={100000} color="Azul" newCar={false} />
      {/* reaproveitando */}
      <CarDetails brand="Ford" color="Vermelha" hm={0} newCar={true} />
      <CarDetails brand="Fiat" color="Branco" hm={4500} newCar={false} />
    </div> 
  );
}

export default App;
