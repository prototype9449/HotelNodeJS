import React from 'react';
import { DropdownButton, MenuItem } from 'react-bootstrap'
import Toggle from 'react-toggle'
import {isNumber} from '../../helpers/commonHelper'

function getOccupationTitle(value) {
    if (value === null) {
        return "Doesn't matter"
    } else {
        return value ? 'Occupied' : 'Free'
    }
}

function transformForView(object) {
    let {Id, Floor, Price, Comfort, Occupation} = object
    Id = Id == null ? '' : Id
    Floor = Floor == null ? '' : Floor
    Price = Price == null ? '' : Price
    Comfort = Comfort == null ? '' : Comfort

    return {Id, Floor, Price, Comfort, Occupation}
}

export default class RoomSearch extends React.Component {
    static propTypes = {
        onSearchObject: React.PropTypes.func,
        onReset: React.PropTypes.func
    };

    constructor(props) {
        super(props)
        this.state = this.getDefaultState()
        this.onSearchHandler = this.onSearchHandler.bind(this)
        this.onResetHandler = this.onResetHandler.bind(this)
        this.onIdChange = this.onIdChange.bind(this)
        this.onFloorChange = this.onFloorChange.bind(this)
        this.onPriceChange = this.onPriceChange.bind(this)
        this.onComfortChange = this.onComfortChange.bind(this)
        this.onOccupationChange = this.onOccupationChange.bind(this)
        this.onCheck = this.onCheck.bind(this)
        this.isFormValid = this.isFormValid.bind(this)
    }

    getDefaultState() {
        return {
            object: {
                Id: null,
                Floor: null,
                Price: null,
                Comfort: null,
                Occupation: null
            },
            isChecked: false
        }
    }

    changeState(obj) {
        this.setState({
            object: {
                ...this.state.object,
                ...obj
            }
        })
    }

    onIdChange(e) {
        const result = e.target.value == '' ? null : e.target.value
        if (result == null) {
            this.changeState({
                Id: null
            })
            return;
        }

        if (!isNumber(result) || +result < 0)
            return;

        this.changeState({
            Id: result
        })
    }

    onFloorChange(e) {
        const result = e.target.value == '' ? null : e.target.value
        if (result == null) {
            this.changeState({
                Floor: null
            })
            return;
        }
        if (!isNumber(result) || +result < 0 || +result > 10)
            return;

        this.changeState({Floor: result})
    }

    onPriceChange(e) {
        this.changeState({Price: e.target.value})
    }

    isFormValid() {
        if (this.state.object.Price === null) {
            return true
        }

        const reg = /^ *\$?\d+(?:\.\d{2})? *$/
        return this.state.object.Price.match(reg) !== null
    }

    onComfortChange(e) {
        const result = e.target.value == '' ? null : e.target.value
        if (result == null) {
            this.changeState({
                Comfort: null
            })
            return;
        }
        if (!isNumber(result) || +result < 0 || +result > 10)
            return;

        this.changeState({Comfort: result})
    }

    onOccupationChange(e, key) {
        let occupation
        if (key === 0) {
            occupation = null
        } else {
            occupation = key === 1
        }

        this.changeState({
            Occupation: occupation
        })
        this.changeState({Occupation: occupation})
    }

    onSearchHandler(e) {
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

    onCheck(e) {
        this.setState({isChecked: e.target.value})
    }

    onResetHandler(e) {
        const defaultState = this.getDefaultState()
        this.setState({
            ...defaultState
        })
        this.props.onReset()
        e.preventDefault()
    }

    render() {
        const {isChecked} = this.state
        let {Id, Floor, Price, Comfort, Occupation} = transformForView(this.state.object)
        const occupationTitle = getOccupationTitle(Occupation)

        return (<form className="form-inline">
            <div className="form-group">
                <input className="form-control" type="text" value={Id} placeholder="Id" onChange={this.onIdChange}/>
            </div>
            <div className="form-group">
                <input className="form-control" type="text" placeholder="Floor" value={Floor}
                       onChange={this.onFloorChange}/>
            </div>
            <div className="form-group">
                <input className="form-control" type="text" placeholder="Price" value={Price}
                       onChange={this.onPriceChange}/>
            </div>
            <div className="form-group">
                <input className="form-control" type="text" placeholder="Comfort" value={Comfort}
                       onChange={this.onComfortChange}/>
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