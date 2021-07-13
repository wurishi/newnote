import SiderLayout from '../layouts/SiderLayout';

export const routers = [
  {
    path: '/',
    scomponent: SiderLayout,
    children: [
      {
        path: '/hehe',
        component: () => import('../pages/hehe'),
      },
      {
        path: '/ts',
        component: () => import(/*webpackChunkName: 'ts' */ '../pages/ts'),
      },
    ],
  },
];
