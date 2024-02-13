import {ExecuteQuery} from '../sqliteHelper';
import uuid from 'react-native-uuid';

export const UpdateProductDetailListTable = 'UpdateProductDetailListTable';

export const UpdateProductDetailListCoulumnskey = {
  SalesBillDetailsID: 'SalesBillDetailsID',
  SalesBillID: 'SalesBillID',
  BillNumber: 'BillNumber',
  FiscalSpanID: 'FiscalSpanID',
  BillType: 'BillType',
  SerialNumber: 'SerialNumber',
  ProductCode: 'ProductCode',
  ProductName: 'ProductName',
  ProductName2: 'ProductName2',
  ProductType: 'ProductType',
  PriceType: 'PriceType',
  Quantity: 'Quantity',
  UOMType: 'UOMType',
  UOMFragment: 'UOMFragment',
  UOMCode: 'UOMCode',
  UOMName: 'UOMName',
  UOMName2: 'UOMName2',
  Price: 'Price',
  PriceOriginal: 'PriceOriginal',
  DistributorPrice: 'DistributorPrice',
  WholeSalePrice: 'WholeSalePrice',
  RetailPrice: 'RetailPrice',
  DiscountRate: 'DiscountRate',
  DiscountAmount: 'DiscountAmount',
  TaxGroupID: 'TaxGroupID',
  IsTax1IncludedInPrice: 'IsTax1IncludedInPrice',
  IsTax2IncludedInPrice: 'IsTax2IncludedInPrice',
  Tax1Code: 'Tax1Code',
  Tax1Name: 'Tax1Name',
  Tax1Rate: 'Tax1Rate',
  Tax1Amount: 'Tax1Amount',
  Tax2Code: 'Tax2Code',
  Tax2Name: 'Tax2Name',
  Tax2Rate: 'Tax2Rate',
  Tax2Amount: 'Tax2Amount',
  GrandAmount: 'GrandAmount',
  GroupDataID: 'GroupDataID',
  ProductBarCode: 'ProductBarCode',
  ReturnSalesBillDetailID: 'ReturnSalesBillDetailID',
  DeliveryStatus: 'DeliveryStatus',
  DeliveryDate: 'DeliveryDate',
  DeliveryTime: 'DeliveryTime',
  DeliveryNote: 'DeliveryNote',
  DeliveredDate: 'DeliveredDate',
  DeliveredTime: 'DeliveredTime',
  Remarks: 'Remarks',
  SalesAgentCode: 'SalesAgentCode',
  IsParentAddOn: 'IsParentAddOn',
  AddOnGroupCode: 'AddOnGroupCode',
  AddOnParentSalesInvoiceDetailsID: 'AddOnParentSalesInvoiceDetailsID',
  OrignalQuantity: 'OrignalQuantity',
  AddonProductDetailcode: 'AddonProductDetailcode',
  Ingredients: 'Ingredients',
  EarnedPoints: 'EarnedPoints',
  RedeemPoints: 'RedeemPoints',
  Status: 'Status',
  ProductCategoryCode: 'ProductCategoryCode',
  HoldFromSale: 'HoldFromSale',
  MediaContentType: 'MediaContentType',
  MediaContents: 'MediaContents',
  QtyInHands: 'QtyInHands',
  IsBatchRequired: 'IsBatchRequired',
  IsManufactureDateRequired: 'IsManufactureDateRequired',
  IsExpiryDateRequired: 'IsExpiryDateRequired',
  IsSerialNumberRequired: 'IsSerialNumberRequired',
  SaleTaxGroupCode: 'SaleTaxGroupCode',
  PurchaseTaxGroupCode: 'PurchaseTaxGroupCode',
  Description: 'Description',
};

