import React from 'react';
import {Modal, DropdownButton, MenuItem} from 'react-bootstrap'

import {isNumber} from '../../helpers/commonHelper'

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
    }

    getProps = () => {
        const object = this.props.isForUpdate
            ? this.props.object
            : {
            Id: '',
            Floor: '',
            Price: '',
            Comfort: '',
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

    getCreatedObject = () => {
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

    isFormValid = () => {
        const reg = /^ *\$?\d+(?:\.\d{2})? *$/
        const {Price} = this.state.object

        return Price.toString().match(reg) !== null
    }

    onFieldChange = (field) => ({target : {value}}) => this.changeState({[field]: value})

    onOccupationChange = (e, key) =>  this.changeState({Occupation: key === 1})

    onCreateHandler = () =>  this.props.onCreateObject(this.getCreatedObject());

    onUpdateHandler = () => this.props.onUpdateObject(this.getProps().object, this.getCreatedObject());

    render() {
        const {isOpen,onCloseDialog, isForUpdate, currentTableName, ownTableName} = this.getProps()
        if (currentTableName !== ownTableName) return null

        const {Id, Floor, Price, Comfort, Occupation} = this.state.object
        const callback = isForUpdate ? this.onUpdateHandler : this.onCreateHandler
        const buttonText = isForUpdate ? 'Update' : 'Create'

        const occupationTitle = Occupation ? 'Occupied' : 'Free'
        return <div>
            <Modal show={isOpen && currentTableName == ownTableName} onHide={onCloseDialog}>
                <Modal.Header closeButton>
                    <Modal.Title>Create room</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        {isForUpdate &&
                        <div class="form-group">
                            <label className="dialog-label">Id</label>
                            <input type="text" value={Id} placeholder="Id" onChange={this.onFieldChange('Id')}
                                   className="form-control"/>
                        </div>}
                        <div class="form-group">
                            <label className="dialog-label">Floor</label>
                            <input type="text" value={Floor} placeholder="Floor" onChange={this.onFieldChange('Floor')}
                                   className="form-control"/>
                        </div>
                        <div class="form-group">
                            <label className="dialog-label">Price</label>
                            <input type="text" value={Price} placeholder="Price" onChange={this.onFieldChange('Price')}
                                   className="form-control"/>
                        </div>
                        <div class="form-group">
                            <label className="dialog-label">Comfort</label>
                            <input type="text" value={Comfort} placeholder="Comfort"
                                   onChange={this.onFieldChange('Comfort')}
                                   className="form-control"/>
                        </div>
                        <div class="form-group">
                            <label className="checkbox-label">Occupation</label>
                            <DropdownButton id="dropDownButtonRoom"
                                            onSelect={this.onOccupationChange}
                                            title={occupationTitle}>
                                <MenuItem eventKey={1}>Occupied</MenuItem>>
                                <MenuItem eventKey={0}>Free</MenuItem>
                            </DropdownButton>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <button disabled={!this.isFormValid()} className="btn btn-success"
                            onClick={callback}>{buttonText}</button>
                    <button onClick={onCloseDialog} className="btn btn-primary">Close</button>
                </Modal.Footer>
            </Modal>
        </div>
    }
}