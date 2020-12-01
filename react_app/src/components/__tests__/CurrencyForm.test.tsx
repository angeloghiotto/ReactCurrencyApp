import React from 'react';
import ReactDOM from 'react-dom'
import CurrencyForm from '../CurrencyForm';
import IHistoric from '../interfaces/IHistoric'
import { cleanup, render } from '@testing-library/react'
import '@testing-library/jest-dom'

const historic: Array<IHistoric> = [
  {
    inputCurrency: "ABC",
    outputCurrency: "DEF",
    value: 1,
    converted: 2,
  }
]

const div = document.createElement('div');

afterEach(cleanup)
it('renders without crashing', () => {
  ReactDOM.render(<CurrencyForm historic={historic} />, div);
});

it('Show correct error', () => {
  const error = "Hello teste erro";
  const { getByTestId } = render(<CurrencyForm historic={historic} error={error} />, div);
  expect(getByTestId('error')).toHaveTextContent(error)
});