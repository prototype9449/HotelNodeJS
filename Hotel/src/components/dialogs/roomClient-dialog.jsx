import React from 'react';
import {Modal, Button, Input} from 'react-bootstrap'
import InputMoment from '../../datePicker/input-moment.jsx'
import moment from 'moment'

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
        onUpdateObject: React.PropTypes.func,
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

    componentWillReceiveProps(nextProps) {
        if (nextProps.isForUpdate) {
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

    onUpdateHandler() {
        this.props.onUpdateObject(this.getProps().object, this.getCreatedObject());
    }

    render() {
        const {onCloseDialog, isOpen, currentTableName, ownTableName, isForUpdate} = this.getProps()
        if (currentTableName !== ownTableName) return null
        const {RoomId, ClientId, CheckInDate, Term} = this.state.object
        //const callback = isForUpdate ? this.onUpdateHandler : this.onCreateHandler
        //const buttonText = isForUpdate ? 'Update' : 'Create'
       // const actions = getActions(buttonText, callback, onCloseDialog)

        return <div>
            <Modal show={isOpen && currentTableName == ownTableName} onHide={onCloseDialog}>
                <Modal.Header closeButton>
                    <Modal.Title>Create roomClient</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <Input type="number" value={RoomId} placeholder="RoomId" onChange={this.onRoomIdChange}/>
                        <br/>
                        <Input type="number" value={ClientId} placeholder="ClientId" onChange={this.onClientIdChange}/>
                        <br/>
                        <InputMoment moment={moment(CheckInDate)} onChange={this.onCheckInDateChange}/>
                        <br/>
                        <Input type="number" value={Term} placeholder="Term" onChange={this.onTermChange}/>
                        <br/>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={onCloseDialog}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    }
}