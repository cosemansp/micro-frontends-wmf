import React from 'react';
import ReactDOM from 'react-dom';
import singleSpaReact from 'single-spa-react';

const Header: React.VFC = () => {
  return (
    <header
      style={{
        width: '100%',
        background: '#20232a',
        color: '#61dafb',
        padding: '2rem',
        fontWeight: 'bold',
      }}
    >
      Header from React (app1)
    </header>
  );
};

const lifeCycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: Header,
});

export const bootstrap = lifeCycles.bootstrap;
export const mount = lifeCycles.mount;
export const unmount = lifeCycles.unmount;

export default Header;
