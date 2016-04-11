import React from 'react';
import Row from './Row.jsx';
import Checkbox from 'material-ui/lib/checkbox';
import RaisedButton from 'material-ui/lib/raised-button';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import TextField from 'material-ui/lib/text-field';
import FormDialog from './FormDialog.jsx';

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
            isAllChecked: false,
            checkedRows: [],
            isDialogOpen: false
        };
        this.name = this.props.name;
    }

    checkAll(e) {
        this.setState({
            isAllChecked: !this.isAllChecked
        });
        e.preventDefault();
    }

    CheckRow(index, isChecked) {
        let checkedRows = this.state.checkedRows;
        if(isChecked){
            checkedRows.push(this.props.objects[index]);
        }

        this.setState({checkedRows})
    }

    cancelHandle() {
        this.setState({
            isDialogOpen: false
        });
    }

    openDialog() {
        this.setState({
            isDialogOpen: true
        })
    }

    createHandle(e) {
        let values = this.refs.formDialog.getProperties();
        const s = 1;
    }

    deleteHandle() {
        let deletingObjects = this.state.checkedRows;

        let s = 1;
    }

    render() {
        if (this.props.objects.length == 0) {
            return null;
        }

        let tableRows = this.props.objects.map((object, i)=> {

            let isChecked = this.state.checkedRows.some(x=> x.Id == object.Id);
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
                    ref = 'formDialog'
                    isOpen ={this.state.isDialogOpen}
                    cancelHandle = {this.cancelHandle.bind(this)}
                    createHandle ={this.createHandle.bind(this)}
                    properties = {properties}
                />
                <FlatButton label="Create" onClick={this.openDialog.bind(this)}/>
                <FlatButton label="Delete" onClick={this.deleteHandle.bind(this)}/>
                <Checkbox
                    defaultChecked={this.state.isAllChecked}
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
