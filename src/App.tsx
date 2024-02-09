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
  
  const [tomatoColor, setTomatoColor] = useState("primary");
  const [carrotColor, setCarrotColor] = useState("primary");
  const [lettuceColor, setLettuceColor] = useState("primary");
  const [eggplantColor, setEggplantColor] = useState("primary");
  const [tomatoQuantityColor, setTomatoQuantityColor] = useState("primary");
  const [carrotQuantityColor, setCarrotQuantityColor] = useState("primary");
  const [lettuceQuantityColor, setLettuceQuantityColor] = useState("primary");
  const [eggplantQuantityColor, setEggplantQuantityColor] = useState("primary");


  const [days, setDays] = useState(11);
  const [dollars, setDollars] = useState(1000);
  const [highScore, setHighScore] = useState<highScore[]>([]);
  const [userInput, setUserInput] = useState("");
  const [message, setMessage] = useState("Welcome to the Farmers Market!");

  const introMessage = "You have 10 days to make as much money as possible. Buy low, sell high!";

  {/*Arrays of events*/}
  const eventArray = [
    (multiplier: number) => {
      setTomatoesNum(Math.round(tomatoesNum * multiplier));
      setMessage("Tomatoes have increased in price!");
      setTomatoColor("success");
    },
    (multiplier: number) => {
      setCarrotsNum(Math.round(carrotsNum * multiplier));
      setMessage("Carrots have increased in price!");
      setCarrotColor("success");
    },
    (multiplier: number) => {
      setLettuceNum(Math.round(lettuceNum * multiplier));
      setMessage("Lettuce prices have increased!");
      setLettuceColor("success");
    },
    (multiplier: number) => {
      setEggplantNum(Math.round(eggplantNum * multiplier));
      setMessage("Eggplants have increased in price!");
      setEggplantColor("success");
    },
    (multiplier: number) => {
      setEggplantNum(Math.round(eggplantNum / multiplier));
      setMessage("Eggplants have decreased in price!");
      setEggplantColor("danger");
    },
  ];

  const alertArray = [
    () => {
      alert("👽 UFO Invasion! A UFO just landed at the farmers market!👽 The aliens use their tech to double your tomato inventory!");
      setTomatoes((prev) => prev * 2);
      setTomatoQuantityColor("success");
    },
    () => {
      alert("👽 UFO Invasion! A UFO just landed at the farmers market!👽 The aliens brought advanced technology. All your vegetable prices increased!");
      setTomatoesNum(Math.round(tomatoesNum * 1.6));
      setCarrotsNum(Math.round(carrotsNum * 1.6));
      setLettuceNum(Math.round(lettuceNum * 1.6));
      setEggplantNum(Math.round(eggplantNum * 1.6));
      priceColorChanger('success');
    },
    () => {
      alert("👽 UFO Invasion! A UFO just landed at the farmers market!👽 The aliens flooded the market with eggplants and carrots and prices have dropped!");
      setEggplantNum(Math.round(eggplantNum / 3));
      setCarrotsNum(Math.round(carrotsNum / 3));
      setEggplantColor("danger");
      setCarrotColor("danger");
    },
    () => {
      Math.round(eggplant / 1.5) < 1 ? (alert("👽 UFO Invasion! A UFO just landed at the farmers market!👽 Your eggplants have offended the Aliens, they have taken a third"), setEggplant((prev) => Math.round(prev / 1.5))) 
      : alert("👽 UFO Invasion! A UFO just landed at the farmers market!👽 the aliens were angered by the eggplans and all the stall with them have been incinerated! Luckily you didn't have enough.")
      setEggplantQuantityColor("danger");
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

  function priceColorChanger(color: string) {
    setTomatoColor(color);
    setCarrotColor(color);
    setLettuceColor(color);
    setEggplantColor(color); 
  }

  function quantityColorChanger(color: string) {
    setTomatoQuantityColor(color);
    setCarrotQuantityColor(color);
    setLettuceQuantityColor(color);
    setEggplantQuantityColor(color); 
  }

  function normalEvent(arr: any) {
    const oneInFour = getRandomNumber(0, 4);
    const randomMultiplier = getRandomNumber(2, 4);
    arr[oneInFour](randomMultiplier);
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
      quantityColorChanger('primary');
      priceColorChanger('primary');
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
              priceColor={tomatoColor}
              quantityColor={tomatoQuantityColor}
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
              priceColor={carrotColor}
              quantityColor={carrotQuantityColor}
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
              priceColor={lettuceColor}
              quantityColor={lettuceQuantityColor}
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
              priceColor={eggplantColor}
              quantityColor={eggplantQuantityColor}
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