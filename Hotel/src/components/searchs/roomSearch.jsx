import React from 'react';
import Dialog from '../../../node_modules/material-ui/lib/dialog';
import FlatButton from '../../../node_modules/material-ui/lib/flat-button';
import TextField from '../../../node_modules/material-ui/lib/text-field';
import SelectField from '../../../node_modules/material-ui/lib/select-field';
import MenuItem from '../../../node_modules/material-ui/lib/menus/menu-item';
import Checkbox from 'material-ui/lib/checkbox';
import Toggle from 'material-ui/lib/toggle';

export default class ClientSearch extends React.Component {
    static propTypes = {
        onSearchObject: React.PropTypes.func
    };

    constructor(props) {
        super(props)
        this.state = this.getDefaultState()
        this.onSearchHandler = this.onSearchHandler.bind(this)
        this.onResetHandler = this.onResetHandler.bind(this)
        this.onIdChange = this.onIdChange.bind(this)
        this.onFloorChange = this.onFloorChange.bind(this)
        this.onPriceChange = this.onPriceChange.bind(this)
        this.onComfortChange = this.onComfortChange.bind(this)
        this.onOccupationChange = this.onOccupationChange.bind(this)
        this.onCheck = this.onCheck.bind(this)
    }

    getDefaultState() {
        return {
            object: {
                Id: '',
                Floor: '',
                Price: '',
                Comfort: '',
                Occupation: null
            },
            isChecked : false
        }
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
        const {Id, Floor, Price, Comfort, Occupation} = this.state.object
        const isFormValid = this.isComfortValid() && this.isPriceValid()
        return (
            <div>
                <TextField type="number" value={Id} hintText="Id" onChange={this.onIdChange}/>
                <br/>
                <TextField type="number" hintText="Floor" value={Floor} onChange={this.onFloorChange}/>
                <br/>
                <TextField type="text" hintText="Price" value={Price} onChange={this.onPriceChange}/>
                <br/>
                <TextField type="number" hintText="Comfort" value={Comfort} onChange={this.onComfortChange}/>
                <br/>
                <Checkbox checked={isChecked} onCheck={this.onCheck}/>
                <Toggle
                    label="Occupation"
                    toogle={Occupation}
                    onToggle={this.onOccupationChange}
                    disabled={isChecked}/>
                <FlatButton label="Search" secondary={true} onClick={this.onSearchHandler} disabled={!isFormValid}/>
                <FlatButton label="Reset" secondary={true} onClick={this.onResetHandler}/>
            </div>)
    }
}