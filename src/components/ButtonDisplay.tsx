import React from 'react';

export default function ButtonDisplay(props: any) {
    let gameButton = <button>hello</button>;
{props.days === 1 ?
    gameButton = <div className='container'>
      <button
    style={{ margin: "40px 20px 20px 20px", width: "200px", height: "70px"}}
    
    className="btn btn-outline-white text-white bg-warning custom-button"
    onClick={props.sellAllAtEnd}
    >
    Last Weekend!
  </button> 
  </div>
: props.days === 11 || props.days === 0 ?
  gameButton = 
  <div className='container'>
  <button
  style={{ margin: "40px 20px 20px 20px",  width: "200px", height: "70px"}}
        className="btn btn-outline-white text-white bg-danger custom-button"
        onClick={props.newGame}
      >
        New Game
  </button> 
  </div>
:
  gameButton = 
  <div className='container'>
  <button
  style={{ margin: "40px 20px 20px 20px",  width: "200px", height: "70px"}}
  
  className="btn btn-outline-white text-white bg-success custom-button"
  onClick={props.nextDay}
  >
  Next Weekend - {props.days} left.
  </button>
  </div>

return (
    <>
    {gameButton}
    </>
)
  }
}