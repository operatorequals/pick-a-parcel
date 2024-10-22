import React from 'react';
import './Card.css';
import './CardAnimation.css';

import { GAMEPHASES, CONSTANTS, EVENTS } from '../../game/constants';


const FrontContent = ({type, value}) => {
  if (type==="action")
    return <div className="card-front card">
      <h2><span className="card-value-action">{value}</span><span className="card-action-parenthesis">(
        <br/>
        <br/>
      )</span><span className="card-action-semicolon">;</span></h2>
      <p className="card-type"># function</p>
    </div>
  else 
    return <div className="card-front card-direction card">
    <h2><span className="card-value-direction">
      <br/>"{value}"</span>
    </h2>
    <p className="card-type"># parameter</p>
</div>

}

const BackContent = () => <div className="card-back card">
    <p className="card-back-text">pick(
    "parcel"
    <br/>
    );</p>
    </div>

export const Card = ({ id, type, value, face, onclick }) => {

  return (
    <div className="cardWrapper card-animation" onClick={()=>onclick(id)}>
        <div className="card-inner">
        {(face === "up") ?
          <FrontContent type={type} value={value} /> : <BackContent />
        }
        </div>
    </div>
  );
};

