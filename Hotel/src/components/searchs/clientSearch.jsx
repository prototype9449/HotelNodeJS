import React from 'react';
import { DropdownButton, MenuItem } from 'react-bootstrap'

function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function getSexName(value){
    if(value === null){
        return "Doesn't matter"
    } else {
        return value ? 'Man' : 'Woman'
    }
}

export default class ClientSearch extends React.Component {
    static propTypes = {
        onSearchObject: React.PropTypes.func,
        onReset: React.PropTypes.func
    };

    constructor(props) {
        super(props)

        this.onSearchHandler = this.onSearchHandler.bind(this)
        this.onResetHandler = this.onResetHandler.bind(this)
        this.onIdChange = this.onIdChange.bind(this)
        this.onFullNameChange = this.onFullNameChange.bind(this)
        this.onPassportChange = this.onPassportChange.bind(this)
        this.onSexChange = this.onSexChange.bind(this)
        this.isFormValid = this.isFormValid.bind(this)
        this.onCheck = this.onCheck.bind(this)
        this.state = this.getDefaultState()
    }

    getDefaultState() {
        return {
            object: {
                FullName: null,
                Id: null,
                Passport: null,
                Sex: null
            },
            isChecked: false
        }
    }

    changeState(obj) {
        this.setState({
            object: {
                ...this.state.object,
                ...obj
            }
        })
    }

    onIdChange(e) {
        const result = e.target.value == '' ? null : e.target.value
        if(result == null){
            this.changeState({
                Id:null
            })
            return;
        }

        if (!isNumber(result) || +result < 0)
            return;

        this.changeState({
            Id: result
        })
    }

    onFullNameChange(e) {
        const result = e.target.value == '' ? null : e.target.value

        this.changeState({
            FullName: result
        })
    }

    onPassportChange(e) {
        const result = e.target.value == '' ? null : e.target.value

        this.changeState({
            Passport: result
        })
    }

    isFormValid() {
        if (this.state.object.Passport === null) {
            return true
        }

        const reg = /^[0-9]{6}[-]{1}[0-9]{4}$/
        return this.state.object.Passport.match(reg) !== null
    }

    onSexChange(e, key) {
        let sex
        if(key === 0) {
            sex = null
        } else{
            sex = key === 1
        }

        this.changeState({
            Sex: sex
        })
    }

    onSearchHandler(e) {
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
        this.props.onSearchObject(result);
        e.preventDefault()
    }

    onCheck(e) {
        this.setState({isChecked : e.target.checked})
    }

    onResetHandler(e) {
        this.setState(this.getDefaultState())
        this.props.onReset()
        e.preventDefault()
    }

    render() {
        const {isChecked} = this.state
        let {Id, FullName, Passport, Sex} = this.state.object

        Id = Id == null ? '' : Id
        FullName == null ? '' : FullName
        Passport == null ? '' : Passport
        const sexTitle = getSexName(Sex)

        return <form className="form-inline">
            <div className="form-group">
                <input className="form-control ownInput" type="text" value={Id} placeholder="Id" onChange={this.onIdChange}/>
            </div>
            <div className="form-group">
                <input className="form-control ownInput" type="text" placeholder="FullName" value={FullName}
                       onChange={this.onFullNameChange}/>
            </div>
            <div className="form-group">
                <input className="form-control ownInput" type="text" placeholder="Passport" value={Passport}
                       onChange={this.onPassportChange}/>
            </div>
            <div className="checkbox">
                <label>
                    <input className="form-control" type="checkbox" checked={isChecked} onChange={this.onCheck}/>Include
                    sex?
                </label>
            </div>
            <div className="form-group">
                Sex :
                <DropdownButton className="searchInput" id="dropDownButton" onSelect={this.onSexChange}
                                title={sexTitle}
                                disabled={!isChecked}>
                    <MenuItem eventKey={0}>Doesn't matter</MenuItem>>
                    <MenuItem eventKey={1}>Man</MenuItem>>
                    <MenuItem eventKey={2}>Woman</MenuItem>
                </DropdownButton>
            </div>
            <div className="form-group search-reset">
                <button className="btn btn-primary" onClick={this.onSearchHandler} disabled={!this.isFormValid()}>
                    Search
                </button>
                <button className="btn btn-primary" onClick={this.onResetHandler}>Reset</button>
            </div>
        </form>
    }
}