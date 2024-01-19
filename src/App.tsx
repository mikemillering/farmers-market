import React, { useState } from "react";
import "./App.css";
import InfoDisplay from "./components/InfoDisplay";

export default function App() {
  const randomNum = Math.floor(Math.random() * (10 - 1 + 1)) + 1;
  const randTomato = Math.floor(Math.random() * (10 - 1 + 1)) + 1;
  const randCarrot = Math.floor(Math.random() * (30 - 10 + 1)) + 10;
  const randLettuce = Math.floor(Math.random() * (50 - 30 + 1)) + 30;
  const randEggplant = Math.floor(Math.random() * (110 - 70 + 1)) + 70;

  const [random, setRandom] = useState(randomNum);
  const [dollars, setDollars] = useState(100);
  const [days, setDays] = useState(10);
  const [tomatoes, setTomatoes] = useState(0);
  const [tomatoesNum, setTomatoesNum] = useState(randTomato);
  const [carrots, setCarrots] = useState(0);
  const [carrotsNum, setCarrotsNum] = useState(randCarrot);
  const [lettuce, setLettuce] = useState(0);
  const [lettuceNum, setLettuceNum] = useState(randLettuce);
  const [eggplant, setEggplant] = useState(0);
  const [eggplantNum, setEggplantNum] = useState(randEggplant);
  const weekendButton = (
    <button
      style={{ margin: '40px 20px 20px 20px' }}
      className="btn btn-outline-white text-white bg-success custom-button"
      onClick={nextDay}
    >
      Next Weekend - {days} left.
    </button>
  );
  const lastWeekendButton = (
    <button
      style={{ margin: '40px 20px 20px 20px' }}
      className="btn btn-outline-white text-white bg-success custom-button"
      onClick={nextDay}
    >
      LAST WEEKEND! Make your final sales.
    </button>
  );

  function nextDay() {
    setTomatoesNum(randTomato);
    setCarrotsNum(randCarrot);
    setLettuceNum(randLettuce);
    setEggplantNum(randEggplant);
    setRandom(randomNum);
  
    // Generate a random number to determine if one child's veggie should be doubled
    const shouldDouble = Math.floor(Math.random() * 3) === 0;
  
    // Double the veggieNum of a randomly chosen child
    if (shouldDouble) {
      const randomChild = Math.floor(Math.random() * 4); // 4 children (tomatoes, carrots, lettuce, eggplant)
  
      switch (randomChild) {
        case 0:
          setTomatoesNum(tomatoesNum * 2);
          alert("Tomatoes price doubled!");
          break;
        case 1:
          setCarrotsNum(carrotsNum * 2);
          alert("Rabbits invaded the farmers market and eaten many carrots! Prices increased!");
          break;
        case 2:
          setLettuceNum(lettuceNum * 2);
          alert("Lettuce celebrate, lettuce prices have skyrocketed!");
          break;
        case 3:
          setEggplantNum(eggplantNum * 2);
          alert("");
          break;
        default:
          break;
      }
    }
  
    let newDays = days - 1;
  
    if (newDays === 0) {
      alert("Congrats! You ended up with $" + dollars + " dollars.");
      setDays(10);
      setDollars(100);
    } else {
      setDays(newDays);
    }
  }
  return (
    <>
      <div className="container">
        <h1 className="text-center">Farmers Market</h1>
        
        <div className="container">
          <h2 
          style={{ margin: '20px 20px 20px 20px' }}
          className="border-radius justify-content-between align-items-center text-white text-center">
            You have
            <span className="badge-green badge rounded-pill m-1">
              ${dollars}
            </span>
            dollars
          </h2>
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
              random={random}
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
      </div>
    </>
  );
}
