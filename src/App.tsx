import React, { useState, useEffect } from "react";
import "./App.css";
import InfoDisplay from "./components/InfoDisplay";

export default function App() {
  const [tomatoes, setTomatoes] = useState(0);
  const [tomatoesNum, setTomatoesNum] = useState(getRandomNumber(10, 1));
  const [carrots, setCarrots] = useState(0);
  const [carrotsNum, setCarrotsNum] = useState(getRandomNumber(30, 10));
  const [lettuce, setLettuce] = useState(0);
  const [lettuceNum, setLettuceNum] = useState(getRandomNumber(50, 30));
  const [eggplant, setEggplant] = useState(0);
  const [eggplantNum, setEggplantNum] = useState(getRandomNumber(110, 70));

  const [days, setDays] = useState(10);
  const [dollars, setDollars] = useState(1000);
  const [highScore, setHighScore] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [message, setMessage] = useState("Welcome to the Farmers Market!");

  let introMessage =
    "You have 10 weekends to make as much money as possible. Enter your initials above and then start your summer! Keep an eye out for messages about price changes.";

  const weekendButton = (
    <button
      style={{ margin: "40px 20px 20px 20px" }}
      className="btn btn-outline-white text-white bg-success custom-button"
      onClick={nextDay}
    >
      Next Weekend - {days} left.
    </button>
  );

  const lastWeekendButton = (
    <button
      style={{ margin: "40px 20px 20px 20px" }}
      className="btn btn-outline-white text-white bg-success custom-button"
      onClick={newGame}
    >
      LAST WEEKEND!
    </button>
  );

  const eventArray = [
    (multiplier) => {
      setTomatoesNum(Math.round(tomatoesNum * multiplier));
      setMessage("Tomatoes have increased in price!");
      console.log(multiplier)
    },
    (multiplier) => {
      setCarrotsNum(Math.round(carrotsNum * multiplier));
      setMessage("Carrots have increased in price!");
    },
    (multiplier) => {
      setLettuceNum(Math.round(lettuceNum * multiplier));
      setMessage("Lettuce prices have been cut!");
    },
    (multiplier) => {
      setEggplantNum(Math.round(eggplantNum * multiplier));
      setMessage("Eggplants have increased in price!");
    },
  ];

  function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function eventFunction(arr) {
    const randomIndex = Math.floor(Math.random() * 4);
    const randomMultiplier = getRandomNumber(2, 4);
    arr[randomIndex](randomMultiplier);
  }

  function sellAllAtEnd() {
    let totalSale = tomatoes * tomatoesNum + carrots * carrotsNum + lettuce * lettuceNum + eggplant * eggplantNum;
    console.log(totalSale + 'total sale' + dollars + 'dollars')
    let newDollars = totalSale + Number(dollars);
    setDollars(newDollars);
    console.log(newDollars + 'new dollars')
    setMessage("Congrats! You ended up with $" + newDollars + " dollars.");
    const userWithHighScore = { user: userInput, score: newDollars };
    setHighScore([...highScore, userWithHighScore]);
  }

  function newGame() {
    setDays(10);
    setDollars(1000);
    setTomatoes(0);
    setCarrots(0);
    setLettuce(0);
    setEggplant(0);
    setMessage("Welcome to the Farmers Market!");
  }

  {/*supposed to reset daily prices BEFORE multiplier effects*/}
  function setDailyPrices() {
    setTomatoesNum(getRandomNumber(1, 10));
    setCarrotsNum(getRandomNumber(30, 10));
    setLettuceNum(getRandomNumber(50, 30));
    setEggplantNum(getRandomNumber(110, 70));
  }
  
  function nextDay() {
    setDailyPrices();
    let newDays = days - 1;
    console.log(newDays);
    if (newDays != 0) {
      eventFunction(eventArray);
      setDays(newDays);
    } else {
      sellAllAtEnd();
    }
  }

  return (
    <>
      <div className="container">
        <div className="">
        <br></br>
          <div className="input-group mb3">
            <span className="input-group-text" id="basic-addon1">
              Enter initials:
            </span>
            <input
              type="text"
              className="form-control w-5"
              aria-describedby="basic-addon1"
              id="initialsInput"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              maxLength={3}
            />
          </div>
        </div>
        <br></br>
        <h1 className="text-center">Farmers Market</h1>

        <div className="container">
          <h2
            style={{ margin: "20px 20px 20px 20px" }}
            className="border-radius justify-content-between align-items-center text-white text-center"
          >
            You have
            <span className="badge-green badge rounded-pill m-1">
              ${dollars}
            </span>
            dollars
          </h2>
          <h5 className="justify-content-between align-items-center text-center">
            {message}
          </h5>
          <h6 className="justify-content-between align-items-center text-center">
            {days === 10 ? introMessage : <br></br>}
          </h6>
          <p></p>
        </div>
        <div className="row">
          <div className="col">
            <InfoDisplay
              quantity={tomatoes}
              name={"Tomatoes"}
              value={9}
              color="red"
              dollars={dollars}
              setItem={setTomatoes}
              setDollars={setDollars}
              veggieNum={tomatoesNum}
            />
            <InfoDisplay
              quantity={carrots}
              name={"Carrots"}
              value={3}
              color="orange"
              dollars={dollars}
              setItem={setCarrots}
              setDollars={setDollars}
              veggieNum={carrotsNum}
            />
          </div>
          <div className="col">
            <InfoDisplay
              quantity={lettuce}
              name={"Lettuce"}
              value={1}
              color="green"
              dollars={dollars}
              setItem={setLettuce}
              setDollars={setDollars}
              veggieNum={lettuceNum}
            />
            <InfoDisplay
              quantity={eggplant}
              name={"Eggplant"}
              value={1}
              color="purple"
              dollars={dollars}
              setItem={setEggplant}
              setDollars={setDollars}
              veggieNum={eggplantNum}
            />
          </div>
        </div>
      </div>
      <div className="container">
        {days === 1 ? lastWeekendButton : weekendButton}
        <h3>High Scores:</h3>
        <ul>
          {highScore.map((score, index) => (
            <li key={index}>{`${score.user} $${score.score}`}</li>
          ))}
        </ul>
      </div>
    </>
  );
}


