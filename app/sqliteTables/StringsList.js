import {ExecuteQuery} from '../sqliteHelper';

export const StringsListTable = 'StringsList';

export const StringsListCoulumns = {
  StringsListOject: 'StringsListOject',
};

export const InsertStringsList = async values => {
  let InsertDataQuery = `INSERT INTO ${StringsListTable} (${StringsListCoulumns.StringsListOject}) VALUES`;

  InsertDataQuery = InsertDataQuery + `('${JSON.stringify(values)}')`;
  InsertDataQuery = InsertDataQuery + ';';

  let InsertStringsList = await ExecuteQuery(InsertDataQuery, []);
  //   console.log('Insert Product Details..', InsertProductList);
};
