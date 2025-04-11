import { ColumnType } from "./ColumnType";

interface TableHeaderProps<T> {
  columns: ColumnType<T>[];
}

export function TableHeader<T>({ columns }: TableHeaderProps<T>) {
  return (
    <tr>
      {columns.map((col, colIndex) => (
        <th
          key={`table-head-cell-${colIndex}`}
          style={{ width: col.width }}
        >
          {col.title}
        </th>
      ))}
    </tr>
  );
}
