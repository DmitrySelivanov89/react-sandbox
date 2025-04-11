import { ColumnType } from "./ColumnType";
import { TableHeader } from "./TableHeader";
import { TableRow } from "./TableRow";

interface TableProps<T> {
  data: T[];
  columns: ColumnType<T>[];
}

export function Table<T>({ data, columns }: TableProps<T>) {
  return (
    <table>
      <thead>
        <TableHeader columns={columns} />
      </thead>
      <tbody>
        <TableRow data={data} columns={columns} />
      </tbody>
    </table>
  );
}
