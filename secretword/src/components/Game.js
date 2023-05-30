import './Game.css'

const Game = ({ verifyLetter, pickedWord, pickedCategory, letters, guessedLetters, wrongLetters, guesses, score }) => {
  return (
    <div className='game'>
      <p className='points'>
        <span>Pontuação: 000</span>
      </p>
      <h1>Adivinhe a palavra:</h1>
      <h3 className='tip'>Dica sobre a palavra: <span>{pickedCategory}</span></h3>
      <p>Você ainda tem {guesses} tentativas(s).</p>
      <div className="wordContainer">
        {letters.map((letter, i) => (
          guessedLetters.includes(letter)/*se a letra já foi adivinhada*/
            ? (<span key={i} className='letter'>{letter}</span>//retornar letra
            ) : (
              <span key={i} className='blankSquare'></span>//se não, retornar quadro branco
            )
        ))}
      </div>
      <div className="letterContainer">
        <p>Tente adivinhar uma letra da palavra:</p>
        <form>
          <input type="text" name='letter' maxLength="1" required />
          <button>Jogar!</button>
        </form>
      </div>
      <div className="wondLettersContainer">
        <p>Letras já utilizadas:</p>
        {wrongLetters.map((letter, i) => (
          <span key={i}>{letter}, </span>
        ))}
      </div>
    </div>
  )
}

export default Game