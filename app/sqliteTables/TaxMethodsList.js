import { ExecuteQuery } from '../sqliteHelper';

export const TaxMethodsListTable = 'TaxMethodsList';

export const TaxMethodsListCoulumnskey = {
  TaxCalculationID: 'TaxCalculationID',
  SmartStringID: 'SmartStringID',
  CalculationMethod: 'CalculationMethod',
  TaxProductOrGlobal: 'TaxProductOrGlobal',
  TaxType: 'TaxType',
};
export const TaxMethodsListCreateTableCoulumns = `TaxCalculationID INTEGER  PRIMARY KEY NOT NULL, SmartStringID  INTEGER, CalculationMethod  TEXT, TaxProductOrGlobal  INTEGER, TaxType INTEGER`;

export const TaxMethodsListInsertCoulumns = `TaxCalculationID, SmartStringID, CalculationMethod, TaxProductOrGlobal,TaxType`;

export const InsertTaxMethodsList = async values => {
  let InsertDataQuery = `INSERT INTO ${TaxMethodsListTable} (${TaxMethodsListInsertCoulumns}) VALUES`;

  for (let i = 0; i < values?.length; ++i) {
    let CalculationMethod = values[i].CalculationMethod.replace("'", '');
    // console.log(
    //   'InsertTaxMethodsList',
    //   values[i].TaxCalculationID + values[i].SmartStringID,
    // );
    InsertDataQuery =
      InsertDataQuery +
      "('" +
      values[i].TaxCalculationID +
      i +
      "','" +
      values[i].SmartStringID +
      "','" +
      CalculationMethod +
      "','" +
      values[i].TaxProductOrGlobal +
      "','" +
      values[i].TaxType +
      "')";
    if (i != values.length - 1) {
      InsertDataQuery = InsertDataQuery + ',';
    }
    // console.log('Insert Product Details InsertDataQuery..', name, name2);
  }

  InsertDataQuery = InsertDataQuery + ';';

  let InsertTaxesPostingConfigurationList = await ExecuteQuery(
    InsertDataQuery,
    [],
  );
  //   console.log('Insert Product Details..', InsertTaxesPostingConfigurationList);
};
