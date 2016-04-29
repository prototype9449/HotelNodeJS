import React from 'react';
import {DropdownButton, MenuItem} from 'react-bootstrap'

import {isNumber} from '../../helpers/commonHelper'

function getOccupationTitle(value) {
    if (value === null) {
        return "Doesn't matter"
    } else {
        return value ? 'Occupied' : 'Free'
    }
}

export default class RoomSearch extends React.Component {
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
                Id: null,
                Floor: null,
                Price: null,
                Comfort: null,
                Occupation: null
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
        const {Id, Floor, Comfort} = this.state.object
        const isIdValid = Id === null || isNumber(Id) || +Id >= 0
        const isFloorValid = Floor === null || isNumber(Floor) || +Floor >= 0 || +Floor <= 10
        const isComfortValid = Comfort === null || isNumber(Comfort) || +Comfort >= 0 || +Comfort <= 10

        return isIdValid && isFloorValid && isComfortValid
    }

    onOccupationChange = (e, key) => {
        let occupation
        if (key === 0) {
            occupation = null
        } else {
            occupation = key === 1
        }

        this.changeState({Occupation: occupation})
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

    onFieldChange = (field) => ({target : {value}}) => this.changeState({[field]: value === '' ? null : value})

    onResetHandler = (e) => {
        const defaultState = this.getDefaultState()
        this.setState({
            ...defaultState
        })
        this.props.onReset()
        e.preventDefault()
    }

    render() {
        let {Id, Floor, Price, Comfort, Occupation} = this.state.object
        const occupationTitle = getOccupationTitle(Occupation)

        return (<form className="form-inline">
            <div className="form-group">
                <input className="form-control" type="text" value={Id} placeholder="Id"
                       onChange={this.onFieldChange('Id')}/>
            </div>
            <div className="form-group">
                <input className="form-control" type="text" placeholder="Floor" value={Floor}
                       onChange={this.onFieldChange('Floor')}/>
            </div>
            <div className="form-group">
                <input className="form-control" type="text" placeholder="Price" value={Price}
                       onChange={this.onFieldChange('Price')}/>
            </div>
            <div className="form-group">
                <input className="form-control" type="text" placeholder="Comfort" value={Comfort}
                       onChange={this.onFieldChange('Comfort')}/>
            </div>
            <div className="form-group">
                Occupation :
                <DropdownButton className="dropDownMenu" id="dropDownButtonRoom" onSelect={this.onOccupationChange}
                                title={occupationTitle}>
                    <MenuItem eventKey={0}>Doesn't matter</MenuItem>>
                    <MenuItem eventKey={1}>Occupied</MenuItem>>
                    <MenuItem eventKey={2}>Free</MenuItem>
                </DropdownButton>
            </div>
            <div className="form-group search-reset">
                <button className="btn btn-primary" onClick={this.onSearchHandler} disabled={!this.isFormValid()}>
                    Search
                </button>
                <button className="btn btn-primary" onClick={this.onResetHandler}>Reset</button>
            </div>
        </form>)
    }
}