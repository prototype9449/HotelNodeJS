import React from 'react';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import TextField from 'material-ui/lib/text-field';
import getActions from '../create-cancel-actions.jsx';
import SelectField from 'material-ui/lib/select-field';
import MenuItem from 'material-ui/lib/menus/menu-item';

export default class RoomDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Id : 0,
            Floor : 1,
            Price : 100.00,
            Comfort : 1,
            Occupation : false
        }
    }

    getCreatedObject() {
        return this.state;
    }

    onFloorChange(e){
        if(e.target.value < 1 || e.target.value > 10)
            return;

        this.setState({Floor : e.target.value});
    }

    onPriceChange(e){
        const reg = /^ *\$?\d+(?:\.\d{2})? *$/;
        if(!e.target.value.match(reg))
            return;

        this.setState({Price: e.target.value});
    }

    onComfortChange(e){
        if(e.target.value < 1 || e.target.value > 10)
            return;

        this.setState({Comfort : e.target.value});
    }

    onOccupationChange(event, index, value){
        this.setState({Occupation : value});
    }

    render() {
        const actions = getActions(this.props.createHandle, this.props.cancelHandle);

        const fields =
            (<div>
                <TextField type="number" hintText="Floor" onChange = {this.onFloorChange.bind(this)}/>
                <br/>
                <TextField type="text" hintText="Price" onChange = {this.onPriceChange.bind(this)}/>
                <br/>
                <TextField type="number" hintText="Comfort" onChange = {this.onComfortChange.bind(this)}/>
                <br/>
                <Toggle
                    label="Occupation"
                    toogle = {this.state.Occupation}
                    onToggle = {this.onOccupationChange.bind(this)}
                />
            </div>);

        return <Dialog className="dialog"
                       title="Create room"
                       actions={actions}
                       modal={false}
                       open={this.props.isOpen}
                       onRequestClose={this.props.cancelHandle}>
            {fields}
        </Dialog>;
    }
}