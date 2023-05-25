import { Fragment, useState } from 'react';
import './App.css';
import City from './assets/city.jpg'
import Fragments from './components/Fragments'
import CarDetails from './components/CarDetails'
import ConditionalRender from './components/ConditionalRender';
import ListRender from './components/ListRender';
import ManageData from './components/ManageData';
import ShowUserName from './components/ShowUserName';

function App() {
  //const name = "Joaquim"
  const [userName] = useState("Maria")

  const cars = [
    {id:1, brand:"Ferrari", color:"Amarela", newCar:true, km:0},
    {id:2, brand:"KIA", color:"Branco", newCar:false, km:3443},
    {id:3, brand:"Renault", color:"Azul", newCar:false, km:234},
  ]

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
      {/* lop em array de objetos */}
      {cars.map((car) => (
        <CarDetails 
        brand={car.brand}
        color={car.color}
        km={car.km}
        newCar={car.newCar}/>
      ))}
      {/* fragments */}
      <Fragments propFragment="teste"/>
    </div> 
  );
}

export default App;
