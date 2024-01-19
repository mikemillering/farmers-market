import React from "react";

export default function Stock(props: any) {
  return (
    <>
      <div className="card w-50">
        <h1>Stock</h1>
        <ul className="list-group card-body">
          <li className="list-group-item d-flex justify-content-between align-items-center">
            {props.tomatoes === 1
              ? `You have ${props.tomatoes} tomato.`
              : `You have ${props.tomatoes} tomatoes.`}
            <span className="badge bg-primary rounded-pill">
              {props.tomatoes}
            </span>
          </li>
          <li className="list-group-item">
            {props.apples === 1
              ? `You have ${props.apples} tomato.`
              : `You have ${props.apples} apples.`}
          </li>
          <li className="list-group-item">
            {props.grapes === 1
              ? `You have ${props.grapes} tomato.`
              : `You have ${props.grapes} grapes.`}
          </li>
        </ul>
      </div>
      <br></br>
      <div>
        <h1>Market</h1>
        <ul className="list-group card-body">
          <li className="list-group-item">Tomatoes are wort number today.</li>
          <li className="list-group-item">Apples are worth number today.</li>
          <li className="list-group-item">
            Grapes are worth number today.<button>click</button>
          </li>
        </ul>
      </div>
      <br></br>
      <h1>You have ${props.dollars} dollars.</h1>
    </>
  );
}

/*

let list = [props.grapes, props.apples, props.grapes,];
{list.map((item) => (<li>You have {item}</li>))}

*/
