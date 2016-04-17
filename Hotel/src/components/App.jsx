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
import {urls, fields, fieldTransforms} from '../constants/utils'
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
        onShowUpdateDialog: React.PropTypes.func,
        onDeleteObject: React.PropTypes.func,
        onCheckAll: React.PropTypes.func,
        onCheck: React.PropTypes.func,
        onCreateObject: React.PropTypes.func,
        onUpdateObject: React.PropTypes.func,
        onCloseDialog: React.PropTypes.func
    }

    constructor() {
        super()
        $.cookie('login', 'admin')
        $.cookie('password', 'admin')

        this.interval = null
    }

    componentDidMount() {
        this.props.fetchObjects()
        this.interval = setInterval(() => this.props.fetchObjects(), 10000)
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
        const {onOkErrorDialogHandler, errorTexts, isErrorDialogShown} = this.props;
        const {dialogForObject} = this.props;
        const {onCheck, onCheckAll, onShowCreateDialog,onShowUpdateDialog, onDeleteObject, onCreateObject, onUpdateObject, onCloseDialog } = this.props
        return (
            <div>
                <FailureServerDialog onOkHandler={onOkErrorDialogHandler}
                                     isOpen={isErrorDialogShown}
                                     errorTexts={errorTexts}/>
                <Tabs className='tabs'>
                    <Tab label="Clients">
                        <RefreshIndicator size={50} left={200} top={0}
                                          status={ this.props[urls.clients].isIndicatorShown ? "loading" :"hide"}/>
                        <div>
                            <CustomTable
                                {...this.props[urls.clients]}
                                fieldTransform={fieldTransforms[urls.clients]}
                                onCheck={onCheck(urls.clients)}
                                onCheckAll={onCheckAll(urls.clients)}
                                onShowCreateDialog={onShowCreateDialog(urls.clients)}
                                onShowUpdateDialog={onShowUpdateDialog(urls.clients)}
                                onDeleteObject={onDeleteObject(urls.clients)}
                                nameFields={fields[urls.clients]}>
                                <ClientDialog
                                    {...dialogForObject}
                                    onCreateObject={onCreateObject(urls.clients)}
                                    onUpdateObject={onUpdateObject(urls.clients)}
                                    onCloseDialog={onCloseDialog(urls.clients)}
                                    ownTableName={urls.clients}/>
                            </CustomTable>
                        </div>
                    </Tab>
                    <Tab label="Rooms">
                        <RefreshIndicator size={50} left={200} top={0}
                                          status={ this.props[urls.rooms].isIndicatorShown ? "loading" :"hide"}/>
                        <div>
                            <CustomTable
                                {...this.props[urls.rooms]}
                                fieldTransform={fieldTransforms[urls.rooms]}
                                onCheck={onCheck(urls.rooms)}
                                onCheckAll={onCheckAll(urls.rooms)}
                                onShowCreateDialog={onShowCreateDialog(urls.rooms)}
                                onShowUpdateDialog={onShowUpdateDialog(urls.rooms)}
                                onDeleteObject={onDeleteObject(urls.rooms)}
                                nameFields={fields[urls.rooms]}>
                                <RoomDialog
                                    {...dialogForObject}
                                    ownTableName={urls.rooms}
                                    onCloseDialog={onCloseDialog(urls.rooms)}
                                    onUpdateObject={onUpdateObject(urls.rooms)}
                                    onCreateObject={onCreateObject(urls.rooms)}/>
                            </CustomTable>
                        </div>
                    </Tab>
                    <Tab label="RoomClients">
                        <RefreshIndicator size={50} left={200} top={0}
                                          status={ this.props[urls.roomClient].isIndicatorShown ? "loading" :"hide"}/>
                        <div>
                            <CustomTable
                                {...this.props[urls.roomClient]}
                                fieldTransform={fieldTransforms[urls.roomClient]}
                                onCheck={onCheck(urls.roomClient)}
                                onCheckAll={onCheckAll(urls.roomClient)}
                                onShowCreateDialog={onShowCreateDialog(urls.roomClient)}
                                onShowUpdateDialog={onShowUpdateDialog(urls.roomClient)}
                                onDeleteObject={onDeleteObject(urls.roomClient)}
                                nameFields={fields[urls.roomClient]}>
                                <RoomClientDialog
                                    {...dialogForObject}
                                    onUpdateObject={onUpdateObject(urls.roomClient)}
                                    onCreateObject={onCreateObject(urls.roomClient)}
                                    onCloseDialog={onCloseDialog(urls.roomClient)}
                                    ownTableName={urls.roomClient}/>
                            </CustomTable>
                        </div>
                    </Tab>
                    <Tab label="RoomReservations">
                        <RefreshIndicator size={50} left={50} top={0}
                                          status={ this.props[urls.roomReservation].isIndicatorShown ? "loading" :"hide"}/>
                        <div>
                            <CustomTable
                                fieldTransform={fieldTransforms[urls.roomReservation]}
                                {...this.props[urls.roomReservation]}
                                onCheck={onCheck(urls.roomReservation)}
                                onCheckAll={onCheckAll(urls.roomReservation)}
                                onShowCreateDialog={onShowCreateDialog(urls.roomReservation)}
                                onShowUpdateDialog={onShowUpdateDialog(urls.roomReservation)}
                                onDeleteObject={onDeleteObject(urls.roomReservation)}
                                nameFields={fields[urls.roomReservation]}>
                                <RoomReservationDialog
                                    {...dialogForObject}
                                    onUpdateObject={onUpdateObject(urls.roomReservation)}
                                    onCreateObject={onCreateObject(urls.roomReservation)}
                                    onCloseDialog={onCloseDialog(urls.roomReservation)}
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
    const {dialogForObject} = state

    const resultDialog = dialogForObject ? {
        isOpen: true,
        isForUpdate: dialogForObject.isForUpdate,
        currentTableName: dialogForObject.table,
        object: dialogForObject.object
    } : {
        isOpen: false,
        isForUpdate: false
    }

    return {
        ...state,
        dialogForObject: resultDialog
    }
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
                    const object = state[table].objects.get(index)
                    if (isChecked) {
                        dispatch(actions.checkRow(table, object))
                    } else {
                        dispatch(actions.uncheckRow(table, object))
                    }
                })

    const onCheckAll = (table) => (target, areAllChecked) => {
        if (areAllChecked) {
            dispatch(actions.checkAllRows(table))
        } else {
            dispatch(actions.uncheckAllRows(table))
        }
    }

    const onShowUpdateDialog = dispatch((dispatch, getState) =>
        (table) =>
            (index) =>
                () => {
                    const updatingObject = getState()[table].objects.get(index)
                    dispatch(actions.openUpdateDialog(table, updatingObject))
                }
    )

    const onShowCreateDialog = (table) => () => dispatch(actions.openCreateDialog(table))

    const onDeleteObject = dispatch((dispatch, getState) =>
        (table) =>
            () => {
                const state = getState()
                const deletingObjects = state[table].checkedRows.toArray()
                service.deleteObjects(dispatch, table, deletingObjects)
            })

    const onCreateObject = (table) => (object) => service.createObject(dispatch, table, object)

    const onUpdateObject = (table) => (oldObject, newObject) => service.updateObject(dispatch, table,oldObject, newObject)

    const onCloseDialog = (table) => () => dispatch(actions.closeDialog())

    return {
        onOkErrorDialogHandler,
        fetchObjects,
        onCheck,
        onCheckAll,
        onShowCreateDialog,
        onShowUpdateDialog,
        onDeleteObject,
        onCreateObject,
        onUpdateObject,
        onCloseDialog
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)