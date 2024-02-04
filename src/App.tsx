import React, { useState, useEffect } from "react";
import "./App.css";
import InfoDisplay from "./components/InfoDisplay";
import vegwallImage from "../Public/vegwall.jpg";
import ButtonDisplay from "./components/ButtonDisplay";


interface highScore {
  user: string;
  score: number;
}

export default function App() {
  const [tomatoes, setTomatoes] = useState(0);
  const [tomatoesNum, setTomatoesNum] = useState(getRandomNumber(10, 1));
  const [carrots, setCarrots] = useState(0);
  const [carrotsNum, setCarrotsNum] = useState(getRandomNumber(30, 10));
  const [lettuce, setLettuce] = useState(0);
  const [lettuceNum, setLettuceNum] = useState(getRandomNumber(50, 30));
  const [eggplant, setEggplant] = useState(0);
  const [eggplantNum, setEggplantNum] = useState(getRandomNumber(110, 70));


  const [days, setDays] = useState(11);
  const [dollars, setDollars] = useState(1000);
  const [highScore, setHighScore] = useState<highScore[]>([]);
  const [userInput, setUserInput] = useState("");
  const [message, setMessage] = useState("Welcome to the Farmers Market!");
  const [introMessage, setIntroMessage] = useState("You have 10 weekends to make as much money as possible. Enter your initials below and then start your summer! Keep an eye out for messages about price changes.");



  {/*Arrays of events*/}
  const eventArray = [
    (multiplier: number) => {
      setTomatoesNum(Math.round(tomatoesNum * multiplier));
      setMessage("Tomatoes have increased in price!");

    },
    (multiplier: number) => {
      setCarrotsNum(Math.round(carrotsNum * multiplier));
      setMessage("Carrots have increased in price!");
    },
    (multiplier: number) => {
      setLettuceNum(Math.round(lettuceNum * multiplier));
      setMessage("Lettuce prices have increased!");
    },
    (multiplier: number) => {
      setEggplantNum(Math.round(eggplantNum * multiplier));
      setMessage("Eggplants have increased in price!");
    },
  ];

  const alertArray = [
    () => {
      alert("👽 UFO Invasion! A UFO just landed at the farmers market!👽 The aliens use their tech to double your tomato inventory!");
      setTomatoes((prev) => prev * 2);
    },
    () => {
      alert("👽 UFO Invasion! A UFO just landed at the farmers market!👽 The aliens brought advanced technology. All your vegetable prices increased!");
      setTomatoesNum(Math.round(tomatoesNum * 1.6));
      setCarrotsNum(Math.round(carrotsNum * 1.6));
      setLettuceNum(Math.round(lettuceNum * 1.6));
      setEggplantNum(Math.round(eggplantNum * 1.6));
    },
    () => {
      alert("👽 UFO Invasion! A UFO just landed at the farmers market!👽 The aliens flooded the market with eggplants and carrots and prices have dropped!");
      setEggplantNum(Math.round(eggplantNum / 3));
      setCarrotsNum(Math.round(carrotsNum / 3));
    },
    () => {
      Math.round(eggplant / 1.5) < 1 ? (alert("👽 UFO Invasion! A UFO just landed at the farmers market!👽 Your eggplants have offended the Aliens, they have taken a third"), setEggplant((prev) => Math.round(prev / 1.5))) 
      : alert("👽 UFO Invasion! A UFO just landed at the farmers market!👽 the aliens were angered by the eggplans and all the stall with them have been incinerated! Luckily you didn't have enough.")
    },
  ];

    {/*FUNCTIONS*/}

    function getRandomNumber(min: number, max: number) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

  function setDailyPrices() {
    setTomatoesNum(getRandomNumber(1, 10));
    setCarrotsNum(getRandomNumber(30, 10));
    setLettuceNum(getRandomNumber(50, 30));
    setEggplantNum(getRandomNumber(110, 70));
  }

  function normalEvent(arr: any) {
    const oneInThree = getRandomNumber(0, 3);
    const randomMultiplier = getRandomNumber(2, 4);
    arr[oneInThree](randomMultiplier);
  }

  function alienEvent(arr: any) {
    const oneInTen = getRandomNumber(0, 10);
    const oneInThree = getRandomNumber(0, 3);
    oneInTen === 5 ? arr[oneInThree](): null;
  }

  function nextDay() {
    console.log(days + ' days')
    setDailyPrices();
    setDays((prevDays) => prevDays - 1);
    if (days !== 1) {
      normalEvent(eventArray);
      alienEvent(alertArray);
    } else {
      sellAllAtEnd();
    }
  }
  
  function sellAllAtEnd() {
    
    if (days === 1){
    console.log("sellAllAtEnd "+days);
    let totalSale =
      tomatoes * tomatoesNum +
      carrots * carrotsNum +
      lettuce * lettuceNum +
      eggplant * eggplantNum;
    let newDollars = totalSale + Number(dollars);
    setDollars(newDollars);
    setMessage("Congrats! You ended up with $" + newDollars + " dollars.");
    const userWithHighScore = { user: userInput, score: newDollars };
    setHighScore([...highScore, userWithHighScore]);
    setTomatoes(0);
    setCarrots(0);
    setLettuce(0);
    setEggplant(0);
    setDays(0);
    } else {
      newGame();
    } 
  }

  function newGame() {
    setDailyPrices();
    setDays(10);
    setDollars(1000);
    setMessage("Welcome to the Farmers Market!");  }

  return (
    <>
    <div className="container-main">
    <div className="row">  
    <div className="col-12">
      <div className="container border-radius">
        {days === 11 ? 
        <h1 className="text-center text-success">Farmers Market</h1>
        : null}
        <div className="container">
          {days === 11 || days === 0 ? null : 
          <h2
            style={{ margin: "20px 20px 20px 20px" }}
            className="border-radius justify-content-between align-items-center text-center"
          >
            You have
            <span className="badge-green badge rounded-pill m-1">
              ${dollars}
            </span>
            dollars
          </h2>
}
          <h5 className="justify-content-between align-items-center text-center">
            {message}
          </h5>
          <h6 className="justify-content-between align-items-center text-center">
            {days === 11 ? introMessage : null}
          </h6>
          {days === 11 ? 
          <div className="input-group p-1">
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
          
          : null }
        </div>
        {days === 11 || days === 0 ? null : 
        <div className="row">
          <div className="col-12">
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
          <div className="col-12">
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
}
      </div>
      <div className="row">
        <div className="col-12 offset-2">
        <ButtonDisplay days={days} nextDay={nextDay} sellAllAtEnd={sellAllAtEnd} newGame={newGame} />
        </div>
        </div>
        {days === 0 ?
        <div className="conatiner border-radius p-3">
        <h3 className="text-center border-radius">High Scores:</h3>
        <ul className="list-group">
          {highScore.map((score, index) => (
            <li className='border-radius list-group-item' key={index}>
              {`${score.user} $${score.score.toLocaleString()}`}
            </li>
          ))}
        </ul>
        </div>
         : null }
         </div>
</div>
      </div>
    </>
  );
}

/*  

    OLD EVENTS CODE

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


    OLD BUTTON VARIABLES


        const weekendButton = (    <button
    style={{ margin: "40px 20px 20px 20px",  width: "200px"}}
    
    className="btn btn-outline-white text-white bg-success custom-button"
    onClick={nextDay}
  >
    Next Weekend - {days} left.
  </button>);
  
  let lastWeekendButton = (    <button
    style={{ margin: "40px 20px 20px 20px",  width: "200px"}}
    
    className="btn btn-outline-white text-white bg-warning custom-button"
    onClick={nextDay}
  >
    Last Weekend!
  </button>);

  let newGameButton = (
    <button
    style={{ margin: "40px 20px 20px 200px",  width: "200px"}}
      className="btn btn-outline-white text-white bg-danger custom-button"
      onClick={newGame}
    >
      New Game
    </button>
  );

*/
