import React from 'react';
import Dialog from '../../../node_modules/material-ui/lib/dialog';
import FlatButton from '../../../node_modules/material-ui/lib/flat-button';
import TextField from '../../../node_modules/material-ui/lib/text-field';
import SelectField from '../../../node_modules/material-ui/lib/select-field';
import MenuItem from '../../../node_modules/material-ui/lib/menus/menu-item';
import Checkbox from 'material-ui/lib/checkbox';

export default class ClientDialog extends React.Component {
    static propTypes = {
        onSearchObject: React.PropTypes.func
    };

    constructor(props) {
        super(props)

        this.onSearchHandler = this.onSearchHandler.bind(this)
        this.onResetHandler = this.onResetHandler.bind(this)
        this.onRoomIdChange = this.onRoomIdChange.bind(this)
        this.onClientIdChange = this.onClientIdChange.bind(this)
        this.onCheckInDateChange = this.onCheckInDateChange.bind(this)
        this.onTermChange = this.onTermChange.bind(this)
        this.isPassportValid = this.isPassportValid.bind(this)
        this.onCheck = this.onCheck.bind(this)
    }

    changeState(object) {
        this.setState({
            object: {
                ...this.state.object,
                ...object
            }
        })
    }

    onRoomIdChange(e) {
        this.changeState({RoomId: e.target.value});
    }

    onClientIdChange(e) {
        this.changeState({ClientId: e.target.value});
    }

    onCheckInDateChange(e, date) {
        this.changeState({CheckInDate: date});
    }

    onTermChange(e) {
        this.changeState({Term: e.target.value});
    }

    onSearchHandler() {
        this.props.onSearchObject(this.state.object);
    }

    onResetHandler() {
        this.setState({
            object: {
                RoomId: '',
                ClientId: '',
                CheckInDate: '',
                Term: ''
            }
        })
    }

    render() {
        const {RoomId, ClientId, CheckInDate, Term} = this.state.object
        return (
            <div>
                <TextField type="number" value={RoomId} hintText="RoomId" onChange={this.onRoomIdChange}/>
                <br/>
                <TextField type="number" value={ClientId} hintText="ClientId" onChange={this.onClientIdChange}/>
                <br/>
                <DatePicker value={CheckInDate} hintText="CheckInDate" container="dialog" mode="landscape"
                            onChange={this.onCheckInDateChange}/>
                <br/>
                <TextField type="number" value={Term} hintText="Term" onChange={this.onTermChange}/>
                <br/>
                <FlatButton label="Search" secondary={true} onClick={this.onSearchHandler}/>
                <FlatButton label="Reset" secondary={true} onClick={this.onResetHandler}/>
            </div>)
    }
}