import React from 'react';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import TextField from 'material-ui/lib/text-field';
import getActions from '../create-cancel-actions.jsx';
import SelectField from 'material-ui/lib/select-field';
import MenuItem from 'material-ui/lib/menus/menu-item';

export default class ClientDialog extends React.Component {
    static propTypes = {
        object: React.PropTypes.shape({
            Id: React.PropTypes.number,
            FullName: React.PropTypes.string,
            Passport: React.PropTypes.string,
            Sex: React.PropTypes.string
        }),
        isShownId: React.PropTypes.bool,
        isOpen: React.PropTypes.bool,
        currentTableName: React.PropTypes.string,
        ownTableName: React.PropTypes.string,
        onCreateObject: React.PropTypes.func,
        onCloseDialog: React.PropTypes.func
    };

    static defaultProps = {
        object: {
            Id: 0,
            FullName: '',
            Passport: '',
            Sex: 'Man'
        },
        isOpen: false,
        isShownId: false
    };

    constructor(props) {
        super(props)
        const {Id, FullName, Passport, Sex} = this.props.object
        this.state = {object: {Id, FullName, Passport, Sex}}

        this.onCreateHandler = this.onCreateHandler.bind(this)
        this.onIdChange = this.onIdChange.bind(this)
        this.onFullNameChange = this.onFullNameChange.bind(this)
        this.onPassportChange = this.onPassportChange.bind(this)
        this.onSexChange = this.onSexChange.bind(this)
        this.isPassportValid = this.isPassportValid.bind(this)
    }

    getCreatedObject() {
        if (this.props.isShownId) {
            return this.state
        }
        ({FullName, Passport, Sex} = this.props.object)

        return {FullName, Passport, Sex}
    }

    changeState(object) {
        this.setState({
            object: {
                ...this.state.object,
                ...object
            }
        })
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
            Sex: value
        })
    }

    onCreateHandler() {
        this.props.onCreateObject(this.getCreatedObject());
    }

    render() {
        const {isOpen, isShownId, onCloseDialog, currentTableName, ownTableName} = this.props
        const {Id, FullName, Passport, Sex} = this.state.object

        const actions = getActions(this.onCreateHandler, onCloseDialog, !this.isPassportValid())


        return <Dialog className="dialog"
                       title="Create client"
                       actions={actions}
                       modal={false}
                       open={isOpen && currentTableName == ownTableName}
                       onRequestClose={onCloseDialog}>
            <div>
                {isShownId && <TextField type="text" value={Id} hintText="Id" onChange={this.onIdChange}/> }
                <br/>
                <TextField type="text" hintText="FullName" value={FullName} onChange={this.onFullNameChange}/>
                <br/>
                <TextField type="text" hintText="Passport" value={Passport} onChange={this.onPassportChange}/>
                <br/>
                <SelectField value={Sex} onChange={this.onSexChange} floatingLabelText="Sex">
                    <MenuItem value="Man" primaryText="Man"/>
                    <MenuItem value="Woman" primaryText="Woman"/>
                </SelectField>
            </div>
        </Dialog>
    }
}