import * as types from '../constants/ActionTypes'

export function addObjectsRequest(table) {
    return {type: types.REQUEST_ADD_SEND, table}
}

export function addObjectsSuccess(table, objects) {
    return {type: types.REQUEST_ADD_SUCCESS, table, objects}
}

export function openErrorDialog(text) {
    return {type: types.OPEN_ERROR_DIALOG, text}
}

export function openCreateDialog(table) {
    return {type: types.OPEN_CREATE_DIALOG, table}
}

export function openUpdateDialog(table, object) {
    return {type: types.OPEN_UPDATE_DIALOG, table, object}
}

export function closeDialog() {
    return {type: types.CLOSE_DIALOG}
}

export function sendRequestToCreate(table) {
    return {type: types.REQUEST_CREATE_SEND, table}
}

export function requestToCreateSuccess(table, object) {
    return {type: types.REQUEST_CREATE_SUCCESS, table, object}
}

export function sendRequestToDelete(table) {
    return {type: types.REQUEST_DELETE_SEND, table}
}

export function requestToDeleteSuccess(table) {
    return {type: types.REQUEST_DELETE_SUCCESS, table}
}

export function checkAllRows(table) {
    return {type: types.CHECK_ALL_ROWS, table}
}

export function uncheckAllRows(table) {
    return {type: types.CHECK_ALL_ROWS, table}
}

export function checkRow(table, object) {
    return {type: types.CHECK_ROW, table, object}
}

export function uncheckRow(table, object) {
    return {type: types.CHECK_ROW, table, object}
}