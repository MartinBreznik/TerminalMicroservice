import React from 'react';
import { render, cleanup } from '@testing-library/react';
import TestElements from './testTemplate.js'
import { iteratee } from 'lodash';
import { hasUncaughtExceptionCaptureCallback } from 'process';

afterEach(cleanup);

it('should equal to 0', () => {
const { getByTestId } = render(<TestElements />);
expect(getByTestId('counter')).toHaveTextContent(0)
});

it('should be enabled', () => {
    const { getByTestId } = render(<TestElements />);
    expect(getByTestId('button-down')).not.toHaveAttribute('disabled')
});
it('should be disabled', () => {
    const {getByTestId} = render(<TestElements />);
    expect(getByTestId('button-up')).toBeDisabled()

})