import React from 'react';
import getActions from '../create-cancel-actions.jsx';
import {Modal, DropdownButton, MenuItem, Button, Input} from 'react-bootstrap'

export default class ClientDialog extends React.Component {
    static propTypes = {
        object: React.PropTypes.shape({
            Id: React.PropTypes.number,
            FullName: React.PropTypes.string,
            Passport: React.PropTypes.string,
            Sex: React.PropTypes.bool
        }),
        isOpen: React.PropTypes.bool,
        currentTableName: React.PropTypes.string,
        ownTableName: React.PropTypes.string,
        onCreateObject: React.PropTypes.func,
        onUpdateObject: React.PropTypes.func,
        onCloseDialog: React.PropTypes.func
    };

    constructor(props) {
        super(props)
        const {Id, FullName, Passport, Sex} = this.getProps().object
        this.state = {object: {Id, FullName, Passport, Sex}}

        this.onCreateHandler = this.onCreateHandler.bind(this)
        this.onUpdateHandler = this.onUpdateHandler.bind(this)
        this.onIdChange = this.onIdChange.bind(this)
        this.onFullNameChange = this.onFullNameChange.bind(this)
        this.onPassportChange = this.onPassportChange.bind(this)
        this.onSexChange = this.onSexChange.bind(this)
        this.isPassportValid = this.isPassportValid.bind(this)
        this.getProps = this.getProps.bind(this)
    }

    getProps() {
        const object = this.props.isForUpdate
            ? this.props.object
            : {
            Id: 0,
            FullName: '',
            Passport: '',
            Sex: false
        }

        return {
            ...this.props,
            object
        }
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.isForUpdate) {
            this.setState({object: nextProps.object})
        } else {
            this.setState({object: this.getProps().object})
        }
    }

    getCreatedObject() {
        if (this.getProps().isForUpdate) {
            return this.state.object
        }
        const {FullName, Passport, Sex} = this.state.object
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

    onSexChange(value, event) {
        this.changeState({
            Sex: value == 1
        })
    }

    onUpdateHandler() {
        this.props.onUpdateObject(this.getProps().object, this.getCreatedObject());
    }

    onCreateHandler() {
        this.props.onCreateObject(this.getCreatedObject());
    }

    render() {
        const {isOpen, isForUpdate, onCloseDialog, currentTableName, ownTableName} = this.getProps()
        if (currentTableName !== ownTableName) return null
        const {Id, FullName, Passport, Sex} = this.state.object

        const callback = isForUpdate ? this.onUpdateHandler : this.onCreateHandler
        const buttonText = isForUpdate ? 'Update' : 'Create'
        const actions = getActions(buttonText, callback, onCloseDialog, !this.isPassportValid())

        const sex = Sex ? 1 : 0
        return <div>
            <Modal show={isOpen && currentTableName == ownTableName} onHide={onCloseDialog}>
                <Modal.Header closeButton>
                    <Modal.Title>Create client</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        {isForUpdate && <Input type="text" value={Id} placeholder="Id"
                                               onChange={this.onIdChange}/> }
                        <br/>
                        <Input type="text" placeholder="FullName" value={FullName}
                               onChange={this.onFullNameChange}/>
                        <br/>
                        <Input type="text" placeholder="Passport" value={Passport}
                               onChange={this.onPassportChange}/>
                        <br/>
                        <DropdownButton value={sex} onSelect={this.onSexChange} title="Sex">
                            <MenuItem eventKey={1}>Man</MenuItem>
                            <MenuItem eventKey={0}>Woman</MenuItem>
                        </DropdownButton>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={onCloseDialog}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    }
}