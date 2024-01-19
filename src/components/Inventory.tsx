import React, { useState } from "react";

export default function Inventory(props: any) {

  const random = Math.round(Math.random()*10);

    const [input, setInput] = useState('');
{/*makes sure only numbers are input (still allows e for some reason)*/}
    const numChecker = (e: any) => {
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
           setInput(e.target.value)
        }
     }

function checkMoney(input: number) {
    let newAmount = props.dollars - input;
    if (newAmount < 0) {
      alert(`You don't have that much money.`)
    } else { setDollars(newAmount);
  }
}

     function updateDollars() {
    let money = random * Number(input)
     money<=props.dollars
     ? alert('You cant afford that.') 
   : props.purchase(money);
     }
{/*update inventory*/}
     const purchase = (e: React.FormEvent) => {
      props.buy(input);
      console.log('buy '+input);
      setInput('')
      updateDollars()
  }

  const sellButton = (e: React.FormEvent) => {
    props.sell(input);
    console.log('sell '+input);
    setInput('')
}

{/*prevent auto refresh*/}
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
}
  
  return (
    <>
      <ul className="list-group">
        <li style={{backgroundColor: props.color}}
          className={
           " list-group-item d-flex justify-content-between align-items-center text-white mt-1 mb-1 ml-1 mr-1"
          }
        >
          {props.name}
          <span
            className={
              Number(props.quantity) < 5
                ? "badge bg-warning badge-pill text-black m-1"
                : "badge bg-primary badge-pill text-white m-1"
            }
          >
            You Have: {props.quantity}
          </span>
          <span
            className="badge bg-success badge-pill text-white m-1">
            Todays Value: ${random}
          </span>
        </li>
      </ul>
      <form onSubmit={handleFormSubmit}>
        <div className="row">
            <div className="col">
            <input id='input' className='form-control' type='number' value={input} onChange={numChecker}></input>
            </div>
            <div className="col">
            <button className="btn btn-outline-success" onClick={purchase}>Buy</button>
            </div>
            <div className='col'>
            <button className="btn btn-outline-danger" onClick={sellButton}>Sell</button>
            </div>
        </div>
      </form>
      
      
    </>
  );
}


/*
const random = Math.round(Math.random()*10);

      */