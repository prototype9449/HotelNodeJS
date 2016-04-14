export default function(onCreate, onDelete){
    return [
        <FlatButton
            label="Create"
            primary={true}
            keyboardFocused={true}
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