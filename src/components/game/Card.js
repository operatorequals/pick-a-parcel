import React from 'react';
import './Card.css';
import './CardAnimation.css';

import { GAMEPHASES, CONSTANTS, EVENTS } from '../../game/constants';


export const Card = ({id, type, value, face, onclick, animation}) => (
<div className={`cardWrapper ${animation ? "card-animation" : ""}`} onClick={()=>onclick(id)}>
  {/* <div className="card-inner"> */}
    <div className="card" id={`card-${id}`}>
      <div className="print-area">
          { face === "up"  ? // Face Up Card
          <div className="card-front">
              { type === "action"  ? // Action Card
              <div className="card-action">
                <h2><span className="card-value-action">{value}</span><span className="card-action-parenthesis">(
                  {/* <br/> */}
                  {/* <br/> */}
                )</span><span className="card-action-semicolon">;</span></h2>
              </div>
              : // Direction Card
              <div className="card-direction">
                <h2>
                    {/* <br /> */}
                    <span className="card-value-direction">"{value}"</span>
                </h2>
              </div>
              }
          </div>
          : // Face Down card
          <div className="card-back">
            <p className="card-back-text">pick(
              "parcel"
              <br />
              );</p>
          </div>
          }
          <p className="card-type"># {type==="action" ? "function" : "parameter"}</p>
      </div>
    </div>
  {/* </div> */}
</div>
);
// 
// const FrontContent = ({type, value}) => {
//   if (type==="action")
//     return <div className="card-front card">
//       <h2><span className="card-value-action">{value}</span><span className="card-action-parenthesis">(
//         <br/>
//         <br/>
//       )</span><span className="card-action-semicolon">;</span></h2>
//       <p className="card-type"># function</p>
//     </div>
//   else 
//     return <div className="card-front card-direction card">
//     <h2><span className="card-value-direction">
//       <br/>"{value}"</span>
//     </h2>
//     <p className="card-type"># parameter</p>
// </div>
// 
// }
// 
// const BackContent = () => <div className="card-back card">
//     <p className="card-back-text">pick(
//     "parcel"
//     <br/>
//     );</p>
//     </div>
// 
// export const Card = ({ id, type, value, face, onclick, animation }) => {
// 
//   return (
//     <div className={`cardWrapper ${animation ? "card-animation" : ""}`} onClick={()=>onclick(id)}>
//         <div className="card-inner">
//         {(face === "up") ?
//           <FrontContent type={type} value={value} /> : <BackContent />
//         }
//         </div>
//     </div>
//   );
// };
// 
