import { ExecuteQuery } from '../sqliteHelper';

export const A4PrintCellsTable = 'A4PrintCells';

export const A4PrintCellsCoulumnskey = {
  ReportColumnID: 'ReportColumnID',
  ColumnName: 'ColumnName',
  StringNumber: 'StringNumber',
  ColumnTitle: 'ColumnTitle',
  ColumnStatus: 'ColumnStatus',
  ColumnVisibility: 'ColumnVisibility',
  ColumnRank: 'ColumnRank',
  ColumnSection: 'ColumnSection',
  ColumnDataType: 'ColumnDataType',
  PageID: 'PageID',
  ColumnStyles: 'ColumnStyles',
};
export const A4PrintCellsCreateTableCoulumns =
  `ReportColumnID INTEGER  PRIMARY KEY NOT NULL, ColumnName  TEXT, StringNumber INTEGER, ColumnTitle  TEXT, ColumnStatus  BOOLEAN, ColumnVisibility BOOLEAN, ` +
  `ColumnRank INTEGER, ColumnSection TEXT, ColumnDataType TEXT, PageID INTEGER, ColumnStyles`;

export const A4PrintCellsInsertCoulumns =
  `ReportColumnID, ColumnName, StringNumber, ColumnTitle, ColumnStatus, ColumnVisibility, ColumnRank, ` +
  `ColumnSection, ColumnDataType, PageID, ColumnStyles`;

export const InsertA4PrintCells = async values => {
  let InsertDataQuery = `INSERT INTO ${A4PrintCellsTable} (${A4PrintCellsInsertCoulumns}) VALUES`;

  for (let i = 0; i < values?.length; ++i) {
    InsertDataQuery =
      InsertDataQuery +
      "('" +
      values[i].ReportColumnID +
      "','" +
      values[i].ColumnName +
      "','" +
      values[i].StringNumber +
      "','" +
      values[i].ColumnTitle +
      "','" +
      values[i].ColumnStatus +
      "','" +
      values[i].ColumnVisibility +
      "','" +
      values[i].ColumnRank +
      "','" +
      values[i].ColumnSection +
      "','" +
      values[i].ColumnDataType +
      "','" +
      values[i].PageID +
      "','" +
      values[i].ColumnStyles +
      "')";
    if (i != values.length - 1) {
      InsertDataQuery = InsertDataQuery + ',';
    }
    // console.log('Insert Product Details InsertDataQuery..', name, name2);
  }

  InsertDataQuery = InsertDataQuery + ';';

  let InsertA4PrintCells = await ExecuteQuery(InsertDataQuery, []);
  //   console.log('Insert Product Details..', InsertA4PrintCells);
};