/*  

    const oddsNum = Math.floor(Math.random() * (3 - 2 + 1)) + 1;

      const oneInThree = Math.floor(Math.random() * 3) === 0;
      if (oneInThree) {
      const randomChild = Math.floor(Math.random() * 2); // 4 children (tomatoes, carrots, lettuce, eggplant)
      
      switch (randomChild) {
      case 0:
      alert("Elon Musk tweeted that carrots cause cancer. Prices are down.");
      setCarrotsNum(carrotsNum / 2);
      break;
      case 1:
      alert("Salmonella outbreak! Lettuce prices have plumeted!");
      setLettuceNum(lettuceNum / oddsNum);
      break;
      default:
      break;
      }
      }
      
      const anotherOneInThree = Math.floor(Math.random() * 3) === 0;
      if (anotherOneInThree) {
      const randomChild = Math.floor(Math.random() * 4); // 4 children (tomatoes, carrots, lettuce, eggplant)
      
      switch (randomChild) {
      case 0:
      alert("Tomatoes price doubled!");
      setTomatoesNum(tomatoesNum * 2);
      break;
      case 1:
      alert("Rabbits invaded the farmers market and at your competetors carrots! Prices increased!");
      setCarrotsNum(carrotsNum * (oddsNum*1.5));
      break;
      case 2:
      alert("Lettuce celebrate, lettuce prices have skyrocketed!");
      setLettuceNum(lettuceNum * (oddsNum*1.5));
      break;
      case 3:
      alert("Eggplant blight! Eggplant prices are egg-stremely high!");
      setEggplantNum(eggplantNum * oddsNum);
      break;
      default:
      break;
      }
      }
      
      const oneInTwo = Math.floor(Math.random() * 2) === 0;
      if (oneInTwo) {
      const randomChild = Math.floor(Math.random() * 4); // 4 children (tomatoes, carrots, lettuce, eggplant)
      
      switch (randomChild) {
      case 0:
      alert("Some of your tomatoes rolled away!");
      setTomatoes(Math.round(tomatoes / 1.3));
      break;
      case 1:
      alert("Rabbits invaded your booth. They ate some of your carrots!");
      setCarrots(Math.round(carrots / 1.2));
      break;
      case 2:
      alert("Some of your lettuce went rotten!");
      setLettuce(Math.round(Math.round(lettuce / 1.1)));
      break;
      case 3:
      alert("Your Eggplant inventory magically doubled! How did that happen?");
      setEggplant(eggplant * 2);
      break;
      default:
      break;
      }
      }
      
      const oneInTen = Math.floor(Math.random() * 10) === 0;
      if (oneInTen) {
      
      const randomChild = Math.floor(Math.random() * 4); // Three possible outcomes
      
      switch (randomChild) {
      case 0:
      alert("👽 UFO Invasion! A UFO just landed at your farmers market!👽 The UFO loves tomatoed and your tomato prices quadrupled");
      setTomatoesNum(tomatoesNum * 4);
      break;
      case 1:
      alert("👽 UFO Invasion! A UFO just landed at your farmers market!👽 The UFO brought advanced technology. All your vegetable prices increased!");
      setTomatoesNum(Math.round(tomatoesNum * 1.6));
      setCarrotsNum(Math.round(carrotsNum * 1.6));
      setLettuceNum(Math.round(lettuceNum * 1.6));
      setEggplantNum(Math.round(eggplantNum * 1.6));
      break;
      case 2:
      alert("👽 UFO Invasion! A UFO just landed at your farmers market!👽 The aliens took a liking to eggplants and prices skyrocketed!");
      setEggplantNum(eggplantNum * 3);
      break;
      case 3:
      alert("👽 UFO Invasion! A UFO just landed at your farmers market!👽 Your carrots have offended the Aliens, they have been destroyed!");
      setCarrots(0);
      break;
      default:
      break;
      }
      }

*/