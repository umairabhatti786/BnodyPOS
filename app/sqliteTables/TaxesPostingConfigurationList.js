import { ExecuteQuery } from '../sqliteHelper';

export const TaxesPostingConfigurationListTable =
  'TaxesPostingConfigurationList';

export const TaxesPostingConfigurationListCoulumnskey = {
  AccountCode: 'AccountCode',
  TaxCode: 'TaxCode',
  AccountName: 'AccountName',
  TaxType: 'TaxType',
};
export const TaxesPostingConfigurationListCreateTableCoulumns = `AccountCode TEXT  PRIMARY KEY NOT NULL, TaxCode  TEXT, AccountName  TEXT, TaxType INTEGER`;

export const TaxesPostingConfigurationListInsertCoulumns = `AccountCode, TaxCode, AccountName, TaxType`;

export const InsertTaxesPostingConfigurationList = async values => {
  let InsertDataQuery = `INSERT INTO ${TaxesPostingConfigurationListTable} (${TaxesPostingConfigurationListInsertCoulumns}) VALUES`;

  for (let i = 0; i < values?.length; ++i) {
    let AccountName = values[i].AccountName.replace("'", '');
    // console.log(
    //   'InsertTaxesPostingConfigurationList',
    //   values[i].AccountCode + values[i].TaxCode,
    // );
    InsertDataQuery =
      InsertDataQuery +
      "('" +
      values[i].AccountCode +
      values[i].TaxCode +
      values[i].TaxType +
      "','" +
      values[i].TaxCode +
      "','" +
      AccountName +
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
