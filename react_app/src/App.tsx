import React, { Component } from 'react'
import Axios from 'axios'
import './App.css';
import CurrencyForm from './components/CurrencyForm';
import ICurrencies from './interfaces/ICurrencies'
import IHistoric from './interfaces/IHistoric'

interface IState {
  input: number
  inputCurrency: string
  outputCurrency: string
  output: number
  error: string,
  availableCurrencies: Array<ICurrencies>,
  hisotric: Array<IHistoric>,
}

class App extends Component<{}, IState> {

  state = {
    availableCurrencies: [
      { value: "asd", label: "aaa" }
    ],
    inputCurrency: "",
    outputCurrency: "",
    output: 0,
    input: 0,
    error: "",
    hisotric: new Array<IHistoric>()
  }

  componentDidMount () {
    this.renderMyData();
    this.updateHistoric();
  }

  renderMyData = () => {
    Axios.get('http://localhost:5500/api/currency').then(
      (res) => {

        let teste: Array<ICurrencies> = Object.entries(res.data).map((val) => {
          let obj: ICurrencies = { value: val[0], label: val[1] }
          return obj;
        });

        this.setState({
          availableCurrencies: teste
        })

      }
    )
  }

  updateHistoric = (): void => {
    Axios.get('http://localhost:5500/api/currency/historic').then(
      (res) => {
        this.setState({ ...this.state, hisotric:  res.data })
      }
    )
  }

  convert = (): void => {
    if (this.state.inputCurrency === "") {
      this.setState({ ...this.state, error: "Select Input Currency" })
      return;
    } else if (this.state.outputCurrency === "") {
      this.setState({ ...this.state, error: "Select Output Currency" })
      return;
    } else if (this.state.input <= 0) {
      this.setState({ ...this.state, error: "Input value must be bigger than 0" })
      return;
    }

    Axios.get(`http://localhost:5500/api/currency/${this.state.input}/${this.state.inputCurrency}/${this.state.outputCurrency}`).then(
      (res) => {
        this.setState({ ...this.state, output: res.data.converted })
      }
    )

    this.setState({ ...this.state, error: "" })

    this.updateHistoric()
  }

  changeInputCurrency = (e: any): void => {
    this.setState({ ...this.state, input: e.target.value === '' ? 0 : parseInt(e.target.value) });
  }

  outputCurrency = (e: any): void => {
    this.setState({ ...this.state, output: parseInt(e.target.value) });
  }

  selectInputCurrency = (selected: any) => {
    this.setState({ ...this.state, inputCurrency: selected.value });
  }

  selectOutputCurrency = (selected: any) => {
    this.setState({ ...this.state, outputCurrency: selected.value });
  }



  render() {
    return (
      <div className="App">
        <div className="container">
          <CurrencyForm
            changeInputCurrency={this.changeInputCurrency}
            availableCurrencies={this.state.availableCurrencies}
            output={this.state.output}
            error={this.state.error}
            historic={this.state.hisotric}
            selectInputCurrency={this.selectInputCurrency}
            selectOutputCurrency={this.selectOutputCurrency}
            convert={this.convert}
          />
        </div>
      </div>
    );
  }
}

export default App;
