import React from 'react';
import FlatButton from 'material-ui/lib/flat-button';

export default function(buttonText, onCreate, onDelete, disabled = false){
    return [
        <FlatButton
            label={buttonText}
            primary={true}
            keyboardFocused={true}
            disabled = {disabled}
            onTouchTap={onCreate}
        />,
        <FlatButton
            label="Cancel"
            primary={true}
            keyboardFocused={true}
            onTouchTap={onDelete}
        />
    ];
}