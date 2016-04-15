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
        RoomId: React.PropTypes.number,
        ClientId: React.PropTypes.number,
        CheckInDate: React.PropTypes.string,
        Term: React.PropTypes.number,
        isOpen: React.PropTypes.bool,
        onCreateHandler : React.PropTypes.func,
        onCancelHandler : React.PropTypes.func
    };

    static defaultProps = {
        RoomId: 0,
        ClientId: 0,
        CheckInDate: '',
        Term: 5
    }

    constructor(props) {
        super(props);
        ({RoomId, ClientId, CheckInDate, Term} = this.props);
        this.state = {RoomId, ClientId, CheckInDate, Term};
    }

    @autobind
    getCreatedObject() {
        return this.state;
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

    render() {
        const actions = getActions(this.props.onCreateHandler, this.props.onCancelHandler);

        const fields =
            (<div>
                <TextField type="number" hintText="RoomId" onChange={this.onRoomIdChange}/>
                <br/>
                <TextField type="number" hintText="ClientId" onChange={this.onClientIdChange}/>
                <br/>
                <DatePicker hintText="CheckInDate" container="dialog" mode="landscape"
                            onChange={this.onCheckInDateChange}/>
                <br/>
                <TextField type="number" hintText="Term" onChange={this.onTermChange}/>
                <br/>
            </div>);

        return <Dialog className="dialog"
                       title="Create RoomClient"
                       actions={actions}
                       modal={false}
                       open={this.props.isOpen}
                       onRequestClose={this.props.onCancelHandler}>
            {fields}
        </Dialog>;
    }
}