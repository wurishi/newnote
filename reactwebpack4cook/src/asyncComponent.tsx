// import React from 'react';

// export default function asyncComponent(
//   loadComponent: () => Promise<any>,
//   displayName: string = 'AsyncComponent'
// ) {
//   return class AsyncComponent extends React.Component {
//     static displayName = displayName;

//     state = {
//       Component: null,
//     };

//     hasComponent(): boolean {
//       return this.state.Component !== null;
//     }

//     componentWillMount() {
//       if (this.hasComponent()) {
//         return;
//       }
//       loadComponent()
//         .then((module) => module.default)
//         .then((Component) => this.setState({ Component }))
//         .catch((err) => {
//           console.error('动态组件无法加载', err);
//           throw err;
//         });
//     }

//     render() {
//       const Component: any = this.state.Component;
//       return Component ? <Component {...this.props} /> : null;
//     }
//   };
// }
