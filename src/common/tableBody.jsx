import React, { Component } from 'react';
import _ from "lodash"

class TableBody extends Component {
    renderCell = (item, column) => {
        // item is movie
        if (column.content) return column.content(item);

        return _.get(item, column.path);
    };
    createKey = (item, column) => {
        return item._id + (column.path || column.key)
    }

    render() { 
        const { data, columns } = this.props;
        return (
            <tbody>
                {data.map(item =>
                    <tr key={item._id}>{columns.map(column =>
                        // pay attention to this key structure
                        <td key={this.createKey(item,column)}>{this.renderCell(item, column)}</td>
                    )}
                    </tr>
                )}
            </tbody>
        );
    }
}
 
export default TableBody;