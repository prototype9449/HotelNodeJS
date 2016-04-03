import React from 'react';
import $ from 'jquery';
import 'jquery.cookie';
import sqlContext from '../helpers/repository';
import Table from 'material-ui/lib/table/table';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
import TableRow from 'material-ui/lib/table/table-row';
import TableHeader from 'material-ui/lib/table/table-header';
import TableRowColumn from 'material-ui/lib/table/table-row-column';
import TableBody from 'material-ui/lib/table/table-body';
import getMuiTheme from 'material-ui/lib/styles/getMuiTheme';

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
        var messageNodes = this.state.clients.map((client)=> {

            let sexName = client.Sex ? 'Man' : 'Woman';
            return (
                <TableRow >
                    <TableRowColumn>{client.Id}</TableRowColumn>
                    <TableRowColumn>{client.FullName}</TableRowColumn>
                    <TableRowColumn>{client.Passport}</TableRowColumn>
                    <TableRowColumn>{sexName}</TableRowColumn>
                </TableRow>
            );
        });

        return (
            <Table style = {{ maxWidth : 700, margin: '30px auto 30px' }}>
                <TableHeader>
                    <TableRow>
                        <TableHeaderColumn>Id</TableHeaderColumn>
                        <TableHeaderColumn>FullName</TableHeaderColumn>
                        <TableHeaderColumn>Passport</TableHeaderColumn>
                        <TableHeaderColumn>Sex</TableHeaderColumn>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {messageNodes}
                </TableBody>);
            </Table>)
    }
}

App.childContextTypes = {
    muiTheme: React.PropTypes.object
};

export default App;
