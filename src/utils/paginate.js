import _ from "lodash";
// Paginate data on the client side
export function paginate(items, pageNumber, pagesize) {
    const startIndex = (pageNumber - 1) * pagesize;
    // Slice array of items from start index /////////_(items) => lodash wrapper ///////.value() => return regular method
    return _(items).slice(startIndex).take(pagesize).value();
}