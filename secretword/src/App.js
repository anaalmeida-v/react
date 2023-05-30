//CSS
import './App.css';

//React
import { useCallback, useEffect, useState } from 'react';

//data
import { wordsList } from "./data/word"

//components
import StartScreen from './components/StartScreen';
import Game from './components/Game';
import GameOver from './components/GameOver';

const stages = [
  { id: 1, name: "start" },
  { id: 2, name: "game" },
  { id: 3, name: "end" }
]

function App() {

  const [gameStage, setGameStage] = useState(stages[0].name)//estágio inicial
  const [words] = useState(wordsList)

  const [pickedWord, setPickedWord] = useState("")
  const [pickedCategory, setPickedCategory] = useState("")
  const [letters, setLetters] = useState([])

  const pickWordAndCategory = () => {
    //pick a random category 
    const categories = Object.keys(words)
    {/* categorias são as chaves(keys) dos objetos */ }
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)]
    {/* escolhendo um índice aleatório baseado no método random vezes o número de chaves
    que existem num determinado objeto // o número aleatório recebido será de acordo com o número de categorias que eu tenho // length contará os elementos do obj // math.floor - não recebe número quebrado*/}
    console.log(category)

    //pick a random word
    const word = words[category][Math.floor(Math.random() * words[category].length)]

    console.log(word)

    return { word, category }
  }

  //starts the secret word game
  const startGame = () => {
    //pick word and pick category
    const { word, category } = pickWordAndCategory()

    //create an array of letters 
    let wordLetters = word.split("")
    {/* separa as letras da palavra */}

    console.log(word, category)
    console.log(wordLetters)
    wordLetters = wordLetters.map((l) => l.toLowerCase());
    {/* fará que independente da palavra, ela será normalizada, não tendo que ter obrigatóriamente
    uma letra maiúscula na frente*/}

    //fill states
    setPickedWord(word)
    setPickedCategory(category)
    setLetters(letters)

    setGameStage(stages[1].name)
  }

  //process the letter input
  const verifyLetter = () => {
    setGameStage(stages[2].name)
  }

  //restarts the game
  const retry = () => {
    setGameStage(stages[0].name)
  }

  return (
    <div className="App">
      {gameStage === "start" && <StartScreen startGame={startGame} />}
      {gameStage === "game" && <Game verifyLetter={verifyLetter} />}
      {gameStage === "end" && <GameOver retry={retry} />}
    </div>
  );
}

export default App;
