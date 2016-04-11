import React from 'react';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import TextField from 'material-ui/lib/text-field';


export default class FormDialog extends React.Component {
    constructor(props) {
        super(props);
        this.fields = {};
    }

    getProperties() {
        let properties = [];
        for(let prop in this.fields){
            properties.push({
                    name : prop,
                    value : this.fields[prop].getValue()
                });
        }
        return properties;
    }

    render() {
        const actions = [
            <FlatButton
                label="Create"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.props.createHandle}
            />,
            <FlatButton
                label="Cancel"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.props.cancelHandle}
            />
        ];

        const textFields = this.props.properties.map(x => {
            return <div>
                <TextField hintText={x.name} ref={(field) => this.fields[x.name] = field}/>
                <br/>
            </div>
        });

        return <Dialog className="dialog"
                       title="Create"
                       actions={actions}
                       modal={false}
                       open={this.props.isOpen}
                       onRequestClose={this.props.cancelHandle}>
            {textFields}
        </Dialog>;
    }
}