import {ExecuteQuery} from '../sqliteHelper';

export const AreaListTable = 'AreaListTable';

export const AreaListTableCoulumnskey = {
  AreaCode: 'AreaCode',
  Name: 'Name',
};
export const AreaListTableCreateTableCoulumns = `AreaCode TEXT  PRIMARY KEY NOT NULL, Name  TEXT`;

export const AreaListTableInsertCoulumns = `AreaCode, Name`;

export const InsertAreaListTableCells = async values => {
  let InsertDataQuery = `INSERT INTO ${AreaListTable} (${AreaListTableInsertCoulumns}) VALUES`;

  for (let i = 0; i < values?.length; ++i) {
    InsertDataQuery =
      InsertDataQuery +
      "('" +
      values[i].AreaCode +
      "','" +
      values[i].Name +
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
