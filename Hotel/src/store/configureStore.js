import { createStore } from 'redux'
import rootReducer from '../reducers'


export default function configureStore(state) {
    const store = createStore(rootReducer, state)

    if (module.hot) {
        module.hot.accept('../reducers', () => {
            const nextReducer = require('../reducers').default
            store.replaceReducer(nextReducer)
        })
    }

    return store
}
