import React from 'react';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import TextField from 'material-ui/lib/text-field';
import getActions from '../create-cancel-actions.jsx';
import SelectField from 'material-ui/lib/select-field';
import MenuItem from 'material-ui/lib/menus/menu-item';
import autobind from 'autobind-decorator'

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
        currentTableName : React.PropTypes.string,
        ownTableName : React.PropTypes.string,
        onCreateHandler: React.PropTypes.func,
        onCancelHandler: React.PropTypes.func
    };

    static defaultProps = {
        object: {
            Id: 0,
            FullName: '',
            Passport: '',
            Sex: 'Man'
        },
        isOpen : false,
        isShownId : false
    };

    constructor(props) {
        super(props)
        ({Id, FullName, Passport, Sex} = this.props.object)
        this.state = {object: {Id, FullName, Passport, Sex}}
    }

    getCreatedObject() {
        if (this.props.isShownId) {
            return this.state
        }
        ({FullName, Passport, Sex} = this.props.object)

        return {FullName, Passport, Sex}
    }

    @autobind
    onIdChange(e) {
        if (e.target.value < 0)
            return;
        this.setState({Id: e.target.value})
    }

    @autobind
    onFullNameChange(e) {
        this.setState({FullName: e.target.value})
    }

    @autobind
    onPassportChange(e) {
        const reg = /^[0-9]{6}[-]{1}[0-9]{4}$/
        if (e.target.value.match(reg)) {
            this.setState({Passport: e.target.value})
        }
    }

    @autobind
    onSexChange(event, index, value) {
        this.setState({Sex: value})
    }

    @autobind
    onCreateHandler() {
        this.props.onCreateHandler(this.getCreatedObject());
    }

    render() {
        const {isOpen, isShownId, onCancelHandler, currentTableName, ownTableName} = this.props
        const {Id, FullName, Passport, Sex} = this.props.object
        const actions = getActions(this.onCreateHandler, onCancelHandler)

        return <Dialog className="dialog"
                       title="Create client"
                       actions={actions}
                       modal={false}
                       open={isOpen && currentTableName == ownTableName}
                       onRequestClose={onCancelHandler}>
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