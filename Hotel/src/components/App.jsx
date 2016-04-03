import React from 'react';
import $ from 'jquery';
import 'jquery.cookie';

class App extends React.Component {
    constructor() {
        super();
        $.cookie('login', 'admin');
        $.cookie('password', 'admin');

        $.ajax({
                type: "GET",
                crossDomain: true,
                xhrFields: {
                    withCredentials: true
                },
                url: "http://localhost:3000/Clients"
            })
            .done((result) => {
                debugger;
                this.setState({messages: ['  fdsfdsfd s', 'f sdf dsf']});
            });

        this.state = {
            messages: [
                'Hello there how are you?',
                'I am fine, and you?'
            ]
        };
    }

    render() {
        var messageNodes = this.state.messages.map((message)=> {
            return (
                <div>{message}</div>
            );
        });

        return (
            <div>{messageNodes}</div>
        );
    }
}

export default App;
