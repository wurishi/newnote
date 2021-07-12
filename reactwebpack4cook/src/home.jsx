import React, { useState } from 'react';
import IMG from './img.jpg';
import J from 'jquery';
import { DatePicker, Button } from 'antd';

export default function () {
  const [x, setX] = useState(0);

  function clickFn() {
    console.log(IMG);
    console.log(J);
    console.log($);
    console.log(process.env);
  }

  return (
    <div onMouseMove={(evt) => setX(evt.clientX)}>
      <div>{x}</div>
      <img className="img" src={IMG} alt="" />
      <button onClick={clickFn}>打印输出</button>
      <DatePicker />
      <Button>button</Button>
    </div>
  );
}
