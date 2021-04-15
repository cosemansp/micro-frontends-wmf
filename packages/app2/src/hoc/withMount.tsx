import React, { ComponentType } from 'react';
import ReactDOM from 'react-dom';

export const withMount = (Component: ComponentType) => (el: Element, options: any) => {
  ReactDOM.render(<Component {...options} />, el);
};
