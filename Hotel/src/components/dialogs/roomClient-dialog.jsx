import React from 'react';
import {Modal} from 'react-bootstrap'
import moment from 'moment'

import {isNumber} from '../../helpers/commonHelper'

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
            RoomId: '',
            ClientId: '',
            CheckInDate: moment(new Date()).format('YYYY-MM-DDTHH:mm:ss'),
            Term: ''
        }

        return {
            ...this.props,
            object
        }
    }

    constructor(props) {
        super(props);
        const {RoomId, ClientId, CheckInDate, Term} = this.getProps().object
        this.state = {object: {RoomId, ClientId, CheckInDate: new Date(CheckInDate), Term}}
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isForUpdate) {
            this.setState({object: nextProps.object})
        } else {
            this.setState({object: this.getProps().object})
        }
    }

    isFormValid = () => {
        const {RoomId, ClientId, Term} = this.state.object
        const isTermValid = isNumber(Term) && +Term > 0
        const isRoomIdValid = isNumber(RoomId) && +RoomId >= 0
        const isClientIdValid = isNumber(ClientId) && +ClientId >= 0

        return isTermValid && isRoomIdValid && isClientIdValid
    }

    getCreatedObject = () => {
        const {object} = this.state
        const result = Object.keys(object).reduce((obj, x) => {
            if (object[x] == null) {
                return obj
            } else {
                return {
                    ...obj,
                    [x]: object[x]
                }
            }
        }, {})

        if (result.CheckInDate) {
            result.CheckInDate = moment(result.CheckInDate).utc().add(3, 'hour').format().replace('Z', '.000Z')
        }
        return result
    }

    changeState(object) {
        this.setState({
            object: {
                ...this.state.object,
                ...object
            }
        })
    }

    onFieldChange = (field) => ({target : {value}}) =>  this.changeState({[field]: value})

    onCreateHandler = () => this.props.onCreateObject(this.getCreatedObject());

    onUpdateHandler = () => this.props.onUpdateObject(this.getProps().object, this.getCreatedObject());

    render() {
        const {onCloseDialog, isOpen, currentTableName, ownTableName, isForUpdate} = this.getProps()
        if (currentTableName !== ownTableName) return null
        const {RoomId, ClientId, CheckInDate, Term} = this.state.object
        const callback = isForUpdate ? this.onUpdateHandler : this.onCreateHandler
        const buttonText = isForUpdate ? 'Update' : 'Create'

        return <div>
            <Modal show={isOpen && currentTableName == ownTableName} onHide={onCloseDialog}>
                <Modal.Header closeButton>
                    <Modal.Title>Create roomClient</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div class="form-group">
                            <label className="dialog-label">RoomId</label>
                            <input type="text" value={RoomId} placeholder="RoomId" onChange={this.onFieldChange('RoomId')}
                                   className="form-control"/>
                        </div>
                        <div class="form-group">
                            <label className="dialog-label">ClientId</label>
                            <input type="text" value={ClientId} placeholder="ClientId" onChange={this.onFieldChange('ClientId')}
                                   className="form-control"/>
                        </div>
                        <div class="form-group">
                            <label className="dialog-label">CheckInDate</label>
                            <input type="datetime-local" step="1"
                                   value={moment(CheckInDate).format('YYYY-MM-DDTHH:mm:ss')}
                                   onChange={this.onFieldChange('CheckInDate')}/>
                        </div>
                        <div class="form-group">
                            <label className="dialog-label">Term</label>
                            <input type="text" value={Term} placeholder="Term" onChange={this.onFieldChange('Term')}
                                   className="form-control"/>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <button disabled={!this.isFormValid()} onClick={callback}
                            className="btn btn-success">{buttonText}</button>
                    <button onClick={onCloseDialog} className="btn btn-primary">Close</button>
                </Modal.Footer>
            </Modal>
        </div>
    }
}