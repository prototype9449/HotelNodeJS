import { combineReducers } from 'redux'
import * as types from '../constants/actionTypes'
import {urls} from '../constants/utils'
import CustomSet from '../helpers/customSet'
import _ from 'lodash'

function getInitialStateForTable() {
    return {
        objects: new CustomSet(),
        checkedRows: new CustomSet(),
        areAllChecked: false,
        isIndicatorShown: false
    }
}

const initialState = {
    [urls.clients]: {
        ...(getInitialStateForTable())
    },
    [urls.rooms]: {
        ...(getInitialStateForTable())
    },
    [urls.roomClient]: {
        ...(getInitialStateForTable())
    },
    [urls.roomReservation]: {
        ...(getInitialStateForTable())
    },
    dialogForObject: null,
    errorTexts: [],
    isErrorDialogShown: false
}

function reducer(state = initialState, action) {
    switch (action.type) {
        case types.REQUEST_ADD_SEND :
            return {
                ...state,
                [action.table]: {
                    ...(getInitialStateForTable()),
                    isIndicatorShown: true
                }
            }
        case types.REQUEST_ADD_SUCCESS :
            return {
                ...state,
                [action.table]: {
                    ...(getInitialStateForTable()),
                    objects: new CustomSet(action.objects),
                    isIndicatorShown: false
                }
            }
        case types.OPEN_ERROR_DIALOG :
            return {
                ...state,
                errorTexts: [...state.errorTexts, action.text],
                isErrorDialogShown: true
            }
        case types.OPEN_CREATE_DIALOG :
            return {
                ...state,
                [action.table]: {
                    ...[action.table],
                    isIndicatorShown: false
                },
                dialogForObject: {
                    table: action.table
                }
            }
        case types.OPEN_UPDATE_DIALOG :
            return {
                ...state,
                dialogForObject: {
                    table: action.table,
                    object: action.object
                }
            }
        case types.CLOSE_DIALOG :
            let object = {}
            Object.keys(urls).forEach(x => {
                object[urls[x]] = {
                    ...state[[urls[x]]],
                    isIndicatorShown : false
                }
            })

            return {
                ...state,
                ...object,
                dialogForObject: null,
                isErrorDialogShown: false
            }
        case types.REQUEST_CREATE_SEND :
            return {
                ...state,
                dialogForObject: null,
                [action.table]: {
                    ...state[action.table],
                    isIndicatorShown: true
                }
            }
        case types.REQUEST_CREATE_SUCCESS :
            debugger
            const resultObjects = state[action.table].objects.add(action.object)
            return {
                ...state,
                [action.table]: {
                    ...(getInitialStateForTable()),
                    objects: resultObjects,
                    isIndicatorShown: false
                }
            }
        case types.REQUEST_DELETE_SEND :
            return {
                ...state,
                [action.table]: {
                    ...state[action.table],
                    isIndicatorShown: true
                }
            }
        case types.REQUEST_DELETE_SUCCESS :
            const deleted = state[action.table].checkedRows.toArray();
            const current = state[action.table].objects;

            return {
                ...state,
                [action.table]: {
                    ...(getInitialStateForTable()),
                    objects: current.delete(deleted),
                    isIndicatorShown: false
                }
            }
        case types.CHECK_ALL_ROWS :
            return {
                ...state,
                [action.table]: {
                    ...state[action.table],
                    checkedRows: state[action.table].objects.toSet(),
                    areAllChecked: true
                }
            }
        case types.UNCHECK_ALL_ROWS :
            return {
                ...state,
                [action.table]: {
                    ...state[action.table],
                    checkedRows: state[action.table].checkedRows.clear(),
                    areAllChecked: false
                }
            }
        case types.CHECK_ROW :
        {
            const areAllChecked = state[action.table].checkedRows.size === state[action.table].objects;
            const checkedRows = state[action.table].checkedRows.add(action.object)

            const result = {
                ...state,
                [action.table]: {
                    ...state[action.table],
                    checkedRows,
                    areAllChecked
                }
            }
            return result
        }
        case types.UNCHECK_ROW :
            const checkedRows = state[action.table].checkedRows.delete(action.object)
            return {
                ...state,
                [action.table]: {
                    ...state[action.table],
                    areAllChecked: false,
                    checkedRows
                }
            }
        default:
            return state
    }
}

export default reducer