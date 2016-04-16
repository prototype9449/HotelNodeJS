import React from 'react';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import TextField from 'material-ui/lib/text-field';
import getActions from '../create-cancel-actions.jsx';
import SelectField from 'material-ui/lib/select-field';
import MenuItem from 'material-ui/lib/menus/menu-item';
import DatePicker from 'material-ui/lib/date-picker/date-picker';
import autobind from 'autobind-decorator'

export default class RoomDialog extends React.Component {
    static propTypes = {
        object: React.PropTypes.shape({
            RoomId: React.PropTypes.number,
            ClientId: React.PropTypes.number,
            CheckInDate: React.PropTypes.string,
            Term: React.PropTypes.number
        }),
        isOpen: React.PropTypes.bool,
        currentTableName : React.PropTypes.string,
        ownTableName : React.PropTypes.string,
        onCreateHandler: React.PropTypes.func,
        onCancelHandler: React.PropTypes.func
    };

    static defaultProps = {
        object: {
            RoomId: 0,
            ClientId: 0,
            CheckInDate: '',
            Term: 5
        },
        isOpen : false
    }

    constructor(props) {
        super(props);
        ({RoomId, ClientId, CheckInDate, Term} = this.props.object)
        this.state = {object: {RoomId, ClientId, CheckInDate, Term}}
    }

    getCreatedObject() {
        return this.state.object
    }

    @autobind
    onRoomIdChange(e) {
        if (e.target.value < 0)
            return;

        this.setState({RoomId: e.target.value});
    }

    @autobind
    onClientIdChange(e) {
        if (e.target.value < 0)
            return;

        this.setState({ClientId: e.target.value});
    }

    @autobind
    onCheckInDateChange(e) {
        this.setState({CheckInDate: e.target.value});
    }

    @autobind
    onTermChange(e) {
        if (e.target.value < 0)
            return;

        this.setState({Term: e.target.value});
    }

    @autobind
    onCreateHandler(){
        this.props.onCreateHandler(this.getCreatedObject())
    }

    render() {
        const {onCancelHandler, isOpen} = this.props
        const {RoomId, ClientId, CheckInDate, Term} = this.props.object
        const actions = getActions(this.onCreateHandler, onCancelHandler)

        return <Dialog className="dialog"
                       title="Create RoomClient"
                       actions={actions}
                       modal={false}
                       open={isOpen && currentTableName == ownTableName}
                       onRequestClose={onCancelHandler}>
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