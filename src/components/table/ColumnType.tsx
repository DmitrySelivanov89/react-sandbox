export interface ColumnType<T> {
  key: string;
  title: string;
  width?: number;
  render?: (column: ColumnType<T>, item: T) => void;
}
