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
import _ from 'lodash';

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

        this.interval = null;
    }

    componentDidMount() {
        this.interval = setInterval(() => {
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
        }, 10000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }


    getChildContext() {
        return {
            muiTheme: getMuiTheme()
        };
    }

    onDeleteObjects(name, deletedObjects) {
        let objects = this.state[name];
        _.remove(objects, (x) => {
            return deletedObjects.some(y => _.isEqual(x, y));
        });
        this.setState({[name]: objects});
    }

    render() {
        return (
            <Tabs className='tabs'>
                <Tab label="Tab A">
                    <div>
                        <SuperTable key="clients"
                                    onDeleteObjects={this.onDeleteObjects.bind(this, 'clients')}
                                    fields={clientFields}
                                    sqlContext={sqlContext.Clients()}
                                    objects={this.state.clients} name="clients"/>
                    </div>
                </Tab>
                <Tab label="Tab B">
                    <div>
                        <SuperTable key="rooms"
                                    onDeleteObjects={this.onDeleteObjects.bind(this, 'rooms')}
                                    fields={roomFields}
                                    sqlContext={sqlContext.Rooms()}
                                    objects={this.state.rooms}
                                    name="rooms"/>
                    </div>
                </Tab>
                <Tab label="Tab C">
                    <div>
                        <SuperTable key="roomClients"
                                    onDeleteObjects={this.onDeleteObjects.bind(this, 'roomClients')}
                                    fields={roomClientFields}
                                    sqlContext={sqlContext.RoomClient()}
                                    objects={this.state.roomClients}
                                    name="roomClients"/>
                    </div>
                </Tab>
                <Tab label="Tab D">
                    <div>
                        <SuperTable key="roomReservations"
                                    onDeleteObjects={this.onDeleteObjects.bind(this, 'roomReservations')}
                                    fields={roomReservationFields}
                                    sqlContext={sqlContext.RoomReservation()}
                                    objects={this.state.roomReservations}
                                    name="roomReservations"/>
                    </div>
                </Tab>
            </Tabs>);
    }
}

App.childContextTypes = {
    muiTheme: React.PropTypes.object
};

export default App;
