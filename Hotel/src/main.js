import React from 'react';
import App from './components/App.jsx';
require('./main.scss');
var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

React.render(<App />, document.getElementById('container'));
