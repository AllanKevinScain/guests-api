export type GuestType = {
  id?: number;
  name: string;
  tableNumber: number;
  approved?: boolean;
  payment?: "PAYED" | "PENDING";
};

export type ReturnType = {
  columns: unknown[];
  columnTypes: unknown[];
  rows: unknown[];
  rowsAffected: number;
  lastInsertRowid: string;
};
