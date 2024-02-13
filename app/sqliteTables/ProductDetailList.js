import { ExecuteQuery } from '../sqliteHelper';

export const ProductDetailListTable = 'ProductDetailListTable';

export const ProductDetailListCoulumnskey = {
  ProductBarCode: 'ProductBarCode',
  ProductCategoryCode: 'ProductCategoryCode',
  AddOnGroupCode: 'AddOnGroupCode',
  ProductCode: 'ProductCode',
  ProductType: 'ProductType',
  Name: 'Name',
  Name2: 'Name2',
  UOMFragment: 'UOMFragment',
  UOMType: 'UOMType',
  UOMCode: 'U-1',
  UOMName: 'UOMName',
  UOMName2: 'UOMName2',
  PriceType: 'PriceType',
  SellingPrice: 'SellingPrice',
  QtyInHands: 'QtyInHands',
  DiscountRate: 'DiscountRate',
  HoldFromSale: 'HoldFromSale',
  IsBatchRequired: 'IsBatchRequired',
  IsManufactureDateRequired: 'IsManufactureDateRequired',
  IsExpiryDateRequired: 'IsExpiryDateRequired',
  IsSerialNumberRequired: 'IsSerialNumberRequired',
  SaleTaxGroupCode: 'SaleTaxGroupCode',
  PurchaseTaxGroupCode: 'PurchaseTaxGroupCode',
  MediaContentType: 'MediaContentType',
  MediaContents: 'MediaContents',
  Operation: 'Operation',
};
export const ProductDetailCreateTableCoulumns =
  `ProductBarCode TEXT  PRIMARY KEY NOT NULL, ProductCategoryCode  TEXT, AddOnGroupCode  TEXT, ` +
  `ProductCode  TEXT, ProductType TEXT, Name TEXT, Name2 TEXT, UOMFragment FLOAT, UOMType INTEGER, ` +
  `UOMCode TEXT, UOMName TEXT, UOMName2 TEXT, PriceType FLOAT, SellingPrice FLOAT, ` +
  `QtyInHands FLOAT, DiscountRate FLOAT, HoldFromSale BOOLEAN, IsBatchRequired BOOLEAN, IsManufactureDateRequired BOOLEAN, ` +
  `IsExpiryDateRequired BOOLEAN, IsSerialNumberRequired BOOLEAN, SaleTaxGroupCode  TEXT, PurchaseTaxGroupCode  TEXT, ` +
  `MediaContentType  TEXT, MediaContents  TEXT, Operation  TEXT`;

export const ProductDetailInsertCoulumns =
  `ProductBarCode, ProductCategoryCode, AddOnGroupCode, ProductCode, ProductType, Name, Name2, UOMFragment,` +
  ` UOMType, UOMCode, UOMName, UOMName2, PriceType, SellingPrice, QtyInHands, DiscountRate,` +
  `HoldFromSale, IsBatchRequired, IsManufactureDateRequired, IsExpiryDateRequired, IsSerialNumberRequired, ` +
  `SaleTaxGroupCode, PurchaseTaxGroupCode, MediaContentType, MediaContents, Operation`;

export const InsertProductDetails = async values => {
  let InsertDataQuery = `INSERT INTO ${ProductDetailListTable} (${ProductDetailInsertCoulumns}) VALUES`;

  for (let i = 0; i < values?.length; ++i) {
    let name = values[i].Name.replace("'", '');
    let name2 = values[i].Name2.replace("'", '');
    let UOMName = values[i].UOMName.replace("'", '');
    let UOMName2 = values[i].UOMName2.replace("'", '');

    InsertDataQuery =
      InsertDataQuery +
      "('" +
      values[i].ProductBarCode +
      "','" +
      values[i].ProductCategoryCode +
      "','" +
      values[i].AddOnGroupCode +
      "','" +
      values[i].ProductCode +
      "','" +
      values[i].ProductType +
      "','" +
      name +
      "','" +
      name2 +
      "','" +
      values[i].UOMFragment +
      "','" +
      values[i].UOMType +
      "','" +
      values[i].UOMCode +
      "','" +
      UOMName +
      "','" +
      UOMName2 +
      "','" +
      values[i].PriceType +
      "','" +
      values[i].SellingPrice +
      "','" +
      values[i].QtyInHands +
      "','" +
      values[i].DiscountRate +
      "','" +
      values[i].HoldFromSale +
      "','" +
      values[i].IsBatchRequired +
      "','" +
      values[i].IsManufactureDateRequired +
      "','" +
      values[i].IsExpiryDateRequired +
      "','" +
      values[i].IsSerialNumberRequired +
      "','" +
      values[i].SaleTaxGroupCode +
      "','" +
      values[i].PurchaseTaxGroupCode +
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

  let InsertProductDetails = await ExecuteQuery(InsertDataQuery, []);
  //   console.log('Insert Product Details..', InsertProductDetails);
};
