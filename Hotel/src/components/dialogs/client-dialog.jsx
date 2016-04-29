import React from 'react';
import {Modal, DropdownButton, MenuItem} from 'react-bootstrap'

import {isNumber} from '../../helpers/commonHelper'

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
    }

    getProps = () => {
        const object = this.props.isForUpdate
            ? this.props.object
            : {
            Id: '',
            FullName: '',
            Passport: '',
            Sex: false
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
        const {FullName, Passport, Sex} = this.state.object
        return {FullName, Passport, Sex}
    }

    changeState = (object) => {
        this.setState({
            object: {
                ...this.state.object,
                ...object
            }
        })
    }

    isFormValid = () => {
        const {Id, Passport} = this.state.object

        const isPassportValid = Passport.match(/^[0-9]{6}[-]{1}[0-9]{4}$/) !== null
        const isIdValid = isNumber(Id) && Id >= 0
        return isIdValid && isPassportValid
    }

    onSexChange = (e, key) => this.changeState({Sex: key === 1})

    onFieldChange = (field) => ({target : {value}}) => this.changeState({[field]: value})

    onUpdateHandler = () => this.props.onUpdateObject(this.getProps().object, this.getCreatedObject());

    onCreateHandler = () => this.props.onCreateObject(this.getCreatedObject());

    render() {
        const {isOpen, isForUpdate, onCloseDialog, currentTableName, ownTableName} = this.getProps()
        if (currentTableName !== ownTableName) return null
        const {Id, FullName, Passport, Sex} = this.state.object

        const callback = isForUpdate ? this.onUpdateHandler : this.onCreateHandler
        const buttonText = isForUpdate ? 'Update' : 'Create'
        const sexTitle = Sex ? 'Man' : 'Woman'

        const sex = Sex ? 1 : 0
        return <div>
            <Modal show={isOpen && currentTableName == ownTableName} onHide={onCloseDialog}>
                <Modal.Header closeButton>
                    <Modal.Title>Create client</Modal.Title>
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
                            <label className="dialog-label">FullName</label>
                            <input type="text" value={FullName} placeholder="FullName"
                                   className="form-control"
                                   onChange={this.onFieldChange('FullName')}/>

                        </div>
                        <div class="form-group">
                            <label className="dialog-label">Passport</label>
                            <input type="text" value={Passport} placeholder="Passport"
                                   onChange={this.onFieldChange('Passport')} className="form-control"/>
                        </div>
                        <div>
                            <label className="checkbox-label">Sex</label>
                            <DropdownButton value={sex} onSelect={this.onSexChange} title={sexTitle}
                                            id="dropDownButtonClient">
                                <MenuItem eventKey={0}>Woman</MenuItem>
                                <MenuItem eventKey={1}>Man</MenuItem>
                            </DropdownButton>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <button disabled={!this.isFormValid()} className="btn btn-success"
                            onClick={callback}>{buttonText}</button>
                    <button className="btn btn-primary" onClick={onCloseDialog}>Close</button>
                </Modal.Footer>
            </Modal>
        </div>
    }
}