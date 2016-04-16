import React from 'react'
import $ from 'jquery'
import 'jquery.cookie'
import sqlContext from '../helpers/repository'
import getMuiTheme from 'material-ui/lib/styles/getMuiTheme'
import CustomTable from './customTable.jsx'
import Tabs from 'material-ui/lib/tabs/tabs'
import Tab from 'material-ui/lib/tabs/tab'
import {roomFields, clientFields, roomClientFields, roomReservationFields} from '../constants/utils'
import _ from 'lodash'
import RefreshIndicator from 'material-ui/lib/refresh-indicator'
import FailureServerDialog from './dialogs/failureServerDialog.jsx'
import {connect} from 'react-redux'
import ClientDialog from './dialogs/client-dialog.jsx'
import RoomDialog from './dialogs/room-dialog.jsx'
import RoomClientDialog from './dialogs/roomClient-dialog.jsx'
import RoomReservationDialog from './dialogs/roomClient-dialog.jsx'
import {urls} from '../constants/utils'

function areEqual(firstArray, secondArray) {
    if (firstArray.length != secondArray.length) {
        return false
    }

    let intersectedArray = _.intersectionWith(firstArray, secondArray, _.isEqual)
    return firstArray.length == intersectedArray.length
}

class App extends React.Component {
    static propTypes = {
        errorText: React.PropTypes.string,
        isErrorDialogShown: React.PropTypes.bool,
        isIndicatorShown: React.PropTypes.bool,
        onOkErrorDialogHandler: React.PropTypes.func,
        onCreateObjectHandler: React.PropTypes.func,
        onCancelCreateObjectHandler: React.PropTypes.func
    }

    constructor() {
        super()
        $.cookie('login', 'admin')
        $.cookie('password', 'admin')

        this.state = {
            clients: [],
            rooms: [],
            roomClients: [],
            roomReservations: [],
            tabValue: 'a'
        }

        this.interval = null
    }

    fetchData() {
        sqlContext.Clients().getAll()
            .done((result) => {
                if (!areEqual(result, this.state.clients)) {
                    this.setState({clients: result})
                }
            })
        sqlContext.Rooms().getAll()
            .done((result) => {
                if (!areEqual(result, this.state.rooms)) {
                    this.setState({rooms: result})
                }
            })
        sqlContext.RoomClient().getAll()
            .done((result) => {
                if (!areEqual(result, this.state.roomClients)) {
                    this.setState({roomClients: result})
                }
            })
        sqlContext.RoomReservation().getAll()
            .done((result) => {
                if (!areEqual(result, this.state.roomReservations)) {
                    this.setState({roomReservations: result})
                }
            })
    }

    componentDidMount() {
        this.fetchData()
        this.interval = setInterval(() => this.fetchData(), 10000)
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }


    getChildContext() {
        return {
            muiTheme: getMuiTheme()
        }
    }

    onDeleteObjects(name, deletedObjects) {
        let objects = this.state[name]
        _.remove(objects, (x) => {
            return deletedObjects.some(y => _.isEqual(x, y))
        })
        this.setState({[name]: objects})
    }

    render() {

        const {isIndicatorShown, onOkErrorDialogHandler, errorText, isErrorDialogShown} = this.props;
        const {dialogForObject} = this.props;

        return (
            <div>
                <RefreshIndicator size={50} left={200} top={0}
                                  status={ isIndicatorShown ? "hide" : "loading"}/>
                <FailureServerDialog onOkHandler={onOkErrorDialogHandler}
                                     isOpen={isErrorDialogShown}
                                     errorText={errorText}/>
                <Tabs className='tabs'>
                    <Tab label="Clients">
                        <div>
                            <CustomTable onDeleteObjects={this.onDeleteObjects.bind(this, 'clients')}
                                         fields={clientFields}>
                                <ClientDialog ownTableName={urls.clients} {...dialogForObject}/>
                            </CustomTable>
                        </div>
                    </Tab>
                    <Tab label="Rooms">
                        <div>
                            <CustomTable onDeleteObjects={this.onDeleteObjects.bind(this, 'rooms')}
                                         fields={roomFields}>
                                <RoomDialog ownTableName={urls.rooms} {...dialogForObject}/>
                            </CustomTable>
                        </div>
                    </Tab>
                    <Tab label="RoomClients">
                        <div>
                            <CustomTable onDeleteObjects={this.onDeleteObjects.bind(this, 'roomClients')}
                                         fields={roomClientFields}>
                                <RoomClientDialog ownTableName={urls.roomClient} {...dialogForObject}/>
                            </CustomTable>
                        </div>
                    </Tab>
                    <Tab label="RoomReservations">
                        <div>
                            <CustomTable onDeleteObjects={this.onDeleteObjects.bind(this, 'roomReservations')}
                                         fields={roomReservationFields}>
                                <RoomReservationDialog ownTableName={urls.roomReservation} {...dialogForObject}/>
                            </CustomTable>
                        </div>
                    </Tab>
                </Tabs>
            </div>)
    }
}

App.childContextTypes = {
    muiTheme: React.PropTypes.object
}

function mapStateToProps(state) {
    const dialogForObject = dialogForObject ? {
        isOpen: true,
        currentTableName: dialogForObject.table,
        isShownId: false
    } : null

    return {
        ...state,
        dialogForObject
    }
}

function mapDispatchToProps(dispatch) {
    return {}
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)