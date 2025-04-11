import { ColumnType } from "./ColumnType";

interface TableRowCellProps<T> {
  item: T;
  column: ColumnType<T>;
}

export function get(object: any, path: string, defaultValue?: unknown) {
  const keys = path.split('.');
  let result = object;

  for (const key of keys) {
    result = result ? result[key] : null;
  }

  return !result ? defaultValue : result;
}

export function TableRowCell<T>({ item, column }: TableRowCellProps<T>) {
  return <td>{column.render ? column.render(column, item) : get(item, column.key)}</td>;
}
