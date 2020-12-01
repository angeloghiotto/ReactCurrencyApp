import React, { Component } from 'react'
import Select from 'react-select'
import Historic from './Historic'
import ICurrencies from '../interfaces/ICurrencies'
import IHistoric from '../interfaces/IHistoric'

interface IProps {
    changeInputCurrency: any,
    selectInputCurrency: any,
    selectOutputCurrency: any,
    output: number,
    convert: any,
    error: string,
    availableCurrencies: Array<ICurrencies>,
    historic: Array<IHistoric>
}
interface IState {
    availableCurrencies: Array<ICurrencies>
}

export class CurrencyForm extends Component<IProps, IState> {

    state = {
        availableCurrencies: [{ value: 'strawberry', label: 'Strawberry' }]
    }

    render() {

        let error = showError(this.props.error);

        return (
            <div>
                <form action="">
                    <div className="row">
                        <div className="col-5">
                            <div className="form-group">
                                <label htmlFor="inputCurrency" >Value</label>
                                <input type="text" name="inputCurrency" onChange={this.props.changeInputCurrency}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="currency" >Input Currency</label>
                                <Select options={this.props.availableCurrencies} onChange={this.props.selectInputCurrency} />
                            </div>
                        </div>
                        <div className="col-1">
                            {'=>'}
                        </div>
                        <div className="col-5">
                            <div className="form-group">
                                <label htmlFor="outputCurrency" >Value</label>
                                <input type="text" name="outputCurrency" value={this.props.output} disabled />
                            </div>
                            <div className="form-group">
                                <label htmlFor="currency" >Output Currency</label>
                                <Select options={this.props.availableCurrencies} onChange={this.props.selectOutputCurrency} />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div data-testid="error" className="col-12">
                            {error}
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-12">
                            <button data-testid="convert" type="button" className="btn btn-primary" onClick={this.props.convert}>Convert</button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <Historic historic={this.props.historic} />
                        </div>
                    </div>
                </form>
            </div >
        )
    }

}


function showError(error: string) {
    if (error === "") {
        return (<div></div>)
    } else {
        return (
            <div className="alert alert-danger" role="alert">
                {error}
            </div>
        )
    }

}
export default CurrencyForm
