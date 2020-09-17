import React from 'react';
import { render, getByTestId, queryByTestId, screen, cleanup } from '@testing-library/react';
import BuildModal from './renderModal';

describe('Render modal', () => {
    test('renders modal *firmware by id*', () => {
    render( <BuildModal /> )
    const parent1 = screen.getByTestId('callModal');
    const parent2 = screen.getByTestId('callModalDiv');
    const element1 = screen.getByLabelText('Firmware id:');
    const element2 = screen.getByText('Get firmware');
    expect(parent1).toBeInTheDocument();
    expect(parent2).toBeInTheDocument();
    expect(element1).toBeInTheDocument();
    expect(element2).toBeInTheDocument();
    });
    afterEach(cleanup);
  });
 