import React from 'react'
import Dialog from 'material-ui/lib/dialog'
import FlatButton from 'material-ui/lib/flat-button'
import TextField from 'material-ui/lib/text-field'
import getActions from '../create-cancel-actions.jsx'
import SelectField from 'material-ui/lib/select-field'
import MenuItem from 'material-ui/lib/menus/menu-item'
import autobind from 'autobind-decorator'

export default class RoomDialog extends React.Component {
    static propTypes = {
        Id: React.PropTypes.number,
        Floor: React.PropTypes.number,
        Price: React.PropTypes.string,
        Comfort: React.PropTypes.number,
        Occupation: React.PropTypes.bool,
        isOpen: React.PropTypes.bool,
        onCreateHandler: React.PropTypes.func,
        onCancelHandler: React.PropTypes.func
    };

    static defaultProps = {
        Id: 0,
        Floor: 1,
        Price: 100.00,
        Comfort: 1,
        Occupation: false
    }

    constructor(props) {
        super(props)
        ({Id, Floor, Price, Comfort, Occupation} = this.props)
        this.state = {Id, Floor, Price, Comfort, Occupation}
    }

    @autobind
    getCreatedObject() {
        if (this.props.isShownId) {
            return this.state
        }

        return {
            Floor: this.state.Floor,
            Price: this.state.Price,
            Comfort: this.state.Comfort,
            Occupation: this.state.Occupation
        }
    }

    @autobind
    onIdhange(e) {
        if (e.target.value < 0)
            return;

        this.setState({Id: e.target.value})
    }

    @autobind
    onFloorChange(e) {
        if (e.target.value < 1 || e.target.value > 10)
            return;

        this.setState({Floor: e.target.value})
    }

    @autobind
    onPriceChange(e) {
        const reg = /^ *\$?\d+(?:\.\d{2})? *$/
        if (!e.target.value.match(reg))
            return;

        this.setState({Price: e.target.value})
    }

    @autobind
    onComfortChange(e) {
        if (e.target.value < 1 || e.target.value > 10)
            return;

        this.setState({Comfort: e.target.value})
    }

    @autobind
    onOccupationChange(event, index, value) {
        this.setState({Occupation: value})
    }

    render() {
        const actions = getActions(this.props.onCreateHandler, this.props.onCancelHandler)

        return <Dialog className="dialog"
                       title="Create room"
                       actions={actions}
                       modal={false}
                       open={this.props.isOpen}
                       onRequestClose={this.props.onCancelHandler}>
            (
            <div>
                {this.props.isShownId && <TextField type="number" hintText="Id" onChange={this.onIdChange}/>}
                <br/>
                <TextField type="number" hintText="Floor" onChange={this.onFloorChange}/>
                <br/>
                <TextField type="text" hintText="Price" onChange={this.onPriceChange}/>
                <br/>
                <TextField type="number" hintText="Comfort" onChange={this.onComfortChange}/>
                <br/>
                <Toggle
                    label="Occupation"
                    toogle={this.state.Occupation}
                    onToggle={this.onOccupationChange}
                />
            </div>
        </Dialog>
    }
}