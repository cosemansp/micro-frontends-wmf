import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import singleSpaReact from 'single-spa-react';

import { happyFace } from '../../assets';
import './style.css';

// @ts-ignore
// const Button = React.lazy(() => import('app1/Button'));

const Panel: React.VFC = (props) => {
  const [cnt, setCnt] = useState(0);
  const handleIncrement = () => {
    setCnt(cnt + 1);
  };
  return (
    <div className="header">
      <img src={happyFace} width="100px" />
      Panel from React (app2)
      <br />
      {/* 
      <React.Suspense fallback="Loading...">
        <Button onClick={handleIncrement}>&#128133; Button (app1)</Button>
      </React.Suspense> 
      */}
      <button onClick={handleIncrement}>Click me {cnt}</button>
    </div>
  );
};

export const { bootstrap, mount, unmount } = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: Panel,
});

export default Panel;
