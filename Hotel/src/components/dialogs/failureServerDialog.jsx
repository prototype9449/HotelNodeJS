import React from 'react';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';

export default class FailureServerDialog extends React.Component {
    static propTypes = {
        isOpen : React.PropTypes.bool,
        errorText : React.PropTypes.string,
        onOkHandler: React.PropTypes.func
    };

    constructor(props) {
        super(props)
    }

    render() {
        const {isOpen, onOkHandler, errorText} = this.props

        const actions = [
            <FlatButton
                label="Ok"
                secondary={true}
                onTouchTap={onOkHandler}
            />]

        return <Dialog className="dialog"
                       title="Error"
                       actions={actions}
                       modal={false}
                       open={isOpen}
                       onRequestClose={onOkHandler}>
            <div>
                {errorText}
            </div>
        </Dialog>
    }
}