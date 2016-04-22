import React from 'react';
import { DropdownButton, MenuItem, Button, Input} from 'react-bootstrap'

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
                FullName: '',
                Id: '',
                Passport: '',
                Sex: null
            },
            isChecked: false
        }
    }

    changeState(obj){
        this.setState({
            object:{
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

    onSearchHandler() {
        this.props.onSearchObject(this.state.object);
    }

    onCheck(target, isChecked) {
        this.setState({isChecked})
    }

    onResetHandler() {
        this.setState(this.getDefaultState())
    }

    render() {
        const {isChecked} = this.state
        const {Id, FullName, Passport, Sex} = this.state.object

        const sex = Sex ? 1 : 0
        return <div className="search">
            <Input type="text" value={Id} placeholder="Id" onChange={this.onIdChange}/>
            <br/>
            <Input type="text" placeholder="FullName" value={FullName} onChange={this.onFullNameChange}/>
            <br/>
            <Input type="text" placeholder="Passport" value={Passport} onChange={this.onPassportChange}/>
            <br/>
            <Input type="checkbox" checked={isChecked} onChange={this.onCheck}/>
            <DropdownButton id="fdsf" value={sex} onSelect={this.onSexChange} title="Sex" disabled={isChecked}>
                <MenuItem value={1}>Man</MenuItem>>
                <MenuItem value={0}>Woman</MenuItem>
            </DropdownButton>
            <Button onClick={this.onSearchHandler}>Search</Button>
            <Button onClick={this.onResetHandler}>Reset</Button>
        </div>
    }
}