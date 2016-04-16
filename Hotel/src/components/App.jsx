import React from 'react'
import $ from 'jquery'
import 'jquery.cookie'
import getMuiTheme from 'material-ui/lib/styles/getMuiTheme'
import CustomTable from './customTable.jsx'
import Tabs from 'material-ui/lib/tabs/tabs'
import Tab from 'material-ui/lib/tabs/tab'
import _ from 'lodash'
import RefreshIndicator from 'material-ui/lib/refresh-indicator'
import FailureServerDialog from './dialogs/failureServerDialog.jsx'
import {connect} from 'react-redux'
import ClientDialog from './dialogs/client-dialog.jsx'
import RoomDialog from './dialogs/room-dialog.jsx'
import RoomClientDialog from './dialogs/roomClient-dialog.jsx'
import RoomReservationDialog from './dialogs/roomClient-dialog.jsx'
import {urls, fields} from '../constants/utils'
import * as service from '../helpers/service'

function areEqual(firstArray, secondArray) {
    if (firstArray.length != secondArray.length) {
        return false
    }

    let intersectedArray = _.intersectionWith(firstArray, secondArray, _.isEqual)
    return firstArray.length == intersectedArray.length
}

class App extends React.Component {
    static propTypes = {
        errorTexts: React.PropTypes.arrayOf(React.PropTypes.string),
        isErrorDialogShown: React.PropTypes.bool,
        isIndicatorShown: React.PropTypes.bool,
        onOkErrorDialogHandler: React.PropTypes.func,
        onCreateObjectHandler: React.PropTypes.func,
        onCancelCreateObjectHandler: React.PropTypes.func,
        fetchObjects: React.PropTypes.func,
        onShowCreateDialog: React.PropTypes.func,
        onDelete: React.PropTypes.func,
        onCheckAll: React.PropTypes.func,
        onCheck: React.PropTypes.func,
        onCreateObject: React.PropTypes.func,
        onCloseCreateDialog: React.PropTypes.func
    }

    constructor() {
        super()
        $.cookie('login', 'admin')
        $.cookie('password', 'admin')

        this.interval = null
    }

    componentDidMount() {
        this.props.fetchObjects()
        //this.interval = setInterval(() => this.props.fetchObjects(), 10000)
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }


    getChildContext() {
        return {
            muiTheme: getMuiTheme()
        }
    }

    render() {
        const {isIndicatorShown, onOkErrorDialogHandler, errorTexts, isErrorDialogShown} = this.props;
        const {dialogForObject} = this.props;
        const {onCheck, onCheckAll, onShowCreateDialog, onDelete, onCreateObject, onCloseCreateDialog } = this.props
        return (
            <div>
                <RefreshIndicator size={50} left={200} top={0}
                                  status={ isIndicatorShown ? "hide" : "loading"}/>
                <FailureServerDialog onOkHandler={onOkErrorDialogHandler}
                                     isOpen={isErrorDialogShown}
                                     errorTexts={errorTexts}/>
                <Tabs className='tabs'>
                    <Tab label="Clients">
                        <div>
                            <CustomTable
                                {...this.props[urls.clients]}
                                onCheck={onCheck(urls.clients)}
                                onCheckAll={onCheckAll(urls.clients)}
                                onShowCreateDialog={onShowCreateDialog(urls.clients)}
                                onDelete={onDelete(urls.clients)}
                                fields={fields[urls.clients]}>
                                <ClientDialog
                                    {...dialogForObject}
                                    onCreateObject={onCreateObject(urls.clients)}
                                    onCloseDialog = {onCloseCreateDialog}
                                    ownTableName={urls.clients}/>
                            </CustomTable>
                        </div>
                    </Tab>
                    <Tab label="Rooms">
                        <div>
                            <CustomTable {...this.props[urls.rooms]}
                                onCheck={onCheck(urls.rooms)}
                                onCheckAll={onCheckAll(urls.rooms)}
                                onShowCreateDialog={onShowCreateDialog(urls.rooms)}
                                onDelete={onDelete(urls.rooms)}
                                fields={fields[urls.rooms]}>
                                <RoomDialog
                                    {...dialogForObject}
                                    ownTableName={urls.rooms}
                                    onCloseDialog = {onCloseCreateDialog}
                                    onCreateObject={onCreateObject(urls.rooms)}/>
                            </CustomTable>
                        </div>
                    </Tab>
                    <Tab label="RoomClients">
                        <div>
                            <CustomTable {...this.props[urls.roomClient]}
                                onCheck={onCheck(urls.roomClient)}
                                onCheckAll={onCheckAll(urls.roomClient)}
                                onShowCreateDialog={onShowCreateDialog(urls.roomClient)}
                                onDelete={onDelete(urls.roomClient)}
                                fields={fields[urls.roomClient]}>
                                <RoomClientDialog
                                    {...dialogForObject}
                                    onCreateObject={onCreateObject(urls.roomClient)}
                                    onCloseDialog = {onCloseCreateDialog}
                                    ownTableName={urls.roomClient}/>
                            </CustomTable>
                        </div>
                    </Tab>
                    <Tab label="RoomReservations">
                        <div>
                            <CustomTable {...this.props[urls.roomReservation]}
                                onCheck={onCheck(urls.roomReservation)}
                                onCheckAll={onCheckAll(urls.roomReservation)}
                                onShowCreateDialog={onShowCreateDialog(urls.roomReservation)}
                                onDelete={onDelete(urls.roomReservation)}
                                fields={fields[urls.roomReservation]}>
                                <RoomReservationDialog
                                    {...dialogForObject}
                                    onCreateObject={onCreateObject(urls.roomReservation)}
                                    onCloseDialog = {onCloseCreateDialog}
                                    ownTableName={urls.roomReservation}/>
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
    const dialogForObject = state.dialogForObject ? {
        isOpen: true,
        currentTableName: state.dialogForObject.table,
        isShownId: false
    } : null

    const result = {
        ...state,
        dialogForObject
    }
    return result
}

import * as actions from '../actions'

const mapDispatchToProps = (dispatch) => {
    const onOkErrorDialogHandler = () => dispatch(actions.closeDialog())

    const fetchObjects = () => service.fetchObjects(dispatch)
    const onCheck = dispatch((dispatch, getState) =>
        (table) =>
            (index) =>
                (target, isChecked) => {
                    const state = getState();
                    const object = state[table].objects.toArray()[index]
                    if (isChecked) {
                        dispatch(actions.checkRow(table, object))
                    } else {
                        dispatch(actions.uncheckRow(table, object))
                    }
                })

    const onCheckAll = (table) => (target, areAllChecked) => {
        if(areAllChecked) {
            dispatch(actions.checkAllRows(table))
        } else {
            dispatch(actions.uncheckAllRows(table))
        }
    }

    const onShowCreateDialog = (table) => () => dispatch(actions.openCreateDialog(table))

    const onDelete = dispatch((dispatch, getState) =>
        (table) =>
            () => {
                const state = getState()
                const deletingObjects = state[table].checkedRows.toArray()
                service.deleteObjects(dispatch, table, deletingObjects)
            })

    const onCreateObject = (table) => (object) => () => {
        service.createObject(dispatch, table, object)
    }

    const onCloseCreateDialog = () => dispatch(actions.closeDialog())

    return {
        onOkErrorDialogHandler,
        fetchObjects,
        onCheck,
        onCheckAll,
        onShowCreateDialog,
        onDelete,
        onCreateObject,
        onCloseCreateDialog
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)