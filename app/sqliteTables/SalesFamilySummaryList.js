import { ExecuteQuery } from '../sqliteHelper';

export const SalesFamilySummaryListTable = 'SalesFamilySummaryList';

export const SalesFamilySummaryListCoulumnskey = {
  SalesFamilyDetailID: 'SalesFamilyDetailID',
  SalesFamilyCode: 'SalesFamilyCode',
  SerialNumber: 'SerialNumber',
  ProductCode: 'ProductCode',
  UnitType: 'UnitType',
  ProductType: 'ProductType',
  UOMCode: 'UOMCode',
  Quantity: 'Quantity',
  Weight: 'Weight',
  Price: 'Price',
  ProductBarCode: 'ProductBarCode',
  SaleTaxFamilyCode: 'SaleTaxFamilyCode',
  Operation: 'Operation',
};
export const SalesFamilySummaryListCreateTableCoulumns =
  `SalesFamilyDetailID TEXT  PRIMARY KEY NOT NULL, SalesFamilyCode  TEXT, SerialNumber FLOAT, ProductCode  TEXT, UnitType  FLOAT, ProductType BOOLEAN, ` +
  `UOMCode TEXT, Quantity FLOAT, Weight FLOAT, Price FLOAT, ProductBarCode TEXT, ` +
  `SaleTaxFamilyCode TEXT, Operation TEXT`;

export const SalesFamilySummaryListInsertCoulumns =
  `SalesFamilyDetailID, SalesFamilyCode, SerialNumber, ProductCode, UnitType, ProductType, UOMCode, ` +
  `Quantity, Weight, Price, ProductBarCode, SaleTaxFamilyCode, Operation`;

export const InsertSalesFamilySummaryList = async values => {
  let InsertDataQuery = `INSERT INTO ${SalesFamilySummaryListTable} (${SalesFamilySummaryListInsertCoulumns}) VALUES`;

  for (let i = 0; i < values?.length; ++i) {
    InsertDataQuery =
      InsertDataQuery +
      "('" +
      values[i].SalesFamilyDetailID +
      "','" +
      values[i].SalesFamilyCode +
      "','" +
      values[i].SerialNumber +
      "','" +
      values[i].ProductCode +
      "','" +
      values[i].UnitType +
      "','" +
      values[i].ProductType +
      "','" +
      values[i].UOMCode +
      "','" +
      values[i].Quantity +
      "','" +
      values[i].Weight +
      "','" +
      values[i].Price +
      "','" +
      values[i].ProductBarCode +
      "','" +
      values[i].SaleTaxFamilyCode +
      "','" +
      values[i].Operation +
      "')";
    if (i != values.length - 1) {
      InsertDataQuery = InsertDataQuery + ',';
    }
    // console.log('Insert Product Details InsertDataQuery..', name, name2);
  }

  InsertDataQuery = InsertDataQuery + ';';

  let InsertSalesFamilySummaryList = await ExecuteQuery(InsertDataQuery, []);
  //   console.log('Insert Product Details..', InsertSalesFamilySummaryList);
};
