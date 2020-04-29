import React from 'react';
import ReactDOM from 'react-dom';
import Employee from './Employee';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Employee />, div);
  ReactDOM.unmountComponentAtNode(div);
});
