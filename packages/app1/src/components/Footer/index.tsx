import React from 'react';
import ReactDOM from 'react-dom';
import singleSpaReact from 'single-spa-react';
import styled from 'styled-components';

const FooterContainer = styled.div`
  width: 90%;
  color: #20232a;
  border: 5px solid green;
  padding: 10px;
  font-weight: bold;
`;

const Footer: React.VFC = (props) => {
  console.log('>>footer', props);
  return <FooterContainer>Footer from React (app1)</FooterContainer>;
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
