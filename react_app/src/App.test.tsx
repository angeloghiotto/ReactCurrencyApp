import React from 'react';
import ReactDOM from 'react-dom'
import App from './App';
import IHistoric from '../interfaces/IHistoric'
import { cleanup, render } from '@testing-library/react'
import '@testing-library/jest-dom'
import TestRenderer from 'react-test-renderer'


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

it('renders learn react link', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

it('matches snapshot', () =>{
  const snap = TestRenderer.create(<App />, div);
  expect(snap).toMatchSnapshot()
})



