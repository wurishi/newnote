import React, { useState } from 'react';
import IMG from './img.jpg';
import J from 'jquery';

export default function () {
  const [x, setX] = useState(0);
  
  function clickFn() {
    console.log(IMG);
    console.log(J);
    console.log($);
  }

  return (
    <div onMouseMove={(evt) => setX(evt.clientX)}>
      <div>{x}</div>
      <img className="img" src={IMG} alt=""/>
      <button onClick={clickFn}>jquery</button>
    </div>
  );
}
