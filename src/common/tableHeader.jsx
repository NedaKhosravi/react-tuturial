import React from 'react';

// columns: array
// sortColumn: object
// onSort: function
const TableHeader = ({columns, sortColumn, onSort}) => {
    const raiseSort = path => {
        // Difference between [] and {} ?????????????????????ask
        const ourSortColumn = { ...sortColumn };
        if (ourSortColumn.path === path) {
            ourSortColumn.order = ourSortColumn.order === 'asc' ? 'desc' : 'asc';
        }
        else {
            ourSortColumn.path = path;
            ourSortColumn.order = 'asc';
        }
        onSort(ourSortColumn);
    }

    const renderSortIcon = column => {
        if (column.path != sortColumn.path) return null;
        if (sortColumn.order === 'asc') return <i className="fa fa-sort-asc" />
        return <i className="fa fa-sort-desc" />
    }

    return (
        <thead>
            <tr>
                {columns.map(column =>
                (<th
                    className='clickable'
                    key={column.path || column.key}
                    onClick={() => raiseSort(column.path)}
                >{column.label} {renderSortIcon(column)}
                </th>)
                )}
            </tr>
        </thead>);
}
 
export default TableHeader;