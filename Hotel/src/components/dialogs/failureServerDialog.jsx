import React from 'react';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';

export default class FailureServerDialog extends React.Component {
    static propTypes = {
        onOkHandler: React.PropTypes.func
    };

    constructor(props) {
        super(props)
    }

    render() {
        const actions = [
            <FlatButton
                label="Ok"
                secondary={true}
                onTouchTap={this.props.onOkHandler}
            />]

        return <Dialog className="dialog"
                       title="Error"
                       actions={actions}
                       modal={false}
                       open={this.props.isOpen}
                       onRequestClose={this.props.onOkHandler}>
            <div>
                There was an error with receiving of objects from server
            </div>
        </Dialog>
    }
}