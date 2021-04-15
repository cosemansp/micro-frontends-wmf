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

export default Footer;

export const { bootstrap, mount, unmount } = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: Footer,
});
