import React from 'react';

function getProperties(object) {
    let names = Object.getOwnPropertyNames(object);
    return names.map(x => {
        return {name: x, value: object[x]}
    });
}

export default class Row extends React.Component {
    static propTypes = {
        object: React.PropTypes.object,
        isChecked: React.PropTypes.bool,
        onCheck: React.PropTypes.func,
        fieldTransform: React.PropTypes.func,
        onClick: React.PropTypes.func
    }

    constructor(props) {
        super(props);
    }

    render() {
        const {object, isChecked, onCheck, onClick, fieldTransform} = this.props;
        const properties = getProperties(object);
        const columns = properties.map((x, i) => {
            const elem = (<td key={i} className="td-row">
                <div className="div-inside-td" key={i} href="#"
                     onClick={onClick}>{fieldTransform(x.name, x.value)}</div>
            </td>)
            return elem;
        });

        return <tr className='tableRow'>
            <td className="row-check-box">
                <div className="checkbox checkbox-primary div-inside-td">
                    <input type="checkbox" className="row-checkbox" checked={isChecked} onChange={onCheck}/>
                </div>
            </td>
            {columns}
        </tr>;
    }
}
