import React from 'react';
import {Modal} from 'react-bootstrap';

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

        return <div>
            <Modal show={isOpen} onHide={onOkHandler}>
                <Modal.Header closeButton>
                    <Modal.Title>Error</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <ol>
                            {errorLines}
                        </ol>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button onClick={onOkHandler} className="btn btn-primary">Close</button>
                </Modal.Footer>
            </Modal>
        </div>
    }
}