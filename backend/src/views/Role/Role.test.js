import React from 'react';
import ReactDOM from 'react-dom';
import Role from './Role';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Role />, div);
  ReactDOM.unmountComponentAtNode(div);
});
