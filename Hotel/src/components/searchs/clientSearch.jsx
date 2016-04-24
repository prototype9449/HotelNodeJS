import React from 'react';
import { DropdownButton, MenuItem } from 'react-bootstrap'

export default class ClientSearch extends React.Component {
    static propTypes = {
        onSearchObject: React.PropTypes.func
    };

    constructor(props) {
        super(props)

        this.onSearchHandler = this.onSearchHandler.bind(this)
        this.onResetHandler = this.onResetHandler.bind(this)
        this.onIdChange = this.onIdChange.bind(this)
        this.onFullNameChange = this.onFullNameChange.bind(this)
        this.onPassportChange = this.onPassportChange.bind(this)
        this.onSexChange = this.onSexChange.bind(this)
        this.isPassportValid = this.isPassportValid.bind(this)
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

    onSexChange(event, index, value) {
        this.changeState({
            Sex: value == 1
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

    onCheck(target, isChecked) {
        this.setState({isChecked})
    }

    onResetHandler() {
        this.setState(this.getDefaultState())
        e.preventDefault()
    }

    render() {
        const {isChecked} = this.state
        let {Id, FullName, Passport, Sex} = this.state.object

        Id = Id == null ? '' : Id
        FullName == null ? '' : FullName
        Passport == null ? '' : Passport
        Sex == Sex == 0 ? 0 : Sex

        return <form className="form-inline">
            <div className="form-group">
                <input className="form-control" type="text" value={Id} placeholder="Id" onChange={this.onIdChange}/>
            </div>
            <div className="form-group">
                <input className="form-control" type="text" placeholder="FullName" value={FullName}
                       onChange={this.onFullNameChange}/>
            </div>
            <div className="form-group">
                <input className="form-control" type="text" placeholder="Passport" value={Passport}
                       onChange={this.onPassportChange}/>
            </div>
            <div className="checkbox">
                <input className="form-control" type="checkbox" checked={isChecked} onChange={this.onCheck}/>
            </div>
            <div className="form-group">
                <DropdownButton className="searchInput" id="fdsf" value={Sex} onSelect={this.onSexChange} title="Sex"
                                disabled={isChecked}>
                    <MenuItem value={0}>Doesn't matter</MenuItem>>
                    <MenuItem value={1}>Man</MenuItem>>
                    <MenuItem value={2}>Woman</MenuItem>
                </DropdownButton>
            </div>
            <div className="form-group search-reset">
                <button className="btn btn-primary" onClick={this.onSearchHandler}>Search</button>
                <button className="btn btn-primary" onClick={this.onResetHandler}>Reset</button>
            </div>
        </form>
    }
}