import React from 'react'
import $ from 'jquery'
import 'jquery.cookie'
import _ from 'lodash'
import {Tab, Tabs} from 'react-bootstrap'
import {connect} from 'react-redux'

import CustomTable from './customTable.jsx'
import DeleteBestClientInfo from './delete-best-client-info.jsx'
import {urls, fields, fieldTransforms} from '../constants/utils'
import * as service from '../helpers/service'
import {ClientDialog, RoomDialog, RoomClientDialog, RoomReservationDialog, FailureServerDialog} from './dialogs'
import {ClientSearch, RoomSearch, RoomClientSearch, RoomReservationSearch } from  './searchs'

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
        onCheckAll: React.PropTypes.func,
        onCheck: React.PropTypes.func,
        onCreateObject: React.PropTypes.func,
        onSearchObject: React.PropTypes.func,
        onUpdateObject: React.PropTypes.func,
        onDeleteObject: React.PropTypes.func,
        onCloseDialog: React.PropTypes.func
    }

    constructor() {
        super()
        $.cookie('login', 'admin')
        $.cookie('password', 'admin')
    }

    componentDidMount() {
        this.props.fetchObjects()
    }

    render() {
        const {onOkErrorDialogHandler, errorTexts, isErrorDialogShown} = this.props;
        const {dialogForObject} = this.props;
        const {onDeleteBestClientInfo, onCheck, onCheckAll,onSearchObject, onShowCreateDialog,
            onShowUpdateDialog, onDeleteObject, onCreateObject, onUpdateObject, onCloseDialog, fetchObjects } = this.props
        return (
            <div>
                <FailureServerDialog onOkHandler={onOkErrorDialogHandler}
                                     isOpen={isErrorDialogShown}
                                     errorTexts={errorTexts}/>
                <Tabs defaultActiveKey={1} className="tabs">
                    <Tab eventKey={1} title="Clients">
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
                                <div>
                                    <ClientSearch onSearchObject={onSearchObject(urls.clients)} onReset={fetchObjects}/>
                                    <DeleteBestClientInfo {...{onDeleteBestClientInfo}}/>
                                </div>
                                <ClientDialog
                                    {...dialogForObject}
                                    onCreateObject={onCreateObject(urls.clients)}
                                    onUpdateObject={onUpdateObject(urls.clients)}
                                    onCloseDialog={onCloseDialog(urls.clients)}
                                    ownTableName={urls.clients}/>
                            </CustomTable>
                        </div>
                    </Tab>
                    <Tab eventKey={2} title="Rooms">
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
                                <RoomSearch onSearchObject={onSearchObject(urls.rooms)} onReset={fetchObjects}/>
                                <RoomDialog
                                    {...dialogForObject}
                                    ownTableName={urls.rooms}
                                    onCloseDialog={onCloseDialog(urls.rooms)}
                                    onUpdateObject={onUpdateObject(urls.rooms)}
                                    onCreateObject={onCreateObject(urls.rooms)}/>
                            </CustomTable>
                        </div>
                    </Tab>
                    <Tab eventKey={3} title="RoomClients">
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
                                <RoomClientSearch onSearchObject={onSearchObject(urls.roomClient)}
                                                  onReset={fetchObjects}/>
                                <RoomClientDialog
                                    {...dialogForObject}
                                    onUpdateObject={onUpdateObject(urls.roomClient)}
                                    onCreateObject={onCreateObject(urls.roomClient)}
                                    onCloseDialog={onCloseDialog(urls.roomClient)}
                                    ownTableName={urls.roomClient}/>
                            </CustomTable>
                        </div>
                    </Tab>
                    <Tab eventKey={4} title="RoomReservations">
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
                                <RoomReservationSearch onSearchObject={onSearchObject(urls.roomReservation)}
                                                       onReset={fetchObjects}/>
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

    const fetchObjects = dispatch((dispatch, getState) => () => service.fetchObjects(dispatch, getState))

    const onCheck = dispatch((dispatch, getState) =>
        (table) =>
            (index) =>
                (event) => {
                    const state = getState();
                    const object = state[table].objects.get(index)
                    if (event.currentTarget.checked) {
                        dispatch(actions.checkRow(table, object))
                    } else {
                        dispatch(actions.uncheckRow(table, object))
                    }
                })

    const onCheckAll = (table) => (event) => {
        if (event.currentTarget.checked) {
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

    const onDeleteBestClientInfo = dispatch((dispatch, getState) =>
        (year) => service.deleteBestClientsInfo(dispatch, year).then(() => fetchObjects()))

    const onDeleteObject = dispatch((dispatch, getState) =>
        (table) =>
            () => {
                const state = getState()
                const deletingObjects = state[table].checkedRows.toArray()
                deletingObjects.length && service.deleteObjects(dispatch, table, deletingObjects).then(() => fetchObjects())
            })

    const onCreateObject =
        (table) =>
            (object) =>
                service.createObject(dispatch, table, object).then(() => fetchObjects())

    const onUpdateObject =
        (table) =>
            (oldObject, newObject) =>
                service.updateObject(dispatch, table, oldObject, newObject)

    const onCloseDialog =
        (table) =>
            () =>
                dispatch(actions.closeDialog())

    const onSearchObject = dispatch((dispatch, getState) =>
        (table) =>
            (object) => {
                service.searchObject(dispatch, getState, table, object)
            })

    return {
        onOkErrorDialogHandler,
        fetchObjects,
        onCheck,
        onCheckAll,
        onShowCreateDialog,
        onShowUpdateDialog,
        onCreateObject,
        onSearchObject,
        onDeleteObject,
        onUpdateObject,
        onCloseDialog,
        onDeleteBestClientInfo
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)