/* --- STATE --- */
export interface AdminConsoleState {}

export type ModalType = "UploadData" | null;
export type TableColumns = string[];
export type TableData = string[][];

export type TableStructureError = {
  existingColumns: string[];
  uploadedColumns: string[];
  mismatchPositions: number[];
} | null;

export type UploadState =
  | "Uploading"
  | "UploadingError"
  | "Checking"
  | "CheckingSuccess"
  | "CheckingError"
  | "Sending"
  | "SendingSuccess"
  | "SendingError"
  | "Success"
  | "Error"
  | null;

export type SelectedTable = {
  tableColumns: TableColumns;
  tableData: TableData;
  tableName: string;
  tableDescription: string;
} | null;

export type ContainerState = AdminConsoleState;
