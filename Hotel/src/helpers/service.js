import * as actions from '../actions'
import sqlContext from '../helpers/repository'
import {urls} from '../constants/utils'

export function fetchObjects(dispatch) {
    actions.addObjectsRequest(urls.clients)
    sqlContext.Clients.getAll()
        .done((objects) => {
            dispatch(actions.addObjectsSuccess(urls.clients, objects))
        })
    actions.addObjectsRequest(urls.rooms)
    sqlContext.Rooms.getAll()
        .done((objects) => {
            dispatch(actions.addObjectsSuccess(urls.rooms, objects))
        })
    actions.addObjectsRequest(urls.roomClient)
    sqlContext.RoomClient.getAll()
        .done((objects) => {
            dispatch(actions.addObjectsSuccess(urls.roomClient, objects))
        })
    actions.addObjectsRequest(urls.roomReservation)
    sqlContext.RoomReservation.getAll()
        .done((objects) => {
            dispatch(actions.addObjectsSuccess(urls.roomReservation, objects))
        })
}

export function deleteObjects(dispatch, table, deletingObjects) {
    dispatch(actions.sendRequestToDelete(table))
    sqlContext[table].delete(...deletingObjects).done(() => {
        dispatch(actions.requestToDeleteSuccess(table));
    }).fail(({responseJSON}) => {
        dispatch(actions.openErrorDialog(responseJSON.message))
    });
}

export function createObject(dispatch, table, object) {
    dispatch(actions.sendRequestToCreate(table))
    sqlContext[table].insert(object)
        .done(() =>
            dispatch(actions.requestToCreateSuccess(table, object)))
        .fail((text) =>  dispatch(actions.openErrorDialog(text)))
}