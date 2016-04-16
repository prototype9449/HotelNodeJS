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
        onCloseDialog: React.PropTypes.func
    };

    static defaultProps = {
        object: {
            RoomId: 0,
            ClientId: 0,
            CheckInDate: '',
            Term: 5
        },
        isOpen: false
    }

    constructor(props) {
        super(props);
        const {RoomId, ClientId, CheckInDate, Term} = this.props.object
        this.state = {object: {RoomId, ClientId, CheckInDate, Term}}

        this.getCreatedObject = this.getCreatedObject.bind(this)
        this.onRoomIdChange = this.onRoomIdChange.bind(this)
        this.onClientIdChange = this.onClientIdChange.bind(this)
        this.onCheckInDateChange = this.onCheckInDateChange.bind(this)
        this.onTermChange = this.onTermChange.bind(this)
        this.onCreateHandler = this.onCreateHandler.bind(this)
    }

    getCreatedObject() {
        return this.state.object
    }

    onRoomIdChange(e) {
        if (e.target.value < 0)
            return;

        this.setState({RoomId: e.target.value});
    }


    onClientIdChange(e) {
        if (e.target.value < 0)
            return;

        this.setState({ClientId: e.target.value});
    }

    onCheckInDateChange(e) {
        this.setState({CheckInDate: e.target.value});
    }

    onTermChange(e) {
        if (e.target.value < 0)
            return;

        this.setState({Term: e.target.value});
    }

    onCreateHandler() {
        this.props.onCreateObject(this.getCreatedObject())
    }

    render() {
        const {onCloseDialog, isOpen} = this.props
        const {RoomId, ClientId, CheckInDate, Term} = this.props.object
        const actions = getActions(this.onCreateHandler, onCloseDialog)

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