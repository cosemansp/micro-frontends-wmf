import { registerApplication, start } from 'single-spa';

registerApplication(
  'footer',
  // @ts-ignore
  () => import('app1/Footer'),
  (location) => location.pathname.startsWith('/'),
);

registerApplication(
  'header',
  // @ts-ignore
  () => import('app1/Header'),
  (location) => location.pathname.startsWith('/'),
);

registerApplication(
  'panel',
  // @ts-ignore
  () => import('app2/Panel'),
  (location) => location.pathname.startsWith('/'),
);

start();
