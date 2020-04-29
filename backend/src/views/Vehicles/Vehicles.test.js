import React from 'react';
import ReactDOM from 'react-dom';
import Vechicles from './Vechicles';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Vechicles />, div);
  ReactDOM.unmountComponentAtNode(div);
});
