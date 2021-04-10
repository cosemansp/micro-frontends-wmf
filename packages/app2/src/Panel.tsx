import React from 'react';
import ReactDOM from 'react-dom';
import singleSpaReact from 'single-spa-react';

const Panel: React.VFC = () => {
  return (
    <header
      style={{
        width: '100%',
        background: '#61dafb',
        color: '#20232a',
        padding: '2rem',
        fontWeight: 'bold',
      }}
    >
      Panel from React (app2)
    </header>
  );
};

const lifeCycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: Panel,
});

export const bootstrap = lifeCycles.bootstrap;
export const mount = lifeCycles.mount;
export const unmount = lifeCycles.unmount;

export default Panel;
