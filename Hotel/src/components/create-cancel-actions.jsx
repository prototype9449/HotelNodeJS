import React from 'react';
import FlatButton from 'material-ui/lib/flat-button';
import Button from 'react-bootstrap/lib/Button'

export default function(buttonText, onCreate, onDelete, disabled = false){
    return [
        <Button
            bsStyle="primary"
            disabled = {disabled}
            onClick ={onCreate}
        />,
        <Button
            bsStyle="primary"
            onClick ={onDelete}
        />
    ];
}