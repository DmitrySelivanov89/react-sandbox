import { ColumnType } from "./ColumnType";
import { TableRowCell } from "./TableRowCell";

interface TableRowProps<T> {
  data: T[];
  columns: ColumnType<T>[];
}

export function TableRow<T>({ data, columns }: TableRowProps<T>) {
  return (
    data.map((item, itemIndex) => (
      <tr key={`table-body-${itemIndex}`}>
        {columns.map((col, colIndex) => (
          <TableRowCell
            key={`table-row-cell-${colIndex}`}
            item={item}
            column={col}
          />
        ))}
      </tr>
    ))
  );
} 
