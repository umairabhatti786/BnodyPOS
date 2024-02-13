import { ExecuteQuery } from '../sqliteHelper';

export const SalesBillDetailAddOnListTable = 'SalesBillDetailAddOn';

export const SalesBillDetailAddOnListCoulumnskey = {
  SalesBillDetailAddOnID: 'SalesBillDetailAddOnID',
  SalesBillID: 'SalesBillID',
  SalesBillDetailsID: 'SalesBillDetailsID',

  BillNumber: 'BillNumber',
  BillType: 'BillType',
  AddOnGroupCode: 'AddOnGroupCode',
  AddOnGroupDetailCode: 'AddOnGroupDetailCode',
  ProductFamilyCode: 'ProductFamilyCode',
  ProductCode: 'ProductCode',
  ProductBarCode: 'ProductBarCode',
  EquiProductCode: 'EquiProductCode',
  ProductType: 'ProductType',
  Name: 'Name',
  Name2: 'Name2',
  UOMCode: 'UOMCode',
  UOMName: 'UOMName',
  UOMName2: 'UOMName2',
  Price: 'Price',
  Tax1Amount: 'Tax1Amount',
  Quantity: 'Quantity',
  Tax1Rate: 'Tax1Rate',

  Tax1Code: 'Tax1Code',

  Tax1Name: 'Tax1Name',
  OriginalQuantity: 'OriginalQuantity',
  OriginalPrice: 'OriginalPrice',
  HoldFromSale: 'HoldFromSale',
  SaleTaxGroupCode: 'SaleTaxGroupCode',

  GrandAmount: 'GrandAmount',

  IsSalesAgent: 'IsSalesAgent',

  IsReturn: 'IsReturn',
};
export const SalesBillDetailAddOnCreateTableCoulumns =
  `SalesBillDetailAddOnID  TEXT  PRIMARY KEY NOT NULL, SalesBillID TEXT, SalesBillDetailsID TEXT, ` +
  `BillNumber  TEXT, BillType INTEGER, AddOnGroupCode TEXT, ` +
  `AddOnGroupDetailCode TEXT, ProductFamilyCode TEXT, ProductCode TEXT, ProductBarCode TEXT, EquiProductCode TEXT, ProductType INTEGER, ` +
  `Name TEXT, Name2  TEXT, UOMCode  TEXT, UOMName  TEXT, UOMName2  TEXT, ` +
  `Price FLOAT, Tax1Amount FLOAT, Quantity FLOAT, Tax1Rate FLOAT, Tax1Code TEXT, ` +
  `Tax1Name TEXT, OriginalQuantity FLOAT, OriginalPrice  FLOAT, HoldFromSale  Boolean, ` +
  `SaleTaxGroupCode  TEXT, GrandAmount  FLOAT, IsSalesAgent Boolean, IsReturn Boolean`;

export const SalesBillDetailAddOnInsertCoulumns =
  `SalesBillDetailAddOnID, SalesBillID, SalesBillDetailsID, BillNumber, BillType, AddOnGroupCode, AddOnGroupDetailCode, ProductFamilyCode, ProductCode, ProductBarCode, EquiProductCode,` +
  ` ProductType, Name, Name2, UOMCode, UOMName, UOMName2, Price, Tax1Amount,` +
  `Quantity, Tax1Rate, Tax1Code, Tax1Name, OriginalQuantity, ` +
  `OriginalPrice, HoldFromSale, SaleTaxGroupCode, GrandAmount, IsSalesAgent, IsReturn`;

export const InsertSalesBillDetailAddOn = async values => {
  let InsertDataQuery = `INSERT INTO ${SalesBillDetailAddOnListTable} (${SalesBillDetailAddOnInsertCoulumns}) VALUES`;

  for (let i = 0; i < values?.length; ++i) {
    let name = values[i].Name.replace("'", '');
    let name2 = values[i].Name2.replace("'", '');
    let UOMName = values[i].UOMName.replace("'", '');
    let UOMName2 = values[i].UOMName2.replace("'", '');

    InsertDataQuery =
      InsertDataQuery +
      "('" +
      values[i].SalesBillDetailAddOnID +
      "','" +
      values[i].SalesBillID +
      "','" +
      values[i].SalesBillDetailsID +
      "','" +
      values[i].BillNumber +
      "','" +
      values[i].BillType +
      "','" +
      values[i].AddOnGroupCode +
      "','" +
      values[i].AddOnGroupDetailCode +
      "','" +
      values[i].ProductFamilyCode +
      "','" +
      values[1].ProductCode +
      "','" +
      values[1].ProductBarCode +
      "','" +
      values[i].EquiProductCode +
      "','" +
      values[i].ProductType +
      "','" +
      name +
      "','" +
      name2 +
      "','" +
      values[i].UOMCode +
      "','" +
      UOMName +
      "','" +
      UOMName2 +
      "','" +
      values[i].Price +
      "','" +
      values[i].Tax1Amount +
      "','" +
      values[i].Quantity +
      "','" +
      values[i].Tax1Rate +
      "','" +
      values[i].Tax1Code +
      "','" +
      values[i].Tax1Name +
      "','" +
      values[i].OriginalQuantity +
      "','" +
      values[i].OriginalPrice +
      "','" +
      values[i].HoldFromSale +
      "','" +
      values[i].SaleTaxGroupCode +
      "','" +
      values[i].GrandAmount +
      "','" +
      values[i].IsSalesAgent +
      "','" +
      values[i].IsReturn +
      "')";

    if (i != values.length - 1) {
      InsertDataQuery = InsertDataQuery + ',';
    }
    // console.log('Insert Product Details InsertDataQuery..', name, name2);
  }

  InsertDataQuery = InsertDataQuery + ';';

  let InsertSalesBillDetailAddOn = await ExecuteQuery(InsertDataQuery, []);
  //   console.log('Insert Product Details..', InsertSalesBillDetailAddOn);
};
