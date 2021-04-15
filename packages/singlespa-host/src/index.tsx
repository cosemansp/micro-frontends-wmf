import { registerApplication, start } from 'single-spa';

registerApplication(
  'footer',
  // @ts-ignore
  () => import('myApp/Footer'),
  (location) => location.pathname.startsWith('/'),
);

registerApplication(
  'header',
  // @ts-ignore
  () => import('myApp/Header'),
  (location) => location.pathname.startsWith('/'),
);

registerApplication(
  'panel',
  // @ts-ignore
  () => import('myOtherApp/Panel'),
  (location) => location.pathname.startsWith('/'),
);

start();
