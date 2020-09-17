import React from 'react';
import { render, cleanup, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />)
  const rootDiv = screen.getByTestId('appRootDiv');
  expect(rootDiv).toBeInTheDocument();
});

afterEach(cleanup)
 
it('should take a snapshot', () => {
   const { asFragment } = render(<App />)
   expect(asFragment(<App />)).toMatchSnapshot()
  });
