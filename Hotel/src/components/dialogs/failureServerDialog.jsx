import React from 'react';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';

export default class FailureServerDialog extends React.Component {
    static propTypes = {
        isOpen: React.PropTypes.bool,
        errorTexts: React.PropTypes.arrayOf(React.PropTypes.string),
        onOkHandler: React.PropTypes.func
    };

    constructor(props) {
        super(props)
    }

    render() {
        const {isOpen, onOkHandler, errorTexts} = this.props

        const errorLines = errorTexts.map(x => {
            return <li>{x}</li>
        })

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
                <ul>
                    {errorLines}
                </ul>
            </div>
        </Dialog>
    }
}