import React from 'react';
import { DropdownButton, MenuItem } from 'react-bootstrap'

import {isNumber} from '../../helpers/commonHelper'

function getSexName(value) {
    if (value === null) {
        return "Doesn't matter"
    } else {
        return value ? 'Man' : 'Woman'
    }
}

export default class ClientSearch extends React.Component {
    static propTypes = {
        onSearchObject: React.PropTypes.func,
        onReset: React.PropTypes.func
    };

    constructor(props) {
        super(props)
        this.state = this.getDefaultState()
    }

    getDefaultState = () => {
        return {
            object: {
                FullName: null,
                Id: null,
                Passport: null,
                Sex: null
            }
        }
    }

    changeState = (obj) => {
        this.setState({
            object: {
                ...this.state.object,
                ...obj
            }
        })
    }

    isFormValid = () => {
        const {Id} = this.state.object
        const isIdValid = Id === null || isNumber(+Id) && +Id >= 0
        return isIdValid
    }

    onFieldChange = (field) => ({target : {value}}) => this.changeState({[field]: value == '' ? null : value})

    onSexChange = (e, key) => {
        let sex
        if (key === 0) {
            sex = null
        } else {
            sex = key === 1
        }

        this.changeState({
            Sex: sex
        })
    }

    onSearchHandler = (e) => {
        const {object} = this.state
        const result = Object.keys(object).reduce((obj, x) => {
            if (object[x] == null) {
                return obj
            } else {
                return {
                    ...obj,
                    [x]: object[x]
                }
            }
        }, {})
        this.props.onSearchObject(result);
        e.preventDefault()
    }

    onResetHandler = (e) => {
        const defaultState = this.getDefaultState()
        this.setState({
            ...defaultState
        })
        this.props.onReset()
        e.preventDefault()
    }

    render() {
        let {Id, FullName, Passport, Sex} = this.state.object
        const sexTitle = getSexName(Sex)

        return <form className="form-inline">
            <div className="form-group">
                <input className="form-control ownInput" type="text" value={Id} placeholder="Id"
                       onChange={this.onFieldChange('Id')}/>
            </div>
            <div className="form-group">
                <input className="form-control ownInput" type="text" placeholder="FullName" value={FullName}
                       onChange={this.onFieldChange('FullName')}/>
            </div>
            <div className="form-group">
                <input className="form-control ownInput" type="text" placeholder="Passport" value={Passport}
                       onChange={this.onFieldChange('Passport')}/>
            </div>
            <div className="form-group">
                Sex :
                <DropdownButton className="dropDownMenu" id="dropDownButtonClient" onSelect={this.onSexChange}
                                title={sexTitle}>
                    <MenuItem eventKey={0}>Doesn't matter</MenuItem>
                    <MenuItem eventKey={1}>Man</MenuItem>
                    <MenuItem eventKey={2}>Woman</MenuItem>
                </DropdownButton>
            </div>
            <div className="form-group search-reset">
                <button className="btn btn-primary" disabled={!this.isFormValid()} onClick={this.onSearchHandler}>
                    Search
                </button>
                <button className="btn btn-primary" onClick={this.onResetHandler}>Reset</button>
            </div>
        </form>
    }
}