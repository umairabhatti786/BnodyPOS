import {ExecuteQuery} from '../sqliteHelper';

export const PaymentMethodTable = 'PaymentMethod';

export const PaymentMethodListtCoulumnskey = {
  PaymentType: 'PaymentType',
  PaymentTypeName: 'PaymentTypeName',
  PaymentTypeName2: 'PaymentTypeName2',
  Sales: 'Sales',
};

export const PaymentMethodListCreateTableCoulumns = `PaymentType  TEXT PRIMARY KEY NOT NULL, PaymentTypeName  TEXT, PaymentTypeName2  TEXT, Sales  TEXT`;

export const PaymentMethodListInsertCoulumns = `PaymentType, PaymentTypeName, PaymentTypeName2, Sales`;

export const InsertPaymentMethodList = async values => {
  let InsertDataQuery = `INSERT INTO ${PaymentMethodTable} (${PaymentMethodListInsertCoulumns}) VALUES`;

  for (let i = 0; i < values?.length; ++i) {
    InsertDataQuery =
      InsertDataQuery +
      "('" +
      values[i].PaymentType +
      "','" +
      values[i].PaymentTypeName +
      "','" +
      values[i].PaymentTypeName2 +
      "','" +
      values[i].Sales +
      "')";
    if (i != values.length - 1) {
      InsertDataQuery = InsertDataQuery + ',';
    }
  }
  InsertDataQuery = InsertDataQuery + ';';
  let InsertPaymentMethodList = await ExecuteQuery(InsertDataQuery, []);
  // console.log('Insert Product Details..', InsertPaymentMethodList);
};
