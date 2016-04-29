import React from 'react';
import moment from 'moment'
import { DropdownButton, MenuItem } from 'react-bootstrap'

import {isNumber} from '../../helpers/commonHelper'

export default class RoomClientSearch extends React.Component {
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
                RoomId: null,
                ClientId: null,
                CheckInDate: null,
                Term: null
            },
            isShownDatePicker: false
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

    onFieldChange = (field) => ({target : {value}}) => this.changeState({[field]: value === '' ? null : value})

    onSearchHandler = (e)  => {
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

        if (result.CheckInDate) {
            result.CheckInDate = moment(result.CheckInDate).utc().add(3, 'hour').format().replace('Z', '.000Z')
        }
        this.props.onSearchObject(result);
        e.preventDefault()
    }

    isFormValid = () => {
        const {ClientId, RoomId, Term} = this.state.object
        const isClientIdValid = ClientId === null || isNumber(ClientId) && +ClientId >= 0
        const isRoomIdValid = RoomId === null || isNumber(RoomId) && +RoomId >= 0
        const isTermValid = Term === null || isNumber(Term) && +Term >= 0

        return isClientIdValid && isRoomIdValid && isTermValid
    }

    onResetHandler = (e)  => {
        const defaultState = this.getDefaultState()
        this.setState({
            ...defaultState
        })
        this.props.onReset()
        e.preventDefault()
    }

    onToggleDatePicked = (e, key) => {
        const isShownDatePicker = key === 1
        !isShownDatePicker && this.changeState({CheckInDate: null})
        isShownDatePicker && this.changeState({CheckInDate: new Date()})
        this.setState({isShownDatePicker})
    }

    render() {
        const {RoomId, ClientId, CheckInDate, Term} = this.state.object
        const {isShownDatePicker} = this.state
        const dateTimeTitle = isShownDatePicker ? 'Inclide' : "Don't include"

        return (<form className="form-inline">
            <div className="form-group">
                <input className="form-control" type="text" value={RoomId} placeholder="RoomId"
                       onChange={this.onFieldChange('RoomId')}/>
            </div>
            <div className="form-group">
                <input className="form-control" type="text" placeholder="ClientId" value={ClientId}
                       onChange={this.onFieldChange('ClientId')}/>
            </div>
            <div className="form-group">
                <DropdownButton className="dropDownMenu" id="dropDownButtonDateTime" onSelect={this.onToggleDatePicked}
                                title={dateTimeTitle}>
                    <MenuItem eventKey={1}>Include</MenuItem>>
                    <MenuItem eventKey={0}>Don't include</MenuItem>>
                </DropdownButton>
            </div>
            <div className="form-group">
                <input className="form-control" type="datetime-local" step="1" value={CheckInDate}
                       onChange={this.onFieldChange('CheckInDate')} disabled={!isShownDatePicker}/>
            </div>
            <div className="form-group">
                <input className="form-control" type="text" placeholder="Term" value={Term}
                       onChange={this.onFieldChange('Term')}/>
            </div>
            <div className="form-group search-reset">
                <button disabled={!this.isFormValid()} className="btn btn-primary" onClick={this.onSearchHandler}>Search
                </button>
                <button className="btn btn-primary" onClick={this.onResetHandler}>Reset</button>
            </div>
        </form>)
    }
}

