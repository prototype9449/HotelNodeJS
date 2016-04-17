import React from 'react';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import TextField from 'material-ui/lib/text-field';
import getActions from '../create-cancel-actions.jsx';
import SelectField from 'material-ui/lib/select-field';
import MenuItem from 'material-ui/lib/menus/menu-item';
import DatePicker from 'material-ui/lib/date-picker/date-picker';

export default class RoomDialog extends React.Component {
    static propTypes = {
        object: React.PropTypes.shape({
            RoomId: React.PropTypes.number,
            ClientId: React.PropTypes.number,
            CheckInDate: React.PropTypes.string,
            Term: React.PropTypes.number
        }),
        isOpen: React.PropTypes.bool,
        currentTableName: React.PropTypes.string,
        ownTableName: React.PropTypes.string,
        onCreateObject: React.PropTypes.func,
        onUpdateObject : React.PropTypes.func,
        onCloseDialog: React.PropTypes.func
    };

    getProps() {
        const object = this.props.isForUpdate
            ? this.props.object
            : {
            RoomId: 0,
            ClientId: 0,
            CheckInDate: '',
            Term: 5
        }

        return {
            ...this.props,
            object
        }
    }

    constructor(props) {
        super(props);
        const {RoomId, ClientId, CheckInDate, Term} = this.getProps().object
        this.state = {object: {RoomId, ClientId, CheckInDate, Term}}

        this.getCreatedObject = this.getCreatedObject.bind(this)
        this.onRoomIdChange = this.onRoomIdChange.bind(this)
        this.onClientIdChange = this.onClientIdChange.bind(this)
        this.onCheckInDateChange = this.onCheckInDateChange.bind(this)
        this.onTermChange = this.onTermChange.bind(this)
        this.onCreateHandler = this.onCreateHandler.bind(this)
        this.onUpdateHandler = this.onUpdateHandler.bind(this)
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.isForUpdate) {
            this.setState({object: nextProps.object})
        } else {
            this.setState({object: this.getProps().object})
        }
    }

    getCreatedObject() {
        return this.state.object
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

    onCreateHandler() {
        this.props.onCreateObject(this.getCreatedObject());
    }

    onUpdateHandler(){
        this.props.onUpdateObject(this.getProps().object, this.getCreatedObject());
    }

    render() {
        const {onCloseDialog, isOpen, currentTableName, ownTableName, isForUpdate} = this.getProps()
        if(currentTableName !== ownTableName) return null
        const {RoomId, ClientId, CheckInDate, Term} = this.state.object
        const callback = isForUpdate ? this.onUpdateHandler : this.onCreateHandler
        const buttonText = isForUpdate ? 'Update' : 'Create'
        const actions = getActions(buttonText, callback, onCloseDialog)

        return <Dialog className="dialog"
                       title="Create RoomClient"
                       actions={actions}
                       modal={false}
                       open={isOpen && currentTableName == ownTableName}
                       onRequestClose={onCloseDialog}>
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
            </div>
        </Dialog>
    }
}