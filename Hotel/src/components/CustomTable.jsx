import React from 'react';
import Row from './Row.jsx';
import Checkbox from 'material-ui/lib/checkbox';
import RaisedButton from 'material-ui/lib/raised-button';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import TextField from 'material-ui/lib/text-field';
import FormDialog from './FormDialog.jsx';
import CustomSet from '../helpers/customSet';

function getProperties(object) {
    let names = Object.getOwnPropertyNames(object);
    return names.map(x => {
        return {name: x, value: object[x]}
    });
}

export default class SuperTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            areAllChecked: false,
            checkedRows: new CustomSet(),
            isDialogOpen: false
        };
        this.name = this.props.name;
    }

    checkAll(e) {
        let areAllChecked = !this.state.areAllChecked;
        let checkedRows = new CustomSet();
        if (areAllChecked) {
            this.props.objects.forEach(x => checkedRows.add(x));
            this.setState({
                areAllChecked: !this.state.areAllChecked,
                checkedRows
            });
        } else {
            if (this.state.checkedRows.size == this.props.objects.length) {
                this.setState({
                    areAllChecked: false,
                    checkedRows: new CustomSet()
                });
            }
        }

    }

    CheckRow(index, isChecked) {
        let checkedRows = this.state.checkedRows;
        let areAllChecked = this.state.areAllChecked;
        if (isChecked) {
            checkedRows.add(this.props.objects[index]);
            areAllChecked = checkedRows.size == this.props.objects.length;
        } else {
            areAllChecked = false;
            checkedRows.delete(this.props.objects[index]);
        }

        this.setState({checkedRows, areAllChecked})
    }

    dialogHandle() {
        this.setState({
            isDialogOpen: !this.state.isDialogOpen
        })
    }

    createHandle(e) {
        const object = this.refs.formDialog.getCreatedObject();
        this.props.sqlContext.insert(object).done(() => {
            this.dialogHandle();
            console.log('success');
        }).fail(() => console.log('fail'));
        const s = 1;
    }

    deleteHandle() {
        let deletingObjects = this.state.checkedRows.toArray();
        this.props.sqlContext.delete(...deletingObjects).then(() => {
            this.props.onDeleteObjects(deletingObjects);
        });
    }

    render() {
        if (this.props.objects.length == 0) {
            return null;
        }

        let tableRows = this.props.objects.map((object, i)=> {

            let isChecked = this.state.checkedRows.toArray().some(x=> _.isEqual(x, object));
            return <Row checked={isChecked} object={object} key={i + this.name} index={i}
                        callback={this.CheckRow.bind(this)}/>
        });
        let properties = getProperties(this.props.objects[0]);
        let tableHeaders = properties.map((x, i) => {
            return <th key={i}>
                {x.name}
            </th>;
        });

        return (

            <div>
                <FormDialog
                    ref='formDialog'
                    isOpen={this.state.isDialogOpen}
                    cancelHandle={this.dialogHandle.bind(this)}
                    createHandle={this.createHandle.bind(this)}
                    fields={this.props.fields}
                />
                <FlatButton label="Create" onClick={this.dialogHandle.bind(this)}/>
                <FlatButton label="Delete" onClick={this.deleteHandle.bind(this)}/>
                <Checkbox
                    checked={this.state.areAllChecked}
                    onCheck={this.checkAll.bind(this)}
                    label="Select All"
                    labelPosition="right"
                />

                <table className="table table-hover">
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
