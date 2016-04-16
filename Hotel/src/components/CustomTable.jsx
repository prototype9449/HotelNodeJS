import React from 'react';
import Row from './row.jsx';
import Checkbox from 'material-ui/lib/checkbox';
import RaisedButton from 'material-ui/lib/raised-button';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import TextField from 'material-ui/lib/text-field';
import FormDialog from './FormDialog.jsx';
import CustomSet from '../helpers/customSet';

export default class CustomTable extends React.Component {
    static propTypes = {
        nameFields: React.PropTypes.arrayOf(React.PropTypes.string),
        areAllChecked: React.RropTypes.bool,
        checkedRows: React.PropTypes.instanceOf(CustomSet),
        objects : React.PropTypes.instanceOf(CustomSet),
        onCheck: React.PropTypes.func,
        onCheckAll: React.PropTypes.func,
        onShowCreateDialog: React.PropTypes.func,
        onDelete: React.PropTypes.func
    }

    constructor(props) {
        super(props);
    }

    //checkAll(e) {
    //    let areAllChecked = !this.state.areAllChecked;
    //    let checkedRows = new CustomSet();
    //    if (areAllChecked) {
    //        this.props.objects.forEach(x => checkedRows.add(x));
    //        this.setState({
    //            areAllChecked: !this.state.areAllChecked,
    //            checkedRows
    //        });
    //    } else {
    //        if (this.state.checkedRows.size == this.props.objects.length) {
    //            this.setState({
    //                areAllChecked: false,
    //                checkedRows: new CustomSet()
    //            });
    //        }
    //    }
    //
    //}

    //CheckRow(index, isChecked) {
    //    let checkedRows = this.state.checkedRows;
    //    let areAllChecked = this.state.areAllChecked;
    //    if (isChecked) {
    //        checkedRows.add(this.props.objects[index]);
    //        areAllChecked = checkedRows.size == this.props.objects.length;
    //    } else {
    //        areAllChecked = false;
    //        checkedRows.delete(this.props.objects[index]);
    //    }
    //
    //    this.setState({checkedRows, areAllChecked})
    //}

    //createHandle(e) {
    //    const object = this.refs.formDialog.getCreatedObject();
    //    this.props.sqlContext.insert(object).done(() => {
    //        this.dialogHandle();
    //        console.log('success');
    //    }).fail(() => console.log('fail'));
    //    const s = 1;
    //}

    //deleteHandle() {
    //    let deletingObjects = this.state.checkedRows.toArray();
    //    this.props.sqlContext.delete(...deletingObjects).then(() => {
    //        this.props.onDeleteObjects(deletingObjects);
    //    });
    //}

    render() {
        const {objects, nameFields, areAllChecked, onCheck, onCheckAll, onShowCreateDialog, onDelete} = this.props

        let tableRows = objects.map((object, i)=> {
            let isChecked = checkedRows.hasObject(object);
            return <Row checked={isChecked} object={object} key={i} index={i}
                        onCheck={onCheck}/>
        });

        let tableHeaders = [' '].concat(nameFields).map((name, i) => {
            return <th key={i}>
                {name}
            </th>;
        })

        return (
            <div>
                <FlatButton label="Create" onClick={onShowCreateDialog}/>
                <FlatButton label="Delete" onClick={onDelete}/>
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
