import React from 'react';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import TextField from 'material-ui/lib/text-field';
import getActions from '../create-cancel-actions.jsx';
import SelectField from 'material-ui/lib/select-field';
import MenuItem from 'material-ui/lib/menus/menu-item';

export default class ClientDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            FullName : '',
            Passport : '',
            Sex : 'Man'
        }
    }

    getCreatedObject() {
        return this.state;
    }

    onFullNameChange(e){
        this.setState({FullName : e.target.value});
    }

    onPassportChange(e){
        const reg = /^[0-9]{6}[-]{1}[0-9]{4}$/;
        if(e.target.value.match(reg)){
            this.setState({Passport : e.target.value});
        }
    }

    onSexChange(event, index, value) {
        this.setState({Sex : value});
    }

    render() {
        const actions = getActions(this.props.createHandle, this.props.cancelHandle);

        const textFields =
            (<div>
                <TextField type="text" hintText="FullName" onChange = {this.onFullNameChange.bind(this)}/>
                <br/>
                <TextField type="text" hintText="Passport" onChange = {this.onPassportChange.bind(this)}/>
                <br/>
                <SelectField value={this.state.Sex} onChange={this.onSexChange.bind(this)} floatingLabelText="Sex">
                    <MenuItem value="Man" primaryText="Man"/>
                    <MenuItem value="Woman" primaryText="Woman"/>
                </SelectField>
            </div>);

        return <Dialog className="dialog"
                       title="Create client"
                       actions={actions}
                       modal={false}
                       open={this.props.isOpen}
                       onRequestClose={this.props.cancelHandle}>
            {textFields}
        </Dialog>;
    }
}