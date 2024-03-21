import "./App.css";
import pattern from "./assets/pattern-divider-desktop.svg";
import dice from "./assets/icon-dice.svg";
import { useEffect, useState } from "react";

function App() {
  const [theData, setTheData] = useState();
  const [text, setText] = useState("");
  const [clicked, setClicked] = useState(1);
  const [randomNumber, setRandomNumber] = useState("");
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("https://type.fit/api/quotes");
        const jsonData = await response.json();
        setTheData(jsonData);
      } catch {
        console.log("something did not work");
      }
    }
    fetchData();
  }, []);
  async function handleQuotes(data) {
    setClicked(clicked + 1);
    const number = Math.floor(Math.random() * data.length);
    console.log(data);
    setRandomNumber(number);
    setText(data[number]);
    const dice = document.querySelector(".dice");
    dice.style.transform = "rotate(360deg)";
    const quote = document.querySelector(".quote");
    quote.style.opacity = "0";
    if (clicked % 2) {
      quote.style.opacity = "1";
    } else {
    }
  }
  return (
    <div className="App">
      <header className="App-header">
        <div className="container">
          <div className="container-content">
            <p className="subtitle">ADVICE #{randomNumber}</p>
            <p className="quote">“{text.text}”</p>
            <p className="subtitle">{text.author}</p>
            <img src={pattern} alt="a pattern" />
            <div className="dice" onClick={() => handleQuotes(theData)}>
              <img alt="dice" src={dice} />
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
