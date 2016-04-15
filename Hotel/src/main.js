import React from 'react';
import App from './components/app.jsx';
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'
require('./main.scss');

var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

const store = configureStore();

render(
<Provider store={store}>
    <App />
    </Provider>,
    document.getElementById('container')
)