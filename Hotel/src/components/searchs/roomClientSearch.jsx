import React from 'react';
import {  Button, Input} from 'react-bootstrap'
import InputMoment from '../../datePicker/input-moment.jsx'
import moment from 'moment'
import {isNumber} from '../../helpers/commonHelper'

function transformForView(object) {
    let {RoomId, ClientId, CheckInDate, Term} = object

    RoomId = RoomId === null ? '' : RoomId
    ClientId = ClientId === null ? '' : ClientId
    CheckInDate = CheckInDate === null ? '' : CheckInDate
    Term = Term === null ? '' : Term

    return {RoomId, ClientId, CheckInDate, Term}
}

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
        this.onNumberFieldChange = this.onNumberFieldChange.bind(this)
        this.onCheckInDateChange = this.onCheckInDateChange.bind(this)
        this.toggleDatePicker = this.toggleDatePicker.bind(this)
    }

    getDefaultState() {
        return {
            object: {
                RoomId: null,
                ClientId: null,
                CheckInDate: null,
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

    onCheckInDateChange(e) {
        this.changeState({CheckInDate: e.target.value});
    }


    onNumberFieldChange = (fieldName) => (e) => {
        const result = e.target.value == '' ? null : e.target.value
        if (result == null) {
            this.changeState({
                [fieldName]: null
            })
            return;
        }

        if (!isNumber(result) || +result < 0)
            return;

        this.changeState({
            [fieldName]: result
        })
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

        if(result.CheckInDate) {
            result.CheckInDate = moment(result.CheckInDate).utc().add(3, 'hour').format().replace('Z','.000Z')
        }
        this.props.onSearchObject(result);
        e.preventDefault()
    }

    onResetHandler(e) {
        const defaultState = this.getDefaultState()
        this.setState({
            ...defaultState
        })
        this.props.onReset()
        e.preventDefault()
    }

    toggleDatePicker(event) {
        const isChecked = event.currentTarget.checked
        !isChecked && this.changeState({CheckInDate: null})
        isChecked && this.changeState({CheckInDate: new Date()})
        this.setState({
            showInputMoment: isChecked
        })
    }

    render() {
        const {RoomId, ClientId, CheckInDate, Term} = this.state.object
        const {showInputMoment} = this.state

        return (<form className="form-inline">
            <div className="form-group">
                <input className="form-control" type="text" value={RoomId} placeholder="RoomId"
                       onChange={this.onNumberFieldChange('RoomId')}/>
            </div>
            <div className="form-group">
                <input className="form-control" type="text" placeholder="ClientId" value={ClientId}
                       onChange={this.onNumberFieldChange('ClientId')}/>
            </div>
            <div className="checkbox">
                <label>
                    <input className="form-control" type="checkbox" checked={showInputMoment}
                           onChange={this.toggleDatePicker}/>Include CheckInDate
                </label>
            </div>
            <div className="form-group">
                <input className="form-control" type="datetime-local" value={CheckInDate}
                       onChange={this.onCheckInDateChange} disabled={!showInputMoment}/>
            </div>
            <div className="form-group">
                <input className="form-control" type="text" placeholder="Term" value={Term}
                       onChange={this.onNumberFieldChange('Term')}/>
            </div>
            <div className="form-group search-reset">
                <button className="btn btn-primary" onClick={this.onSearchHandler}>Search</button>
                <button className="btn btn-primary" onClick={this.onResetHandler}>Reset</button>
            </div>
        </form>)
    }
}

