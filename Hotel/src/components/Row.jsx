import React from 'react';
import Checkbox from 'material-ui/lib/checkbox';

function getProperties(object) {
    let names = Object.getOwnPropertyNames(object);
    return names.map(x => {
        return {name: x, value: object[x]}
    });
}


export default class Row extends React.Component {
    constructor(props) {
        super(props);
    }

    checkIt() {
        this.props.callback(this.props.index, !this.props.checked);
    }

    render() {
        let properties = getProperties(this.props.object);
        let columns = properties.map((x,i) => {
            return <td key={i}>
                {x.value}
            </td>
        });

        return <tr className='tableRow'>
            <td>
                <Checkbox checked={this.props.checked} onCheck={this.checkIt.bind(this)} />
            </td>
            {columns}
        </tr>;
    }
}