export const UpdateProductDetailListCreateTableCoulumns =
  `SalesBillDetailsID TEXT  PRIMARY KEY NOT NULL, SalesBillID  TEXT, BillNumber  TEXT, FiscalSpanID  INTEGER, BillType INTEGER, ` +
  `SerialNumber INTEGER, ProductCode TEXT, ProductName TEXT, ProductName2 TEXT, ` +
  `ProductType INTEGER, PriceType INTEGER, Quantity FLOAT, UOMType INTEGER, UOMFragment FLOAT, ` +
  `UOMCode TEXT, UOMName TEXT, UOMName2 TEXT, Price FLOAT, PriceOriginal FLOAT, DistributorPrice FLOAT, WholeSalePrice FLOAT, RetailPrice FLOAT, DiscountRate FLOAT, ` +
  `DiscountAmount FLOAT, TaxGroupID TEXT, IsTax1IncludedInPrice  BOOlEAN, IsTax2IncludedInPrice  BOOlEAN, ` +
  `Tax1Code  TEXT, Tax1Name  TEXT, Tax1Rate  FLOAT, Tax1Amount FLOAT, ` +
  `Tax2Code TEXT, Tax2Name  TEXT, Tax2Rate  FLOAT, ` +
  `Tax2Amount  FLOAT, GrandAmount  FLOAT, GroupDataID  TEXT, ProductBarCode TEXT, ` +
  `ReturnSalesBillDetailID TEXT, DeliveryStatus  BOOlEAN, DeliveryDate  TEXT, ` +
  `DeliveryTime  TEXT, DeliveryNote  TEXT, DeliveredDate  TEXT, ` +
  `DeliveredTime TEXT,  Remarks TEXT, SalesAgentCode  TEXT, IsParentAddOn  BOOlEAN, ` +
  `AddOnGroupCode  TEXT, AddOnParentSalesInvoiceDetailsID  TEXT, OrignalQuantity BOOlEAN, AddonProductDetailcode  TEXT, ` +
  `Ingredients TEXT, EarnedPoints INTEGER, RedeemPoints  INTEGER, Status  INTEGER,  ` +
  `ProductCategoryCode  TEXT, HoldFromSale TEXT, MediaContentType TEXT, MediaContents TEXT, QtyInHands TEXT, ` +
  `IsBatchRequired BOOLEAN, IsManufactureDateRequired BOOLEAN, IsExpiryDateRequired BOOLEAN, IsSerialNumberRequired BOOLEAN, SaleTaxGroupCode  TEXT, PurchaseTaxGroupCode  TEXT , Description TEXT`;

export const UpdateProductDetailListInsertCoulumns =
  `SalesBillDetailsID, SalesBillID, BillNumber, FiscalSpanID, billType, SerialNumber, ProductCode, ProductName, ` +
  `ProductName2, ProductType, PriceType, Quantity, UOMType, UOMFragment, UOMCode, UOMName, UOMName2, ` +
  `Price, PriceOriginal, DistributorPrice, WholeSalePrice, RetailPrice, DiscountRate, DiscountAmount, TaxGroupID, ` +
  `IsTax1IncludedInPrice, IsTax2IncludedInPrice, Tax1Code, Tax1Name, Tax1Rate, ` +
  `Tax1Amount, Tax2Code, Tax2Name, Tax2Rate, Tax2Amount, GrandAmount, GroupDataID, ` +
  `ProductBarCode, ReturnSalesBillDetailID, DeliveryStatus, DeliveryDate, DeliveryTime, DeliveryNote, DeliveredDate, ` +
  `DeliveredTime, Remarks, SalesAgentCode, IsParentAddOn, AddOnGroupCode, AddOnParentSalesInvoiceDetailsID, OrignalQuantity, AddonProductDetailcode, ` +
  `Ingredients, EarnedPoints, RedeemPoints, Status, ProductCategoryCode, HoldFromSale, MediaContentType, MediaContents, QtyInHands, ` +
  ` IsBatchRequired, IsManufactureDateRequired, IsExpiryDateRequired, IsSerialNumberRequired, SaleTaxGroupCode, PurchaseTaxGroupCode , Description`;

