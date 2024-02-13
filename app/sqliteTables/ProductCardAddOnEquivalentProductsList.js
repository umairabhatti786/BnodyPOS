import { ExecuteQuery } from '../sqliteHelper';

export const ProductCardAddOnEquivalentProductsListTable = 'ProductCardAddOnEquivalentProductsList';

export const ProductCardAddOnEquivalentProductsListCoulumnskey = {
  Id: 'Id',
  EquiProductCode: 'EquiProductCode',
  AddOnGroupDetailCode: 'AddOnGroupDetailCode',
  ProductCode: 'ProductCode',
  ProductBarCode: 'ProductBarCode',
  ProductType: 'ProductType',
  Name: 'Name',
  Name2: 'Name2',
  UOMCode: 'UOMCode',
  UOMName: 'UOMName',
  UOMName2: 'UOMName2',
  Price: 'Price',
  Quantity: 'Quantity',
  HoldFromSale: 'HoldFromSale',
  SaleTaxGroupCode: 'SaleTaxGroupCode',
  MediaContentType: 'MediaContentType',
  MediaContents: 'MediaContents',
  Operation: 'Operation',
};
export const ProductCardAddOnEquivalentProductsListCreateTableCoulumns =
  `Id TEXT  PRIMARY KEY NOT NULL, EquiProductCode  TEXT, AddOnGroupDetailCode FLOAT, ProductCode  TEXT, ProductBarCode  TEXT, ProductType BOOLEAN, ` +
  `Name TEXT, Name2 TEXT, UOMCode TEXT, UOMName TEXT, UOMName2 TEXT, Price FLOAT, Quantity FLOAT,  HoldFromSale BOOLEAN, SaleTaxGroupCode TEXT, ` +
  `MediaContentType TEXT, MediaContents TEXT, Operation TEXT`;

export const ProductCardAddOnEquivalentProductsListInsertCoulumns =
  `Id, EquiProductCode, AddOnGroupDetailCode, ProductCode, ProductBarCode, ProductType, Name, ` +
  `Name2, UOMCode, UOMName, UOMName2, Price, Quantity, HoldFromSale, SaleTaxGroupCode, MediaContentType, MediaContents, Operation`;

export const InsertProductCardAddOnEquivalentProductsList = async values => {
  let InsertDataQuery = `INSERT INTO ${ProductCardAddOnEquivalentProductsListTable} (${ProductCardAddOnEquivalentProductsListInsertCoulumns}) VALUES`;

  for (let i = 0; i < values?.length; ++i) {
    InsertDataQuery =
      InsertDataQuery +
      "('" +
      values[i].AddOnGroupDetailCode +
      values[i].ProductCode +
      "','" +
      values[i].EquiProductCode +
      "','" +
      values[i].AddOnGroupDetailCode +
      "','" +
      values[i].ProductCode +
      "','" +
      values[i].ProductBarCode +
      "','" +
      values[i].ProductType +
      "','" +
      values[i].Name +
      "','" +
      values[i].Name2 +
      "','" +
      values[i].UOMCode +
      "','" +
      values[i].UOMName +
      "','" +
      values[i].UOMName2 +
      "','" +
      values[i].Price +
      "','" +
      values[i].Quantity +
      "','" +
      values[i].HoldFromSale +
      "','" +
      values[i].SaleTaxGroupCode +
      "','" +
      values[i].MediaContentType +
      "','" +
      values[i].MediaContents +
      "','" +
      values[i].Operation +
      "')";
    if (i != values.length - 1) {
      InsertDataQuery = InsertDataQuery + ',';
    }
    // console.log('Insert Product Details InsertDataQuery..', name, name2);
  }

  InsertDataQuery = InsertDataQuery + ';';

  let InsertProductCardAddOnEquivalentProductsList = await ExecuteQuery(InsertDataQuery, []);
  //   console.log('Insert Product Details..', InsertProductCardAddOnEquivalentProductsList);
};
