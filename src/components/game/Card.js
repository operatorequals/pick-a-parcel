import React from 'react';
import './Card.css';
import './CardAnimation.css';

import { GAMEPHASES, CONSTANTS, EVENTS } from '../../game/constants';


const FrontContent = ({ type, value }) => {
    if (type === "action")
        return <div className="card-front card">
            <h2>
                <span className="card-value-action">{value}<span className="card-action-parenthesis">(</span></span>
                <span className="card-action-semicolon"><span className="card-action-parenthesis">)</span>;</span>
            </h2>
            <div className="card-type"># function</div>
        </div>;
    else
        return <div className="card-front card-direction card">
            <h2><span className="card-value-direction">
                <br />"{value}"</span>
            </h2>
            <div className="card-type"># parameter</div>
        </div>;

};

const BackContent = () => <div className="card-back card">
    <p className="card-back-text">pick(
        "parcel"
        <br />
        );</p>
</div>;

export const Card = ({ id, type, value, face, onclick, animation }) => {

    return (
        <div className={`cardWrapper ${animation ? "card-animation" : ""}`} onClick={() => onclick(id)}>
            <div className="card-inner">
                {(face === "up") ?
                    <FrontContent type={type} value={value} /> : <BackContent />
                }
            </div>
        </div>
    );
};

