import React, { useState } from 'react';

// export default function () {
//   const [count, setCount] = useState(0);
//   return (
//     <div>
//       <div>{count}</div>
//       <button onClick={() => setCount(count + 1)}>点我</button>
//     </div>
//   );
// }

export default class Page extends React.Component {
  constructor() {
    super();
    this.state = {
      count: 0,
    };
  }

  render() {
    return (
      <div>
        <div>{this.state.count}</div>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          点我a
        </button>
      </div>
    );
  }
}
