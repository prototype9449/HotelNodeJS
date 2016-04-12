import React from 'react';
import $ from 'jquery';
import 'jquery.cookie';
import sqlContext from '../helpers/repository';
import getMuiTheme from 'material-ui/lib/styles/getMuiTheme';
import CustomTable from './CustomTable.jsx';
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
import SuperTable from './CustomTable.jsx';
import {roomFields, clientFields, roomClientFields, roomReservationFields} from '../helpers/constants';


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
            <Tabs className='tabs'>
                <Tab label="Tab A">
                    <div>
                        <SuperTable key="clients" fields={clientFields} sqlContext={sqlContext.Clients()}
                                    objects={this.state.clients} name="clients"/>
                    </div>
                </Tab>
                <Tab label="Tab B">
                    <div>
                        <SuperTable key="rooms" fields={roomFields} sqlContext={sqlContext.Rooms()} objects={this.state.rooms}
                                    name="rooms"/>
                    </div>
                </Tab>
                <Tab label="Tab C">
                    <div>
                        <SuperTable key="roomClients" fields={roomClientFields} sqlContext={sqlContext.RoomClient()}
                                    objects={this.state.roomClients} name="roomClients"/>
                    </div>
                </Tab>
                <Tab label="Tab D">
                    <div>
                        <SuperTable key="roomReservations" fields={roomReservationFields} sqlContext={sqlContext.RoomReservation()}
                                    objects={this.state.roomReservations} name="roomReservations"/>
                    </div>
                </Tab>
            </Tabs>);
    }
}

App.childContextTypes = {
    muiTheme: React.PropTypes.object
};

export default App;
