import { ExecuteQuery } from '../sqliteHelper';

export const ProductListTable = 'ProductList';

export const ProductListCoulumnskey = {
  Id: 'Id',
  ProductCode: 'ProductCode',
  ProductFamilyCode: 'ProductFamilyCode',
  ProductType: 'ProductType',
  Operation: 'Operation',
  SerialNumber: 'SerialNumber',
};
export const ProductCreateTableCoulumns = `Id TEXT  PRIMARY KEY NOT NULL, ProductCode  TEXT, ProductFamilyCode  TEXT, ProductType  INTEGER, Operation TEXT, SerialNumber INTEGER`;

export const ProductInsertCoulumns = `Id, ProductCode, ProductFamilyCode, ProductType, Operation, SerialNumber`;

export const InsertProductList = async values => {
  let InsertDataQuery = `INSERT INTO ${ProductListTable} (${ProductInsertCoulumns}) VALUES`;

  for (let i = 0; i < values?.length; ++i) {
    InsertDataQuery =
      InsertDataQuery +
      "('" +
      values[i].ProductCode +
      values[i].ProductFamilyCode +
      "','" +
      values[i].ProductCode +
      "','" +
      values[i].ProductFamilyCode +
      "','" +
      values[i].ProductType +
      "','" +
      values[i].Operation +
      "','" +
      values[i].SerialNumber +
      "')";
    if (i != values.length - 1) {
      InsertDataQuery = InsertDataQuery + ',';
    }
    // console.log('Insert Product Details InsertDataQuery..', name, name2);
  }

  InsertDataQuery = InsertDataQuery + ';';

  let InsertProductList = await ExecuteQuery(InsertDataQuery, []);
  //   console.log('Insert Product Details..', InsertProductList);
};
