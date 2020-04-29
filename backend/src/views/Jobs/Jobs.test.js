import React from 'react';
import ReactDOM from 'react-dom';
import Jobs from './Jobs';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Jobs />, div);
  ReactDOM.unmountComponentAtNode(div);
});
