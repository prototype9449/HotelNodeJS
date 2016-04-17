import React from 'react';
import Row from './row.jsx';
import Checkbox from 'material-ui/lib/checkbox';
import FlatButton from 'material-ui/lib/flat-button';
import CustomSet from '../helpers/customSet';
import _ from 'lodash'

export default class CustomTable extends React.Component {
    static propTypes = {
        nameFields: React.PropTypes.arrayOf(React.PropTypes.string),
        areAllChecked: React.PropTypes.bool,
        checkedRows: React.PropTypes.instanceOf(CustomSet),
        objects: React.PropTypes.instanceOf(CustomSet),
        onCheck: React.PropTypes.func,
        onCheckAll: React.PropTypes.func,
        onShowCreateDialog: React.PropTypes.func,
        onDeleteObject: React.PropTypes.func,
        onShowUpdateDialog: React.PropTypes.func,
        fieldTransform: React.PropTypes.func
    }

    constructor(props) {
        super(props);
    }

    render() {
        const {objects,checkedRows, nameFields, areAllChecked, fieldTransform} = this.props
        const {onShowUpdateDialog,  onCheck, onCheckAll, onShowCreateDialog, onDeleteObject} = this.props

        const tableRows = objects.toArray().map((object, i)=> {
            const isChecked = checkedRows.hasObject(object)
            return <Row isChecked={isChecked} object={object} key={i} index={i}
                        onCheck={onCheck(i)} onClick={onShowUpdateDialog(i)} fieldTransform={fieldTransform}/>
        });

        const tableHeaders = [' '].concat(nameFields).map((name, i) => {
            return <th key={i}>
                {name}
            </th>;
        })

        return (
            <div>
                {this.props.children}
                <FlatButton label="Create" onClick={onShowCreateDialog}/>
                <FlatButton label="Delete" onClick={onDeleteObject}/>
                <Checkbox
                    checked={areAllChecked}
                    onCheck={onCheckAll}
                    label="Select All"
                    labelPosition="right"
                />

                <table className="customTable table-hover">
                    <thead>
                    <tr>
                        {tableHeaders}
                    </tr>
                    </thead>
                    <tbody>
                    {tableRows}
                    </tbody>
                </table>
            </div>
        )
    }
}
