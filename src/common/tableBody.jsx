import React from 'react';
import _ from "lodash"

const TableBody = ({ data, columns }) => {
    const renderCell = (item, column) => {
        // item is movie
        if (column.content) return column.content(item);
        
        return _.get(item, column.path);
    };

    const createKey = (item, column) => {
        return item._id + (column.path || column.key)
    }

    return (
        <tbody>
            {data.map(item =>
                <tr key={item._id}>{columns.map(column =>
                    // pay attention to this key structure
                    <td key={createKey(item,column)}>{renderCell(item, column)}</td>
                )}
                </tr>
            )}
        </tbody>
    );
}
 
export default TableBody;