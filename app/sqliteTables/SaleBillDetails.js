import {ExecuteQuery} from '../sqliteHelper';

export const SaleBillDetailsTable = 'SaleBillDetails';

export const SaleBillDetailsCoulumnskey = {
  SalesInvoiceDetailsID: 'SalesInvoiceDetailsID',
  SalesInvoiceID: 'SalesInvoiceID',
  InvoiceNumber: 'InvoiceNumber',
  FiscalSpanID: 'FiscalSpanID',
  InvoiceType: 'InvoiceType',
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
  Price: 'Price',
  PriceOriginal: 'PriceOriginal',
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
  ReturnSalesInvoiceDetailID: 'ReturnSalesInvoiceDetailID',
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
};
export const SaleBillDetailsCreateTableCoulumns =
  `SalesInvoiceDetailsID TEXT  PRIMARY KEY NOT NULL, SalesInvoiceID  TEXT, InvoiceNumber  TEXT, FiscalSpanID  INTEGER, InvoiceType INTEGER, ` +
  `SerialNumber INTEGER, ProductCode TEXT, ProductName TEXT, ProductName2 TEXT, ` +
  `ProductType INTEGER, PriceType INTEGER, Quantity FLOAT, UOMType INTEGER, UOMFragment FLOAT, ` +
  `UOMCode TEXT, UOMName TEXT, Price FLOAT, PriceOriginal FLOAT, DiscountRate FLOAT, ` +
  `DiscountAmount FLOAT, TaxGroupID TEXT, IsTax1IncludedInPrice  BOOlEAN, IsTax2IncludedInPrice  BOOlEAN, ` +
  `Tax1Code  TEXT, Tax1Name  TEXT, Tax1Rate  FLOAT, Tax1Amount FLOAT, ` +
  `Tax2Code TEXT, Tax2Name  TEXT, Tax2Rate  FLOAT, ` +
  `Tax2Amount  FLOAT, GrandAmount  FLOAT, GroupDataID  TEXT, ProductBarCode TEXT, ` +
  `ReturnSalesInvoiceDetailID TEXT, DeliveryStatus  BOOlEAN, DeliveryDate  TEXT, ` +
  `DeliveryTime  TEXT, DeliveryNote  TEXT, DeliveredDate  TEXT, ` +
  `DeliveredTime TEXT,  Remarks TEXT, SalesAgentCode  TEXT, IsParentAddOn  BOOlEAN, ` +
  `AddOnGroupCode  TEXT, AddOnParentSalesInvoiceDetailsID  TEXT, OrignalQuantity BOOlEAN, AddonProductDetailcode  TEXT, ` +
  `Ingredients TEXT, EarnedPoints INTEGER, RedeemPoints  INTEGER, Status  INTEGER,  ` +
  `ProductCategoryCode  TEXT, HoldFromSale TEXT`;

export const SaleBillDetailsInsertCoulumns =
  `SalesInvoiceDetailsID, SalesInvoiceID, InvoiceNumber, FiscalSpanID, InvoiceType, SerialNumber, ProductCode, ProductName, ` +
  `ProductName2, ProductType, PriceType, Quantity, UOMType, UOMFragment, UOMCode, UOMName, ` +
  `Price, PriceOriginal, DiscountRate, DiscountAmount, TaxGroupID, ` +
  `IsTax1IncludedInPrice, IsTax2IncludedInPrice, Tax1Code, Tax1Name, Tax1Rate, ` +
  `Tax1Amount, Tax2Code, Tax2Name, Tax2Rate, Tax2Amount, GrandAmount, GroupDataID, ` +
  `ProductBarCode, ReturnSalesInvoiceDetailID, DeliveryStatus, DeliveryDate, DeliveryTime, DeliveryNote, DeliveredDate, ` +
  `DeliveredTime,  Remarks, SalesAgentCode, IsParentAddOn, AddOnGroupCode, AddOnParentSalesInvoiceDetailsID, OrignalQuantity, AddonProductDetailcode, ` +
  `Ingredients, EarnedPoints, RedeemPoints, Status, ProductCategoryCode, HoldFromSale`;

export const InsertSaleBillDetails = async values => {
  let InsertDataQuery = `INSERT INTO ${SaleBillDetailsTable} (${SaleBillDetailsInsertCoulumns}) VALUES`;

  let Name = values?.ProductName;
  let Name2 = values?.ProductName2;

  InsertDataQuery =
    InsertDataQuery +
    "('" +
    values.SalesInvoiceDetailsID +
    "','" +
    values.SalesInvoiceID +
    "','" +
    values.InvoiceNumber +
    "','" +
    values.FiscalSpanID +
    "','" +
    values.InvoiceType +
    "','" +
    values.SerialNumber +
    "','" +
    values.ProductCode +
    "','" +
    Name +
    "','" +
    Name2 +
    "','" +
    values.ProductType +
    "','" +
    values.PriceType +
    "','" +
    values.Quantity +
    "','" +
    values.UOMType +
    "','" +
    values.UOMFragment +
    "','" +
    values.UOMCode +
    "','" +
    values.UOMName +
    "','" +
    values.Price +
    "','" +
    values.PriceOriginal +
    "','" +
    values.DiscountRate +
    "','" +
    values.DiscountAmount +
    "','" +
    values.TaxGroupID +
    "','" +
    values.IsTax1IncludedInPrice +
    "','" +
    values.IsTax2IncludedInPrice +
    "','" +
    values.Tax1Code +
    "','" +
    values.Tax1Name +
    "','" +
    values.Tax1Rate +
    "','" +
    values.Tax1Amount +
    "','" +
    values.Tax2Code +
    "','" +
    values.Tax2Name +
    "','" +
    values.Tax2Rate +
    "','" +
    values.Tax2Amount +
    "','" +
    values.GrandAmount +
    "','" +
    values.GroupDataID +
    "','" +
    values.ProductBarCode +
    "','" +
    values.ReturnSalesInvoiceDetailID +
    "','" +
    values.DeliveryStatus +
    "','" +
    values.DeliveryDate +
    "','" +
    values.DeliveryTime +
    "','" +
    values.DeliveryNote +
    "','" +
    values.DeliveredDate +
    "','" +
    values.DeliveredTime +
    "','" +
    values.Remarks +
    "','" +
    values.SalesAgentCode +
    "','" +
    values.IsParentAddOn +
    "','" +
    values.AddOnGroupCode +
    "','" +
    values.AddOnParentSalesInvoiceDetailsID +
    "','" +
    values.OrignalQuantity +
    "','" +
    values.AddonProductDetailcode +
    "','" +
    values.Ingredients +
    "','" +
    values.EarnedPoints +
    "','" +
    values.RedeemPoints +
    "','" +
    values.Status +
    "','" +
    values.ProductCategoryCode +
    "','" +
    values.HoldFromSale +
    "')";

  InsertDataQuery = InsertDataQuery + ';';
  // console.log('Insert Sale Bill Details Logs..', InsertDataQuery);
  let InsertSaleBillDetails = await ExecuteQuery(InsertDataQuery, []);
  console.log('Insert Sale Bill Details..', InsertSaleBillDetails);
};
