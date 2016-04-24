import React from 'react';
import { Button, Input} from 'react-bootstrap'
import Toggle from 'react-toggle'

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
        if (e.target.value < 0)
            return;

        this.changeState({Id: e.target.value})
    }

    onFloorChange(e) {
        if (e.target.value < 1 || e.target.value > 10)
            return;

        this.changeState({Floor: e.target.value})
    }

    onPriceChange(e) {
        this.changeState({Price: e.target.value})
    }

    isPriceValid() {
        const reg = /^ *\$?\d+(?:\.\d{2})? *$/
        return this.state.object.Price, toString().match(reg) !== null
    }

    isComfortValid() {
        const comfort = this.state.object.Comfort
        return comfort > 0 && comfort < 11
    }

    onComfortChange(e) {
        this.changeState({Comfort: e.target.value})
    }

    onOccupationChange(event, value) {
        this.changeState({Occupation: value})
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
        this.setState(this.getDefaultState())
        this.props.onReset()
        e.preventDefault()
    }

    render() {
        const {isChecked} = this.state
        const {Id, Floor, Price, Comfort, Occupation} = this.state.object
        const isFormValid = this.isComfortValid() && this.isPriceValid()

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
                <label>
                    <input className="form-control" type="checkbox" placeholder="Comfort" value={Occupation}
                           onChange={this.onOccupationChange}/>Occupation
                </label>
            </div>
            <div className="form-group search-reset">
                <button className="btn btn-primary" onClick={this.onSearchHandler}>Search</button>
                <button className="btn btn-primary" onClick={this.onResetHandler}>Reset</button>
            </div>
        </form>)
    }
}