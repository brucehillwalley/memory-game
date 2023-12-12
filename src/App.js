import React, { useState, useEffect } from 'react';
import "./App.css";
import debounce from "lodash/debounce";

function App() {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);

  useEffect(() => {
    const shuffledCards = shuffleCards();
    setCards(shuffledCards);
  }, []);

  const shuffleCards = () => {
    const animals = [
      "cat",
      "dog",
      "lion",
      "tiger",
      "elephant",
      "giraffe",
      "panda",
      "zebra",
    ];
    const doubleAnimals = animals.concat(animals);
    const shuffled = doubleAnimals.sort(() => Math.random() - 0.5);
    return shuffled.map((animal) => ({ id: Math.random(), animal }));
  };

  const handleClick = debounce((card) => {
    if (!matchedCards.includes(card) && flippedCards.length < 2) {
      setFlippedCards([...flippedCards, card]);
    }

    if (flippedCards.length === 2) {
      if (flippedCards[0].animal === flippedCards[1].animal) {
        setMatchedCards([...matchedCards, ...flippedCards]);
        setFlippedCards([]);
      } else {
        setTimeout(() => setFlippedCards([]), 1000);
      }
    }
  }, 500);

  const isCardFlipped = (card) =>
    flippedCards.includes(card) || matchedCards.includes(card);

  return (
    <div className="App">
      <h1 className="text-center display-4 mb-5 mt-5 text-success">
        Memory Game
      </h1>
      <div className="game-board">
        {cards.map((card) => (
          <div
            key={card.id}
            className={`card ${isCardFlipped(card) ? "flipped" : ""}`}
            onClick={() => handleClick(card)}
          >
            {isCardFlipped(card) && (
              <img
                src={`images/${card.animal}.jpeg`}
                alt={card.animal}
                className="img-thumbnail"
              />
            )}
          </div>
        ))}
      </div>
      {matchedCards.length === cards.length && <p>You win!</p>}
    </div>
  );
}

export default App;
