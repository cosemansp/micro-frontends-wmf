import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import singleSpaReact from 'single-spa-react';

import logo from '../../assets/wmf-logo-small.png';
import './style.css';

// @ts-ignore
const Button = React.lazy(() => import('app1/Button'));

const Panel: React.VFC = (props) => {
  const [cnt, setCnt] = useState(0);
  const handleIncrement = () => {
    setCnt(cnt + 1);
  };
  return (
    <div className="header">
      <img src={logo} width="100px" />
      Panel from React (app2) - counter: {cnt}
      <br />
      <React.Suspense fallback="Loading...">
        <Button onClick={handleIncrement}>&#128133; Button (app1)</Button>
      </React.Suspense>
    </div>
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
