import React from 'react';
import {  Button, Input} from 'react-bootstrap'
import InputMoment from '../../datePicker/input-moment.jsx'
import moment from 'moment'

export default class RoomClientSearch extends React.Component {
    static propTypes = {
        onSearchObject: React.PropTypes.func,
        onReset: React.PropTypes.func
    };

    constructor(props) {
        super(props)
        this.state = this.getDefaultState()
        this.onSearchHandler = this.onSearchHandler.bind(this)
        this.onResetHandler = this.onResetHandler.bind(this)
        this.onRoomIdChange = this.onRoomIdChange.bind(this)
        this.onClientIdChange = this.onClientIdChange.bind(this)
        this.onCheckInDateChange = this.onCheckInDateChange.bind(this)
        this.onTermChange = this.onTermChange.bind(this)
        this.toggleDatePicker = this.toggleDatePicker.bind(this)
    }

    getDefaultState() {
        return {
            object: {
                RoomId: null,
                ClientId: null,
                CheckInDate: new Date(),
                Term: null
            },
            showInputMoment: false
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

    onRoomIdChange(e) {
        this.changeState({RoomId: e.target.value});
    }

    onClientIdChange(e) {
        this.changeState({ClientId: e.target.value});
    }

    onCheckInDateChange(e) {
        this.changeState({CheckInDate: e.target.value});
    }

    onTermChange(e) {
        this.changeState({Term: e.target.value});
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

    onResetHandler(e) {
        this.setState(this.getDefaultState())
        this.props.onReset()
        e.preventDefault()
    }

    toggleDatePicker(event) {
        this.setState({
            showInputMoment: event.currentTarget.checked
        })
    }

    render() {
        const {RoomId, ClientId, CheckInDate, Term} = this.state.object
        const {showInputMoment} = this.state

        return (<form className="form-inline">
            <div className="form-group">
                <input className="form-control" type="text" value={RoomId} placeholder="RoomId"
                       onChange={this.onRoomIdChange}/>
            </div>
            <div className="form-group">
                <input className="form-control" type="text" placeholder="ClientId" value={ClientId}
                       onChange={this.onClientIdChange}/>
            </div>
            <div className="checkbox">
                <label>
                    <input className="form-control" type="checkbox" checked={showInputMoment}
                           onChange={this.toggleDatePicker}/>Include CheckInDate
                </label>
            </div>
            <div className="form-group">
                <input className="form-control" type="datetime-local" value={CheckInDate}
                       onChange={this.onCheckInDateChange}/>
            </div>
            <div className="form-group">
                <input className="form-control" type="text" placeholder="Term" value={Term}
                       onChange={this.onTermChange}/>
            </div>
            <div className="form-group search-reset">
                <button className="btn btn-primary" onClick={this.onSearchHandler}>Search</button>
                <button className="btn btn-primary" onClick={this.onResetHandler}>Reset</button>
            </div>
        </form>)
    }
}

