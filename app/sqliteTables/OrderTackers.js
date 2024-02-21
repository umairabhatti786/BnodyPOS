import {ExecuteQuery} from '../sqliteHelper';

export const OrderTackerList = 'OrderTackerList';

export const OrderTackerListCoulumnskey = {
  SalesAgentCode: 'SalesAgentCode',
  OrderTakerName: 'OrderTakerName',
  Email: 'Email',
  Phone: 'Phone',
  DiscountLimit: 'DiscountLimit',
};
export const OrderTackerListCreateTableCoulumns = `SalesAgentCode INTEGER  PRIMARY KEY NOT NULL, OrderTakerName  TEXT,Email  TEXT, Phone TEXT,DiscountLimit FLOAT`;

export const OrderTackerListInsertCoulumns = `SalesAgentCode, OrderTakerName,Email,Phone,DiscountLimit`;

export const InsertOrderTackerListCells = async values => {
  let InsertDataQuery = `INSERT INTO ${OrderTackerList} (${OrderTackerListInsertCoulumns}) VALUES`;

  for (let i = 0; i < values?.length; ++i) {
    InsertDataQuery =
      InsertDataQuery +
      "('" +
      values[i].SalesAgentCode +
      "','" +
      values[i].OrderTakerName +
      "','" +
      values[i].Email +
      "','" +
      values[i].Phone +
      "','" +
      values[i].DiscountLimit +
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
