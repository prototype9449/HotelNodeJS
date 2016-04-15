import { createStore } from 'redux'
import rootReducer from '../reducers'

const initialState = {

}


export default function configureStore(state = initialState) {
    const store = createStore(rootReducer, state)

    if (module.hot) {
        module.hot.accept('../reducers', () => {
            const nextReducer = require('../reducers').default
            store.replaceReducer(nextReducer)
        })
    }

    return store
}
