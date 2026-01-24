export type GuestType = {
  id?: number;
  name: string;
  tableNumber: number;
  approved?: boolean;
};

export type ReturnType = {
  columns: unknown[];
  columnTypes: unknown[];
  rows: unknown[];
  rowsAffected: number;
  lastInsertRowid: string;
};
