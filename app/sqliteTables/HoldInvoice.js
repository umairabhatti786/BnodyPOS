import { ExecuteQuery } from '../sqliteHelper';

export const HoldInvoiceTable = 'HoldInvoice';

export const HoldInvoiceCoulumnskey = {
  salesBillID: '  salesBillID',
  invoiceNumber: 'invoiceNumber',
  subPrice: 'subPrice',
  creditAmount: 'creditAmount',
  totalPrice: 'totalPrice',
  advancePaidInCash: 'advancePaidInCash',
  selectedProducts: 'selectedProducts',
  date: 'date',
};
export const HoldInvoiceCreateTableCoulumns = `invoiceNumber TEXT  PRIMARY KEY NOT NULL, creditAmount  TEXT, totalPrice  TEXT, advancePaidInCash TEXT, selectedProducts TEXT,   salesBillID TEXT, subPrice TEXT, date TEXT`;

export const HoldInvoiceInsertCoulumns = `invoiceNumber,creditAmount, totalPrice, advancePaidInCash, selectedProducts,   salesBillID, subPrice, date`;

export const InsertHoldInvoice = async values => {
  let InsertDataQuery = `INSERT INTO ${HoldInvoiceTable} (${HoldInvoiceInsertCoulumns}) VALUES`;

  for (let i = 0; i < values?.length; ++i) {
    InsertDataQuery =
      InsertDataQuery +
      "('" +
      values[i].invoiceNumber +
      "','" +
      values[i].creditAmount +
      "','" +
      values[i].totalPrice +
      "','" +
      values[i].advancePaidInCash +
      "','" +
      values[i].selectedProducts +
      "','" +
      values[i].salesBillID +
      "','" +
      values[i].subPrice +
      "','" +
      values[i].date +
      "')";
    if (i != values.length - 1) {
      InsertDataQuery = InsertDataQuery + ',';
    }
    // console.log('Insert Product Details InsertDataQuery..', name, name2);
  }

  InsertDataQuery = InsertDataQuery + ';';

  let InsertHoldInvoice = await ExecuteQuery(InsertDataQuery, []);
  //   console.log('Insert Product Details..', InsertHoldInvoice);
};
