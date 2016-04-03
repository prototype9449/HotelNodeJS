import React from 'react';
import $ from 'jquery';
import 'jquery.cookie';
import sqlContext from '../helpers/repository';

class App extends React.Component {
    constructor() {
        super();
        $.cookie('login', 'admin');
        $.cookie('password', 'admin');
        sqlContext.Clients().getAll()
            .done((result) => {
                debugger;

                this.setState({clients: result});
            });

        this.state = {clients: []};
    }

    render() {
        var messageNodes = this.state.clients.map((client)=> {
            return (
                <div>{client.FullName}</div>
            );
        });

        return (
            <div>{messageNodes}</div>
        );
    }
}

export default App;
