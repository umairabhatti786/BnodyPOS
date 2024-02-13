import { ExecuteQuery } from '../sqliteHelper';

export const CategoriesListTable = 'CategoriesList';

export const CategoriesListCoulumnskey = {
  PrinterFamilyCode: 'PrinterFamilyCode',
  Operation: 'Operation',
  ProductFamilyCode: 'ProductFamilyCode',
  ProductFamilyName: 'ProductFamilyName',
  ProductFamilyName2: 'ProductFamilyName2',
  MediaContents: 'MediaContents',
  MediaContentType: 'MediaContentType',
};
export const CategoriesCreateTableCoulumns = `ProductFamilyCode TEXT  PRIMARY KEY NOT NULL, ProductFamilyName  TEXT, ProductFamilyName2  TEXT, MediaContents TEXT, MediaContentType TEXT, PrinterFamilyCode TEXT,Operation TEXT`;

export const CategoriesInsertCoulumns = `ProductFamilyCode,ProductFamilyName, ProductFamilyName2, MediaContents, MediaContentType, PrinterFamilyCode, Operation`;

export const InsertCategoriesList = async values => {
  let InsertDataQuery = `INSERT INTO ${CategoriesListTable} (${CategoriesInsertCoulumns}) VALUES`;

  for (let i = 0; i < values?.length; ++i) {
    let ProductFamilyName = values[i].ProductFamilyName.replace("'", '');
    let ProductFamilyName2 = values[i].ProductFamilyName2.replace("'", '');
    InsertDataQuery =
      InsertDataQuery +
      "('" +
      values[i].ProductFamilyCode +
      "','" +
      ProductFamilyName +
      "','" +
      ProductFamilyName2 +
      "','" +
      values[i].MediaContents +
      "','" +
      values[i].MediaContentType +
      "','" +
      values[i].PrinterFamilyCode +
      "','" +
      values[i].Operation +
      "')";
    if (i != values.length - 1) {
      InsertDataQuery = InsertDataQuery + ',';
    }
    // console.log('Insert Product Details InsertDataQuery..', name, name2);
  }

  InsertDataQuery = InsertDataQuery + ';';

  let InsertCategoriesList = await ExecuteQuery(InsertDataQuery, []);
  //   console.log('Insert Product Details..', InsertCategoriesList);
};
