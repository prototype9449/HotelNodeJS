import React from 'react';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import TextField from 'material-ui/lib/text-field';
import getActions from '../create-cancel-actions.jsx';
import SelectField from 'material-ui/lib/select-field';
import MenuItem from 'material-ui/lib/menus/menu-item';
import DatePicker from 'material-ui/lib/date-picker/date-picker';

export default class RoomDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            RoomId : 0,
            CheckInDate : '',
            Term : 5
        }
    }

    getCreatedObject() {
        return this.state;
    }

    onRoomIdChange(e){
        if(e.target.value < 0)
            return;

        this.setState({RoomId : e.target.value});
    }

    onClientIdChange(e){
        if(e.target.value < 0)
            return;

        this.setState({ClientId : e.target.value});
    }

    onCheckInDateChange(e){

        this.setState({CheckInDate : e.target.value});
    }

    onTermChange(e){
        if(e.target.value < 0)
            return;

        this.setState({Term : e.target.value});
    }

    render() {
        const actions = getActions(this.props.createHandle, this.props.cancelHandle);

        const fields =
            (<div>
                <TextField type="number" hintText="RoomId" onChange = {this.onRoomIdChange.bind(this)}/>
                <br/>
                <TextField type="number" hintText="ClientId" onChange = {this.onClientIdChange.bind(this)}/>
                <br/>
                <DatePicker hintText="CheckInDate" container="dialog" mode="landscape" onChange = {this.onCheckInDateChange.bind(this)} />
                <br/>
                <TextField type="number" hintText="Term" onChange = {this.onTermChange.bind(this)}/>
                <br/>
            </div>);

        return <Dialog className="dialog"
                       title="Create RoomClient"
                       actions={actions}
                       modal={false}
                       open={this.props.isOpen}
                       onRequestClose={this.props.cancelHandle}>
            {fields}
        </Dialog>;
    }
}