import { ExecuteQuery } from '../sqliteHelper';

export const LoyaltyListTable = 'LoyaltyList';

export const LoyaltyListCoulumnskey = {
  RowIndex: 'RowIndex',
  Total: 'Total',
  IsAutoNumbering: 'IsAutoNumbering',
  IsInserting: 'IsInserting',
  LoyaltyCode: 'LoyaltyCode',
  LoyaltyName: 'LoyaltyName',
  LoyaltyName2: 'LoyaltyName2',
  OtherNames: 'OtherNames',
  GoDownCode: 'GoDownCode',
  GoDownName: 'GoDownName',
  StartDate: 'StartDate',
  EndDate: "EndDate",
  FiscalSpanID: "FiscalSpanID",
  ExpiredPoints: "ExpiredPoints",
  TotalPoints: "TotalPoints",
  LoyaltyCardID: "LoyaltyCardID",
  IsTaxIncluded: "IsTaxIncluded",
  IsDiscountIncluded: "IsDiscountIncluded",

};
export const LoyaltyListCreateTableCoulumns =
  `RowIndex INTEGER  PRIMARY KEY NOT NULL, Total INTEGER, IsAutoNumbering INTEGER, IsInserting  INTEGER, LoyaltyCode  TEXT, LoyaltyName TEXT, ` +
  `LoyaltyName2 TEXT, OtherNames TEXT, GoDownCode TEXT, GoDownName TEXT, StartDate TEXT, EndDate TEXT, FiscalSpanID INTEGER, ExpiredPoints INTEGER, TotalPoints INTEGER, ` +
  `LoyaltyCardID INTEGER, IsTaxIncluded INTEGER, IsDiscountIncluded INTEGER`;

export const LoyaltyListInsertCoulumns =
  `RowIndex, Total, IsAutoNumbering, IsInserting, LoyaltyCode, LoyaltyName, LoyaltyName2, ` +
  `OtherNames, GoDownCode, GoDownName, StartDate, EndDate, FiscalSpanID, ExpiredPoints, TotalPoints, LoyaltyCardID, IsTaxIncluded, IsDiscountIncluded`;

export const InsertLoyaltyList = async values => {
  console.log("InsertLoyaltyList....", values,)
  let InsertDataQuery = `INSERT INTO ${LoyaltyListTable} (${LoyaltyListInsertCoulumns}) VALUES`;

  for (let i = 0; i < values?.length; ++i) {
    InsertDataQuery =
      InsertDataQuery +
      "('" +
      values[i].RowIndex +
      "','" +
      values[i].Total +
      "','" +
      values[i].IsAutoNumbering +
      "','" +
      values[i].IsInserting +
      "','" +
      values[i].LoyaltyCode +
      "','" +
      values[i].LoyaltyName +
      "','" +
      values[i].LoyaltyName2 +
      "','" +
      values[i].OtherNames +
      "','" +
      values[i].GoDownCode +
      "','" +
      values[i].GoDownName +
      "','" +
      values[i].StartDate +
      "','" +
      values[i].EndDate +
      "','" +
      values[i].FiscalSpanID +
      "','" +
      values[i].ExpiredPoints +
      "','" +
      values[i].TotalPoints +
      "','" +
      values[i].LoyaltyCardID +
      "','" +
      values[i].IsTaxIncluded +
      "','" +
      values[i].IsDiscountIncluded +
      "')";
    if (i != values.length - 1) {
      InsertDataQuery = InsertDataQuery + ',';
    }
    // console.log('Insert Product Details InsertDataQuery..', name, name2);
  }

  InsertDataQuery = InsertDataQuery + ';';

  let InsertLoyaltyList = await ExecuteQuery(InsertDataQuery, [], LoyaltyListTable);
  //   console.log('Insert Product Details..', InsertLoyaltyList);
};
