//CSS
import './App.css'

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

const guessesQty = 3

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordsList);

  const [pickedWord, setPickedWord] = useState("");
  const [pickedCategory, setPickedCategory] = useState("");
  const [letters, setLetters] = useState([]);

  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [guesses, setGuesses] = useState(3);
  const [score, setScore] = useState(0);

  const pickWordAndCategory = useCallback(() => {
    //pick a random category 
    const categories = Object.keys(words)/* categorias são as chaves(keys) dos objetos */
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)]
    /* escolhendo um índice aleatório baseado no método random vezes o número de chaves
    que existem num determinado objeto // o número aleatório recebido será de acordo com o número de categorias que eu tenho // length contará os elementos do obj // math.floor - não recebe número quebrado*/

    //pick a random word
    const word = words[category][Math.floor(Math.random() * words[category].length)]

    return { category, word }
  }, [words])

  //starts the secret word game
  const startGame = useCallback(() => {
    //clear all letters
    clearLetterStates()

    //pick word and pick category
    const { category, word } = pickWordAndCategory()

    //create an array of letters 
    let wordLetters = word.split("")
    /* separa as letras da palavra */

    wordLetters = wordLetters.map((l) => l.toLowerCase());
    /* fará que independente da palavra, ela será normalizada, não tendo que ter obrigatóriamente
    uma letra maiúscula na frente*/

    //fill states
    setPickedWord(word)
    setPickedCategory(category)
    setLetters(wordLetters)

    setGameStage(stages[1].name)
  }, [pickWordAndCategory])

  //process the letter input
  const verifyLetter = (letter) => {
    const normalizedLetter = letter.toLowerCase()

    //validação para visualizar se letra já foi utilizada
    if (guessedLetters.includes(normalizedLetter) ||
      wrongLetters.includes(normalizedLetter)
    ) {
      return
    }
    //push guessed letter or remove a guess
    if (letters.includes(normalizedLetter)) {
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        letter
      ])
    } else {
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters,
        normalizedLetter,
      ])

      setGuesses((actualGuesses) => actualGuesses - 1)
    }

    //adicionando letras corretas e incorretas no console
  }

  //restarts the game
  const retry = () => {
    setScore(0)//reiniciando com pontuação 0
    setGuesses(guessesQty)//e tentativas 3

    setGameStage(stages[0].name)
  }

  const clearLetterStates = () => {
    setGuessedLetters([])
    setWrongLetters([])
  }

  useEffect(() => {
    if (guesses === 0) {
      //reset all states 
      clearLetterStates()//limpando states do jogo

      setGameStage(stages[2].name)//quando não há mais tentativas é encaminhado a tela de game over
    }
  }, [guesses])

  //check win condition
  useEffect(() => {

    const uniqueLetters = [...new Set(letters)]//array de letras unicas, set só deixa itens unicos em um array

    //win condition
    if (guessedLetters.length === uniqueLetters && gameStage === stages[1].name) {
      //quando a qtd desses array's forem iguais, a palavra será adivinhada
      //add score
      setScore((actualScore) => (actualScore += 100))//implementar pontuação no jogo

      //restart game with me word
      startGame()//condição de coomeçar o jogo
    }

  }, [guessedLetters, letters, startGame])

  return (
    <div className="App">
      {gameStage === "start" && <StartScreen startGame={startGame} />}
      {gameStage === "game" &&(
        <Game
          verifyLetter={verifyLetter}
          pickedWord={pickedWord}//palavra escolhida
          pickedCategory={pickedCategory}//categoria escolhida
          letters={letters}//letras
          guessedLetters={guessedLetters}//letras adivinhadas
          wrongLetters={wrongLetters}//letras erradas
          guesses={guesses}//palpites
          score={score}//pontuação
        />)}
      {gameStage === "end" && <GameOver retry={retry} score={score} />}
    </div>
  );
}

export default App;
