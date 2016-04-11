import React from 'react';
import $ from 'jquery';
import 'jquery.cookie';
import sqlContext from '../helpers/repository';
import getMuiTheme from 'material-ui/lib/styles/getMuiTheme';
import CustomTable from './CustomTable.jsx';
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
import SuperTable from './SuperTable.jsx';

class App extends React.Component {
    constructor() {
        super();
        $.cookie('login', 'admin');
        $.cookie('password', 'admin');

        this.state = {
            clients: [],
            rooms: [],
            roomClients: [],
            roomReservations: [],
            tabValue: 'a'
        };
    }

    handleChange = (value) => {
        this.setState({
            tabValue: value
        });
    };

    componentDidMount() {

        sqlContext.Clients().getAll()
            .done((result) => {
                this.setState({clients: result});
            });
        sqlContext.Rooms().getAll()
            .done((result) => {
                this.setState({rooms: result});
            });
        sqlContext.RoomClient().getAll()
            .done((result) => {
                this.setState({roomClients: result});
            });
        sqlContext.RoomReservation().getAll()
            .done((result) => {
                this.setState({roomReservations: result});
            });
    }

    getChildContext() {
        return {
            muiTheme: getMuiTheme()
        };
    }

    render() {
        return (
            <Tabs onChange={this.handleChange.bind(this)} value={this.state.tabValue} className = 'tabs'>
                <Tab label="Tab A" value='a'>
                    <div>
                        <SuperTable key="clients" objects={this.state.clients} name ="clients"/>
                    </div>
                </Tab>
                <Tab label="Tab B" value='b'>
                    <div>
                        <SuperTable key="rooms" objects={this.state.rooms} name ="rooms"/>
                    </div>
                </Tab>
                <Tab label="Tab C" value='c'>
                    <div>
                        <SuperTable key="roomClients" objects={this.state.roomClients} name = "roomClients"/>
                    </div>
                </Tab>
                <Tab label="Tab D" value='d'>
                    <div>
                        <SuperTable key="roomReservations" objects={this.state.roomReservations} name="roomReservations"/>
                    </div>
                </Tab>
            </Tabs>);
    }
}

App.childContextTypes = {
    muiTheme: React.PropTypes.object
};

export default App;
