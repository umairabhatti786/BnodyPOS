import {ExecuteQuery} from '../sqliteHelper';

export const RestTablesTable = 'RestTablesTable';

export const RestTablesTableCoulumnskey = {
  TableCodeID: 'TableCodeID',
  TotalCapacity: 'TotalCapacity',
  IsAvailable: 'IsAvailable',
  TableTypeName: 'TableTypeName',
  AreaName: 'AreaName',
  AreaCode: 'AreaCode',
};
export const RestTablesTableCreateTableCoulumns = `TableCodeID TEXT  PRIMARY KEY NOT NULL, TotalCapacity  TEXT, IsAvailable BOOLEAN, TableTypeName  TEXT, AreaName TEXT, AreaCode TEXT`;

export const RestTablesTableInsertCoulumns = `TableCodeID, TotalCapacity, IsAvailable, TableTypeName, AreaName, AreaCode`;

export const InsertRestTablesTableCells = async values => {
  let InsertDataQuery = `INSERT INTO ${RestTablesTable} (${RestTablesTableInsertCoulumns}) VALUES`;

  for (let i = 0; i < values?.length; ++i) {
    InsertDataQuery =
      InsertDataQuery +
      "('" +
      values[i].TableCode +
      "','" +
      values[i].TotalCapacity +
      "','" +
      values[i].IsAvailable +
      "','" +
      values[i].TableTypeName +
      "','" +
      values[i].AreaName +
      "','" +
      values[i].AreaCode +
      "')";
    if (i != values.length - 1) {
      InsertDataQuery = InsertDataQuery + ',';
    }
    // console.log('Insert Product Details InsertDataQuery..', name, name2);
  }

  InsertDataQuery = InsertDataQuery + ';';

  let InsertRestTableCells = await ExecuteQuery(InsertDataQuery, []);
  console.log('Insert Table Details..', InsertRestTableCells);
};
