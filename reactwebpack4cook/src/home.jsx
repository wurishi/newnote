import React, { useState } from 'react';
import IMG from './img.jpg';

export default function () {
  const [x, setX] = useState(0);
  console.log(IMG);

  return (
    <div onMouseMove={(evt) => setX(evt.clientX)}>
      <div>{x}</div>
      <img className="img" src={IMG} alt=""/>
    </div>
  );
}
