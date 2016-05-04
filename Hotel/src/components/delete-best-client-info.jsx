import React, {Component, PropTypes} from 'react';

import {isNumber} from '../helpers/commonHelper'

export default class DeleteBestClientInfo extends Component {
    static propTypes = {
        onDeleteBestClientInfo: PropTypes.func
    }

    constructor(props) {
        super(props)

        this.state = {
            year: null
        }
    }

    isValid = () => isNumber(this.state.year) && +this.state.year > 0

    onChange = ({target : {value}}) => this.setState({year: value})

    onDeleteBestClientInfo = () => this.props.onDeleteBestClientInfo(this.state.year)

    render() {
        return <div>
            <button className="btn btn-primary" onClick={this.onDeleteBestClientInfo} disabled={!this.isValid()}>Delete best
                client info
            </button>
            <input className="form-control ownInput" onChange={this.onChange} type="text" value={this.state.year}
                   placeholder="year"/>
        </div>
    }
}