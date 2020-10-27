import React, {useState} from 'react';

export default function() {

  const [x, setX] = useState(0);

  return (
    <div onMouseMove={evt => setX(evt.clientX)}>
      {x}
    </div>
  )
}