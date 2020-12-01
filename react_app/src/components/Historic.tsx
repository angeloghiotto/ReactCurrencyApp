import React, { Component } from 'react'
import IHistoric from '../interfaces/IHistoric'

interface IProps {
    historic: Array<IHistoric>
}

export class Historic extends Component<IProps,{}> {
    render() {
        return (
            this.props.historic.map( (item, i) => (
            <li key={i}> {item.inputCurrency} {' '} {item.value} {" => "} {item.outputCurrency} {' '} {item.converted}</li>
            ))
        )
    }
}

export default Historic
