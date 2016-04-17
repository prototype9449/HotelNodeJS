import * as actions from '../actions'
import sqlContext from '../helpers/repository'
import {urls} from '../constants/utils'

const writeError = (dispatch) => ({responseJSON}) => {
    dispatch(actions.openErrorDialog(responseJSON.message))
}

export function fetchObjects(dispatch) {
    actions.addObjectsRequest(urls.clients)
    sqlContext.Clients.getAll()
        .done((objects) => {
            dispatch(actions.addObjectsSuccess(urls.clients, objects))
        }).fail(writeError(dispatch))
    actions.addObjectsRequest(urls.rooms)
    sqlContext.Rooms.getAll()
        .done((objects) => {
            dispatch(actions.addObjectsSuccess(urls.rooms, objects))
        }).fail(writeError(dispatch))
    actions.addObjectsRequest(urls.roomClient)
    sqlContext.RoomClient.getAll()
        .done((objects) => {
            dispatch(actions.addObjectsSuccess(urls.roomClient, objects))
        }).fail(writeError(dispatch))
    actions.addObjectsRequest(urls.roomReservation)
    sqlContext.RoomReservation.getAll()
        .done((objects) => {
            dispatch(actions.addObjectsSuccess(urls.roomReservation, objects))
        }).fail(writeError(dispatch))
}

export function deleteObjects(dispatch, table, deletingObjects) {
    dispatch(actions.sendRequestToDelete(table))
    sqlContext[table].delete(...deletingObjects).done(() => {
        dispatch(actions.requestToDeleteSuccess(table));
    }).fail(writeError(dispatch))
}

export function createObject(dispatch, table, object) {
    dispatch(actions.sendRequestToCreate(table))
    sqlContext[table].insert(object)
        .done(() =>
            dispatch(actions.requestToCreateSuccess(table, object)))
        .fail(writeError(dispatch))
}

export function updateObject(dispatch, table, oldObject, newObject) {
    dispatch(actions.sendRequestToUpdate(table))
    sqlContext[table].update(oldObject, newObject)
        .done(() =>
            dispatch(actions.requestToUpdateSuccess(table, oldObject, newObject)))
        .fail(writeError(dispatch))
}