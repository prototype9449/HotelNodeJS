import React from 'react';
import Dialog from '../../../node_modules/material-ui/lib/dialog';
import FlatButton from '../../../node_modules/material-ui/lib/flat-button';
import TextField from '../../../node_modules/material-ui/lib/text-field';
import SelectField from '../../../node_modules/material-ui/lib/select-field';
import MenuItem from '../../../node_modules/material-ui/lib/menus/menu-item';
import Checkbox from 'material-ui/lib/checkbox';

export default class ClientSearch extends React.Component {
    static propTypes = {
        onSearchObject: React.PropTypes.func
    };

    constructor(props) {
        super(props)

        this.onSearchHandler = this.onSearchHandler.bind(this)
        this.onResetHandler = this.onResetHandler.bind(this)
        this.onIdChange = this.onIdChange.bind(this)
        this.onFullNameChange = this.onFullNameChange.bind(this)
        this.onPassportChange = this.onPassportChange.bind(this)
        this.onSexChange = this.onSexChange.bind(this)
        this.isPassportValid = this.isPassportValid.bind(this)
        this.onCheck = this.onCheck.bind(this)
        this.state = this.getDefaultState()
    }

    getDefaultState() {
        return {
            object: {
                FullName: '',
                Id: '',
                Passport: '',
                Sex: null
            },
            isChecked: false
        }
    }

    onIdChange(e) {
        if (e.target.value < 0)
            return;

        this.changeState({
            Id: e.target.value
        })

    }

    onFullNameChange(e) {
        this.changeState({
            FullName: e.target.value
        })
    }

    onPassportChange(e) {
        this.changeState({
            Passport: e.target.value
        })
    }

    isPassportValid() {
        const reg = /^[0-9]{6}[-]{1}[0-9]{4}$/
        return this.state.object.Passport.match(reg) !== null
    }

    onSexChange(event, index, value) {
        this.changeState({
            Sex: value == 1
        })
    }

    onSearchHandler() {
        this.props.onSearchObject(this.state.object);
    }

    onCheck(target, isChecked) {
        this.setState({isChecked})
    }

    onResetHandler() {
        this.setState(this.getDefaultState())
    }

    render() {
        const {isChecked} = this.state
        const {Id, FullName, Passport, Sex} = this.state.object

        const sex = Sex ? 1 : 0
        return (
            <div>
                <TextField type="text" value={Id} hintText="Id" onChange={this.onIdChange}/> }
                <br/>
                <TextField type="text" hintText="FullName" value={FullName} onChange={this.onFullNameChange}/>
                <br/>
                <TextField type="text" hintText="Passport" value={Passport} onChange={this.onPassportChange}/>
                <br/>
                <Checkbox checked={isChecked} onCheck={this.onCheck}/>
                <SelectField value={sex} onChange={this.onSexChange} floatingLabelText="Sex" disabled={isChecked}>
                    <MenuItem value={1} primaryText="Man"/>
                    <MenuItem value={0} primaryText="Woman"/>
                </SelectField>
                <FlatButton label="Search" secondary={true} onClick={this.onSearchHandler}/>
                <FlatButton label="Reset" secondary={true} onClick={this.onResetHandler}/>
            </div>)
    }
}