import React from 'react';
import {Button} from 'react-bootstrap'

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