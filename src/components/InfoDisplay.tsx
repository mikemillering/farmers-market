import React, { useState } from "react";

export default function InfoDisplay(props: any) {

  const [input, setInput] = useState('');

{/*Button Functions*/}
function buy() {
  let numInput = Number(input);
  let cost = numInput * props.veggieNum;
  let newAmount = props.dollars - cost;
  {newAmount < 0 ? (alert(`You don't have that much money.`),setInput('')):(purchase(cost), setInput(''))}
}

function buyAll() {
  let max = Math.floor(props.dollars/props.veggieNum);
  let cost = max * props.veggieNum;
  {max === 0 ? (alert(`You don't have enough money to buy any.`),setInput('')):(purchase(cost), props.setItem(max + props.quantity), setInput(''))}
}

function sell() {
  let newNum = Number(props.quantity) - Number(input);
  let newDollars = (Number(input) * props.veggieNum) + props.dollars;
  newNum >= 0 ? (props.setItem(newNum), props.setDollars(newDollars)) : alert('You have ' + props.quantity +' '+ props.name);
  setInput('')
}

function sellAll() {
  let totalSale = (props.quantity*props.veggieNum);
  let newDollars =  totalSale + Number(props.dollars);
  props.setDollars(newDollars)
  props.setItem(0)
  setInput('')
}

{/*Updates dollars and quantities*/}
function purchase(cost: number) {
  let newBalance = props.dollars - cost
  props.setDollars(newBalance)
  let updatedNum = Number(input) + Number(props.quantity);
  props.setItem(updatedNum)
}

{/*prevent auto refresh*/}
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
}

{/*make sure only numbers are input (still allows e for some reason)*/}
const numChecker = (e: any) => {
  const re = /^[0-9\b]+$/;
  if (e.target.value === '' || re.test(e.target.value)) {
     setInput(e.target.value)
  }
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
            Todays Value: ${props.veggieNum}
          </span>
        </li>
      </ul>
      <form onChange={handleFormSubmit} onSubmit={handleFormSubmit}>
        <div className="row">
            <div className="col">
            <input id='input' className='form-control no-arrows' type='number' value={input} onChange={numChecker}></input>
            <div className="text-under-input" id="basic-addon4">You can afford {Math.floor(props.dollars/props.veggieNum)}</div>
            </div>
            <div className="col">
            <button className="btn btn-outline-success" onClick={buy}>Buy</button>
            </div>
            <div className='col'>
            <button className="btn btn-outline-danger" onClick={sell}>Sell</button>
            </div>
            <div className="col">
            <button className="btn btn-outline-warning" onClick={buyAll}>Buy All</button>
            </div>
            <div className='col'>
            <button className="btn btn-outline-warning" onClick={sellAll}>Sell All</button>
            </div>
        </div>
      </form>
    </>
  );
}