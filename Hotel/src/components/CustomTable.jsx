import Table from 'material-ui/lib/table/table';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
import TableRow from 'material-ui/lib/table/table-row';
import TableHeader from 'material-ui/lib/table/table-header';
import TableRowColumn from 'material-ui/lib/table/table-row-column';
import TableBody from 'material-ui/lib/table/table-body';
import React from 'react';

function getProperties(object) {
    let names = Object.getOwnPropertyNames(object);
    return names.map(x => {
        return {name: x, value: object[x]}
    });
}

export default class CustomTable extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        debugger;
        if(this.props.objects.length == 0){
            return null;
        }


        let tableRows = this.props.objects.map((object)=> {

            let properties = getProperties(object);
            let columns = properties.map(x => {
                return <TableRowColumn>{x.value}</TableRowColumn>
            });

            return (<TableRow className='tableRow'>{columns}</TableRow>);
        });
        let properties = getProperties(this.props.objects[0]);
        let tableHeaders = properties.map(x => {
            return <TableHeaderColumn>{x.name}</TableHeaderColumn>;
        });

        return (
            <Table className="table">
                <TableHeader>
                    <TableRow>
                        {tableHeaders}
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {tableRows}
                </TableBody>);
            </Table>)
    }
}


