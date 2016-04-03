import React from 'react';
import $ from 'jquery';
import 'jquery.cookie';
import sqlContext from '../helpers/repository';
import getMuiTheme from 'material-ui/lib/styles/getMuiTheme';
import CustomTable from './CustomTable.jsx';

class App extends React.Component {
    constructor() {
        super();
        $.cookie('login', 'admin');
        $.cookie('password', 'admin');

        this.state = {clients: []};
    }

    componentDidMount() {
        sqlContext.Clients().getAll()
            .done((result) => {
                this.setState({clients: result});
            });
    }

    getChildContext() {
        return {
            muiTheme: getMuiTheme()
        };
    }

    render() {
        return <CustomTable objects = {this.state.clients}/>
    }
}

App.childContextTypes = {
    muiTheme: React.PropTypes.object
};

export default App;
