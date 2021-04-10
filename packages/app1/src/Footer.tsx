import React from 'react';
import ReactDOM from 'react-dom';
import singleSpaReact from 'single-spa-react';

const Footer: React.VFC = () => {
  return (
    <footer
      style={{
        width: '100%',
        background: '#20232a',
        color: '#61dafb',
        padding: '2rem',
        minHeight: '100px',
        fontWeight: 'bold',
      }}
    >
      Footer from React (app1)
    </footer>
  );
};

const lifeCycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: Footer,
});

export const bootstrap = lifeCycles.bootstrap;
export const mount = lifeCycles.mount;
export const unmount = lifeCycles.unmount;

export default Footer;