export const InsertUpdateProductDetailList = async values => {
  let InsertDataQuery = `INSERT INTO ${UpdateProductDetailListTable} (${UpdateProductDetailListInsertCoulumns}) VALUES`;
  console.log('InsertUpdateProductDetailList...........', values);
  for (let i = 0; i < values?.length; ++i) {
    let Name = values[i]?.Name.replace("'", '');
    let Name2 = values[i]?.Name2.replace("'", '');
    let UOMName = values[i]?.UOMName.replace("'", '');
    let UOMName2 = values[i]?.UOMName2.replace("'", '');
    let desc = values[i]?.Description
      ? values[i]?.Description.replace("'", "''")
      : '';

    InsertDataQuery =
      InsertDataQuery +
      "('" +
      uuid.v4() +
      "','" +
      '' +
      "','" +
      '' +
      "','" +
      0 +
      "','" +
      1 +
      "','" +
      1 +
      "','" +
      values[i]?.ProductCode +
      "','" +
      Name +
      "','" +
      Name2 +
      "','" +
      values[i]?.ProductType +
      "','" +
      values[i]?.PriceType +
      "','" +
      0 +
      "','" +
      values[i]?.UOMType +
      "','" +
      values[i]?.UOMFragment +
      "','" +
      values[i]?.UOMCode +
      "','" +
      UOMName +
      "','" +
      UOMName2 +
      "','" +
      0 +
      "','" +
      values[i]?.SellingPrice +
      "','" +
      values[i]?.DistributorPrice +
      "','" +
      values[i]?.WholeSalePrice +
      "','" +
      values[i]?.SellingPrice +
      "','" +
      values[i]?.DiscountRate +
      "','" +
      0 +
      "','" +
      values[i]?.SaleTaxGroupCode +
      "','" +
      0 +
      "','" +
      0 +
      "','" +
      '' +
      "','" +
      '' +
      "','" +
      0 +
      "','" +
      0 +
      "','" +
      '' +
      "','" +
      '' +
      "','" +
      0 +
      "','" +
      0 +
      "','" +
      0 +
      "','" +
      '' +
      "','" +
      values[i]?.ProductBarCode +
      "','" +
      '' +
      "','" +
      '' +
      "','" +
      '' +
      "','" +
      '' +
      "','" +
      '' +
      "','" +
      '' +
      "','" +
      '' +
      "','" +
      '' +
      "','" +
      '' +
      "','" +
      1 +
      "','" +
      values[i]?.AddOnGroupCode +
      "','" +
      '' +
      "','" +
      0 +
      "','" +
      '' +
      "','" +
      '' +
      "','" +
      0 +
      "','" +
      0 +
      "','" +
      0 +
      "','" +
      values[i]?.ProductCategoryCode +
      "','" +
      values[i]?.HoldFromSale +
      "','" +
      values[i]?.MediaContentType +
      "','" +
      values[i]?.MediaContents +
      "','" +
      values[i]?.QtyInHands +
      "','" +
      values[i]?.IsBatchRequired +
      "','" +
      values[i]?.IsManufactureDateRequired +
      "','" +
      values[i]?.IsExpiryDateRequired +
      "','" +
      values[i]?.IsSerialNumberRequired +
      "','" +
      values[i]?.SaleTaxGroupCode +
      "','" +
      values[i]?.PurchaseTaxGroupCode +
      "','" +
      desc +
      "')";
    if (i != values.length - 1) {
      InsertDataQuery = InsertDataQuery + ',';
    }
  }
  try {
    InsertDataQuery = InsertDataQuery + ';';
    // console.log('Insert Sale Bill Details =====>', InsertDataQuery);
    let InsertUpdateProductDetailList = await ExecuteQuery(InsertDataQuery, []);
    // console.log(
    //   'Insert Sale Bill Details =====>',
    //   InsertUpdateProductDetailList,
    // );
  } catch (error) {
    console.log(error);
  }
};
