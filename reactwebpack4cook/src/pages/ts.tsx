import React, { useState } from 'react';

export default function TS() {
  const str = 'aaaa';

  const [count, setCount] = useState(0);

  return (
    <div onClick={() => setCount((prev) => prev + 1)}>
      {str} click{count}
    </div>
  );
}
