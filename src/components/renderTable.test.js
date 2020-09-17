import React from 'react';
import { render, getByTestId, queryByTestId, screen } from '@testing-library/react';
import BuildTable from './renderTable';

describe('Render table', () => {
    test('renders modal *CallTable*', () => {
    render( <BuildTable /> )
    const parent1 = screen.getByTestId('callTable');
    const parent2 = screen.getByTestId('callTableDiv');
    expect(parent1).toBeInTheDocument();
    expect(parent2).toBeInTheDocument();
    });
  });