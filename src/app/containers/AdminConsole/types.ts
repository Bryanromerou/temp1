/* --- STATE --- */
export interface AdminConsoleState {}

export interface TableResponse {
  // This is the base structure of how the table data is going to be returned
  name: string;
  description: string;
  tags: string;
  content: NewTableData;
}

export type GetTIAssessmentItemsResponse = {
  // This is how the actual endpoint is returning the data
  tables: TableResponse[];
};

export type ParsedTableData = {
  [tableName: string]: UpdatedTableResponse;
} | null;

export type UpdatedTableResponse = TableResponse & {
  tableData: TableData;
  tableColumns: TableColumns;
};

export type PutTIAssessmentItemsPayload = {
  [columnName: string]: string | number;
}[];

export type ModalType = "UploadData" | null;
export type TableColumns = string[];
export type TableData = string[][];
export type NewTableData = {
  [columnName: string]: string;
}[];

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
