import React, { useState } from "react";

export default function InfoDisplay(props: any) {

  const [input, setInput] = useState('');

{/*Button Functions*/}
function buy() {
  let numInput = Number(input);
  let cost = numInput * props.veggieNum;
  let newAmount = props.dollars - cost;
  {newAmount < 0 ? (alert(`You don't have that much money.`),setInput('')):(purchase(cost), props.setItem((prev: number) => prev + Number(input)), setInput(''))}
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
  props.setDollars((prev: number) => prev + totalSale)
  props.setItem(0)
  setInput('')
}

{/*Updates dollars and quantities*/}
function purchase(cost: number) {
  props.setDollars((prev: number) => prev - cost);
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
              Number(props.quantity) < 1
                ? "badge bg-warning badge-pill text-black m-1" //add quantity color here
                : "badge bg-" + props.quantityColor + " badge-pill text-white m-1"
            }
          >
            You Have: {props.quantity}
          </span>
          <span
            className={'badge bg-' + props.priceColor + ' badge-pill text-black m-1'}>
            Todays Value: ${props.veggieNum}
          </span>
        </li>
        <div style={{ textAlign: 'center' }} className="text-under-input" id="basic-addon4">You can afford {Math.floor(props.dollars/props.veggieNum)}</div>
      </ul>
      <form onChange={handleFormSubmit} onSubmit={handleFormSubmit}>
        <div className="row p-1">
            <div className="col">
            <input id='input' className='form-control no-arrows h-10 input-height' type='number' value={input} placeholder="Qty" onChange={numChecker}></input>
            </div>
            <div className="col">
            <button className="btn btn-sm btn-outline-success" onClick={buy}>Buy Qty</button>
            </div>
            <div className='col'>
            <button className="btn btn-sm btn-outline-danger" onClick={sell}>Sell Qty</button>
            </div>
            <div className="col">
            <button className="btn btn-sm btn-outline-warning" onClick={buyAll}>Buy All</button>
            </div>
            <div className='col'>
            <button className="btn btn-sm btn-outline-warning" onClick={sellAll}>Sell All</button>
            </div>
        </div>
      </form>
    </>
  );
}