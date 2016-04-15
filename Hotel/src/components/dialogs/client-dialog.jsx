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
        Id: React.PropTypes.number,
        FullName: React.PropTypes.string,
        Passport: React.PropTypes.string,
        Sex: React.PropTypes.string,
        isShownId: React.PropTypes.bool,
        isOpen: React.PropTypes.bool,
        onCreateHandler : React.PropTypes.func,
        onCancelHandler : React.PropTypes.func
    };

    static defaultProps = {
        Id: 0,
        FullName: '',
        Passport: '',
        Sex: 'Man',
        isShownId: true
    };

    constructor(props) {
        super(props)
        ({Id, FullName, Passport, Sex} = this.props);
        this.state = {Id, FullName, Passport, Sex}
    }

    @autobind
    getCreatedObject() {
        if (this.props.isShownId) {
            return this.state
        }

        return {
            FullName: this.state.FullName,
            Passport: this.state.Passport,
            Sex: this.state.Sex
        }
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

    render() {
        const actions = getActions(this.props.onCreateHandler, this.props.onCancelHandler)

        const textFields =
            (<div>
                {this.props.isShownId && <TextField type="text" hintText="Id" onChange={this.onIdChange}/> }
                <br/>
                <TextField type="text" hintText="FullName" onChange={this.onFullNameChange}/>
                <br/>
                <TextField type="text" hintText="Passport" onChange={this.onPassportChange}/>
                <br/>
                <SelectField value={this.state.Sex} onChange={this.onSexChange} floatingLabelText="Sex">
                    <MenuItem value="Man" primaryText="Man"/>
                    <MenuItem value="Woman" primaryText="Woman"/>
                </SelectField>
            </div>)

        return <Dialog className="dialog"
                       title="Create client"
                       actions={actions}
                       modal={false}
                       open={this.props.isOpen}
                       onRequestClose={this.props.onCancelHandler}>
            {textFields}
        </Dialog>
    }
}