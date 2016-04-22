import React from 'react';
import {Modal, Button, Input} from 'react-bootstrap'
import Toggle from 'react-toggle'

export default class RoomDialog extends React.Component {
    static propTypes = {
        object: React.PropTypes.shape({
            Id: React.PropTypes.number,
            Floor: React.PropTypes.number,
            Price: React.PropTypes.number,
            Comfort: React.PropTypes.number,
            Occupation: React.PropTypes.bool
        }),
        isOpen: React.PropTypes.bool,
        isForUpdate: React.PropTypes.bool,
        currentTableName: React.PropTypes.string,
        ownTableName: React.PropTypes.string,
        onCreateObject: React.PropTypes.func,
        onUpdateObject: React.PropTypes.func,
        onCloseDialog: React.PropTypes.func
    };

    constructor(props) {
        super(props)
        const {Id, Floor, Price, Comfort, Occupation} = this.getProps().object
        this.state = {object: {Id, Floor, Price, Comfort, Occupation}}

        this.getCreatedObject = this.getCreatedObject.bind(this)
        this.onIdChange = this.onIdChange.bind(this)
        this.onFloorChange = this.onFloorChange.bind(this)
        this.onPriceChange = this.onPriceChange.bind(this)
        this.onComfortChange = this.onComfortChange.bind(this)
        this.onOccupationChange = this.onOccupationChange.bind(this)
        this.onCreateHandler = this.onCreateHandler.bind(this)
        this.onUpdateHandler = this.onUpdateHandler.bind(this)
        this.getProps = this.getProps.bind(this)
    }

    getProps() {
        const object = this.props.isForUpdate
            ? this.props.object
            : {
            Id: 0,
            Floor: 1,
            Price: '100.00',
            Comfort: 1,
            Occupation: false
        }
        return {
            ...this.props,
            object
        }
    }

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
        const {Floor, Price, Comfort, Occupation} = this.state.object
        return {Floor, Price, Comfort, Occupation}
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

        this.changeState({Id: e.target.value})
    }

    onFloorChange(e) {
        if (e.target.value < 1 || e.target.value > 10)
            return;

        this.changeState({Floor: e.target.value})
    }

    onPriceChange(e) {
        this.changeState({Price: e.target.value})
    }

    isPriceValid() {
        const reg = /^ *\$?\d+(?:\.\d{2})? *$/
        return this.state.object.Price, toString().match(reg) !== null
    }

    isComfortValid() {
        const comfort = this.state.object.Comfort
        return comfort > 0 && comfort < 11
    }

    onComfortChange(e) {
        this.changeState({Comfort: e.target.value})
    }

    onOccupationChange(event, value) {
        this.changeState({Occupation: value})
    }

    onCreateHandler() {
        this.props.onCreateObject(this.getCreatedObject());
    }

    onUpdateHandler() {
        this.props.onUpdateObject(this.getProps().object, this.getCreatedObject());
    }

    render() {
        const {onCloseDialog, isOpen, isForUpdate, currentTableName, ownTableName} = this.getProps()
        if (currentTableName !== ownTableName) return null

        const {Id, Floor, Price, Comfort, Occupation} = this.state.object
        //const callback = isForUpdate ? this.onUpdateHandler : this.onCreateHandler
        //const buttonText = isForUpdate ? 'Update' : 'Create'
        //const actions = getActions(buttonText, callback, onCloseDialog, !this.isPriceValid() && !this.isComfortValid())

        return <div>
            <Modal show={isOpen && currentTableName == ownTableName} onHide={onCloseDialog}>
                <Modal.Header closeButton>
                    <Modal.Title>Create room</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        {isForUpdate && <TextField type="number" value={Id} hintText="Id" onChange={this.onIdChange}/>}
                        <br/>
                        <Input type="number" placeholder="Floor" value={Floor} onChange={this.onFloorChange}/>
                        <br/>
                        <Input type="text" placeholder="Price" value={Price} onChange={this.onPriceChange}/>
                        <br/>
                        <Input type="number" placeholder="Comfort" value={Comfort} onChange={this.onComfortChange}/>
                        <br/>
                        <Toggle
                            checked={Occupation}
                            onCheck={this.onOccupationChange}/>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={onCloseDialog}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    }
}