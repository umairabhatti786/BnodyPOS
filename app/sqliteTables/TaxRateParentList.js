import { ExecuteQuery } from '../sqliteHelper';

export const TaxRateParentListTable = 'TaxRateParentList';

export const TaxRateParentListCoulumnskey = {
  TaxFamilyCode: 'TaxFamilyCode',
  TaxFamilyName: 'TaxFamilyName',
  TaxLevel: 'TaxLevel',
  Tax1Enable: 'Tax1Enable',
  Tax1Code: 'Tax1Code',
  Tax1Name: 'Tax1Name',
  Tax1Fragment: 'Tax1Fragment',
  Tax1Value: 'Tax1Value',
  Tax1CalculationID: 'Tax1CalculationID',
  IsTax1InclusiveInPrice: 'IsTax1InclusiveInPrice',
  Tax2Enable: 'Tax2Enable',
  Tax2Code: 'Tax2Code',
  Tax2Name: 'Tax2Name',
  Tax2Fragment: 'Tax2Fragment',
  Tax2Value: 'Tax2Value',
  Tax2CalculationID: 'Tax2CalculationID',
  IsTax2InclusiveInPrice: 'IsTax2InclusiveInPrice',
  NamesTable: 'NamesTable',
  UserCode: 'UserCode',
};
export const TaxRateParentListCreateTableCoulumns =
  `TaxFamilyCode TEXT  PRIMARY KEY NOT NULL, TaxFamilyName  TEXT, TaxLevel  INTEGER, Tax1Enable  BOOLEAN, Tax1Code TEXT, ` +
  `Tax1Name TEXT, Tax1Fragment INTEGER, Tax1Value FLOAT, Tax1CalculationID INTEGER, IsTax1InclusiveInPrice BOOLEAN, ` +
  `Tax2Enable BOOLEAN, Tax2Code TEXT, Tax2Name TEXT, Tax2Fragment TEXT, Tax2Value FLOAT, Tax2CalculationID FLOAT, ` +
  `IsTax2InclusiveInPrice BOOLEAN, NamesTable TEXT, UserCode FLOAT`;

export const TaxRateParentListInsertCoulumns =
  `TaxFamilyCode, TaxFamilyName, TaxLevel, Tax1Enable, Tax1Code, Tax1Name, Tax1Fragment, ` +
  `Tax1Value, Tax1CalculationID, IsTax1InclusiveInPrice, Tax2Enable, Tax2Code, Tax2Name, ` +
  `Tax2Fragment, Tax2Value, Tax2CalculationID, IsTax2InclusiveInPrice, NamesTable, UserCode`;

export const InsertTaxRateParentList = async values => {
  let InsertDataQuery = `INSERT INTO ${TaxRateParentListTable} (${TaxRateParentListInsertCoulumns}) VALUES`;

  for (let i = 0; i < values?.length; ++i) {
    InsertDataQuery =
      InsertDataQuery +
      "('" +
      values[i].TaxFamilyCode +
      "','" +
      values[i].TaxFamilyName +
      "','" +
      values[i].TaxLevel +
      "','" +
      values[i].Tax1Enable +
      "','" +
      values[i].Tax1Code +
      "','" +
      values[i].Tax1Name +
      "','" +
      values[i].Tax1Fragment +
      "','" +
      values[i].Tax1Value +
      "','" +
      values[i].Tax1CalculationID +
      "','" +
      values[i].IsTax1InclusiveInPrice +
      "','" +
      values[i].Tax2Enable +
      "','" +
      values[i].Tax2Code +
      "','" +
      values[i].Tax2Name +
      "','" +
      values[i].Tax2Fragment +
      "','" +
      values[i].Tax2Value +
      "','" +
      values[i].Tax2CalculationID +
      "','" +
      values[i].IsTax2InclusiveInPrice +
      "','" +
      values[i].NamesTable +
      "','" +
      values[i].UserCode +
      "')";
    if (i != values.length - 1) {
      InsertDataQuery = InsertDataQuery + ',';
    }
    // console.log('Insert Product Details InsertDataQuery..', name, name2);
  }

  InsertDataQuery = InsertDataQuery + ';';

  let InsertTaxRateParentList = await ExecuteQuery(InsertDataQuery, []);
  //   console.log('Insert Product Details..', InsertTaxRateParentList);
};
