import { ExecuteQuery } from '../sqliteHelper';

export const LoyaltyDetailListTable = 'LoyaltyDetailList';

export const LoyaltyDetailListCoulumnskey = {
  LoyaltyDetailID: 'LoyaltyDetailID',
  LoyaltyCode: 'LoyaltyCode',
  CalculationType: 'CalculationType',
  SerialNumber: 'SerialNumber',
  Unit: 'Unit',
  CategoryCode: 'CategoryCode',
  CategoryName: 'CategoryName',
  ProductBarCode: 'ProductBarCode',
  ProductName: 'ProductName',
  Quantity: 'Quantity',
  IsTaxIncluded: 'IsTaxIncluded',
  IsDiscountIncluded: "IsDiscountIncluded",
  PointsEarned: "PointsEarned",
  InvoiceAmountFrom: "InvoiceAmountFrom",
  InvoiceAmountTo: "InvoiceAmountTo",



};
export const LoyaltyDetailListsCreateTableCoulumns =
  `LoyaltyDetailID TEXT  PRIMARY KEY NOT NULL, LoyaltyCode TEXT, CalculationType INTEGER, SerialNumber  INTEGER, Unit  TEXT, CategoryCode TEXT, ` +
  `CategoryName TEXT, ProductBarCode TEXT, ProductName TEXT, Quantity INTEGER, IsTaxIncluded INTEGER, IsDiscountIncluded INTEGER, PointsEarned INTEGER, InvoiceAmountFrom INTEGER, InvoiceAmountTo INTEGER`;

export const LoyaltyDetailListsInsertCoulumns =
  `LoyaltyDetailID, LoyaltyCode, CalculationType, SerialNumber, Unit, CategoryCode, CategoryName, ` +
  `ProductBarCode, ProductName, Quantity, IsTaxIncluded, IsDiscountIncluded, PointsEarned, InvoiceAmountFrom, InvoiceAmountTo`;

export const InsertLoyaltyDetailLists = async values => {
  let InsertDataQuery = `INSERT INTO ${LoyaltyDetailListTable} (${LoyaltyDetailListsInsertCoulumns}) VALUES`;

  for (let i = 0; i < values?.length; ++i) {
    InsertDataQuery =
      InsertDataQuery +
      "('" +
      values[i].LoyaltyDetailID +
      "','" +
      values[i].LoyaltyCode +
      "','" +
      values[i].CalculationType +
      "','" +
      values[i].SerialNumber +
      "','" +
      values[i].Unit +
      "','" +
      values[i].CategoryCode +
      "','" +
      values[i].CategoryName +
      "','" +
      values[i].ProductBarCode +
      "','" +
      values[i].ProductName +
      "','" +
      values[i].Quantity +
      "','" +
      values[i].IsTaxIncluded +
      "','" +
      values[i].IsDiscountIncluded +
      "','" +
      values[i].PointsEarned +
      "','" +
      values[i].InvoiceAmountFrom +
      "','" +
      values[i].InvoiceAmountTo +

      "')";
    if (i != values.length - 1) {
      InsertDataQuery = InsertDataQuery + ',';
    }
    // console.log('Insert Product Details InsertDataQuery..', name, name2);
  }

  InsertDataQuery = InsertDataQuery + ';';

  let InsertLoyaltyDetailLists = await ExecuteQuery(InsertDataQuery, [], LoyaltyDetailListTable);
  //   console.log('Insert Product Details..', InsertLoyaltyDetailLists);
};
