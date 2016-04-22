import React from 'react';
import {  Button, Input} from 'react-bootstrap'
import InputMoment from '../../datePicker/input-moment.jsx'
import moment from 'moment'

export default class RoomClientSearch extends React.Component {
    static propTypes = {
        onSearchObject: React.PropTypes.func
    };

    constructor(props) {
        super(props)
        this.state = this.getDefaultState()
        this.onSearchHandler = this.onSearchHandler.bind(this)
        this.onResetHandler = this.onResetHandler.bind(this)
        this.onRoomIdChange = this.onRoomIdChange.bind(this)
        this.onClientIdChange = this.onClientIdChange.bind(this)
        this.onCheckInDateChange = this.onCheckInDateChange.bind(this)
        this.onTermChange = this.onTermChange.bind(this)
        this.toggleInputMoment = this.toggleInputMoment.bind(this)
    }

    getDefaultState() {
        return {
            object: {
                RoomId: '',
                ClientId: '',
                CheckInDate: new Date(),
                Term: ''
            },
            showInputMoment: false
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

    onRoomIdChange(e) {
        this.changeState({RoomId: e.target.value});
    }

    onClientIdChange(e) {
        this.changeState({ClientId: e.target.value});
    }

    onCheckInDateChange(e) {
        this.changeState({CheckInDate: e._d});
    }

    onTermChange(e) {
        this.changeState({Term: e.target.value});
    }

    onSearchHandler() {
        this.props.onSearchObject(this.state.object);
    }

    onResetHandler() {
        this.setState(this.getDefaultState())
    }

    toggleInputMoment() {
        this.setState({
            showInputMoment: !this.state.showInputMoment
        })
    }

    render() {
        const {RoomId, ClientId, CheckInDate, Term} = this.state.object

        const style = this.state.showInputMoment ? 'block' : 'none'

        return (
            <div className="search">
                <Input type="number" value={RoomId} placeholder="RoomId" onChange={this.onRoomIdChange}/>
                <br/>
                <Input type="number" value={ClientId} placeholder="ClientId" onChange={this.onClientIdChange}/>
                <br/>
                <Input type="text" value={moment(CheckInDate).format('llll')} readOnly
                       onFocus={this.toggleInputMoment}/>
                <div style={{display : style}}>
                    <InputMoment moment={moment(CheckInDate)} onChange={this.onCheckInDateChange}
                                 onSave={this.toggleInputMoment}/>
                </div>
                <br/>
                <Input type="number" value={Term} placeholder="Term" onChange={this.onTermChange}/>
                <br/>
                <Button onClick={this.onSearchHandler}>Search</Button>
                <Button onClick={this.onResetHandler}>Reset</Button>
            </div>)
    }
}

