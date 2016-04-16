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
        object: React.PropTypes.shape({
            Id: React.PropTypes.number,
            Floor: React.PropTypes.number,
            Price: React.PropTypes.string,
            Comfort: React.PropTypes.number,
            Occupation: React.PropTypes.bool
        }),
        isOpen: React.PropTypes.bool,
        isShownId: React.PropTypes.bool,
        currentTableName : React.PropTypes.string,
        ownTableName : React.PropTypes.string,
        onCreateHandler: React.PropTypes.func,
        onCancelHandler: React.PropTypes.func
    };

    static defaultProps = {
        object: {
            Id: 0,
            Floor: 1,
            Price: 100.00,
            Comfort: 1,
            Occupation: false
        },
        isOpen : false,
        isShownId : false
    }

    constructor(props) {
        super(props)
        ({Id, Floor, Price, Comfort, Occupation} = this.props.object)
        this.state = {object: {Id, Floor, Price, Comfort, Occupation}}
    }

    getCreatedObject() {
        if (this.props.isShownId) {
            return this.state.object
        }
        ({Floor, Price, Comfort, Occupation} = this.state.object);
        return {Floor, Price, Comfort, Occupation}
    }

    @autobind
    onIdChange(e) {
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

    onCreateHandler() {
        this.props.onCreateHandler(this.getCreatedObject());
    }

    render() {
        const {onCancelHandler, isOpen, isShownId}
        const {Id, Floor, Price, Comfort, Occupation} = this.props.object
        const actions = getActions(this.onCreateHandler, onCancelHandler)

        return <Dialog className="dialog"
                       title="Create room"
                       actions={actions}
                       modal={false}
                       open={isOpen && currentTableName == ownTableName}
                       onRequestClose={onCancelHandler}>
            (
            <div>
                {isShownId && <TextField type="number" value={Id} hintText="Id" onChange={this.onIdChange}/>}
                <br/>
                <TextField type="number" hintText="Floor" value={Floor} onChange={this.onFloorChange}/>
                <br/>
                <TextField type="text" hintText="Price" value={Price} onChange={this.onPriceChange}/>
                <br/>
                <TextField type="number" hintText="Comfort" value={Comfort} onChange={this.onComfortChange}/>
                <br/>
                <Toggle
                    label="Occupation"
                    toogle={Occupation}
                    onToggle={this.onOccupationChange}
                />
            </div>
        </Dialog>
    }
}