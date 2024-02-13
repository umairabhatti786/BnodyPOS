import {ExecuteQuery} from '../sqliteHelper';

export const TerminalConfigurationTable = 'TerminalConfiguration';

export const TerminalConfigurationCoulumnskey = {
  UserCode: 'UserCode',
  FiscalSpanID: 'FiscalSpanID',
  CompanyCode: 'CompanyCode',
  GoDownCode: 'GoDownCode',
  GoDownCode: 'GoDownCode',
  BillPrefix: 'BillPrefix',
  BillReturnPrefix: 'BillReturnPrefix',
  ProductsWithPicture: 'ProductsWithPicture',
  ProductsPriceType: 'ProductsPriceType',
  LanguageCode: 'LanguageCode',
  IsSecondLanguageRequired: 'IsSecondLanguageRequired',
  SecondLanguageCode: 'SecondLanguageCode',
  LanguageIsRightToLeft: 'LanguageIsRightToLeft',
  LanguageCharacterSet: 'LanguageCharacterSet',
  AllowCreditSale: 'AllowCreditSale',
  DiscountLimit: 'DiscountLimit',
  TerminalCode: 'TerminalCode',
  SalesAgentCode: 'SalesAgentCode',
  SalesAgentName: 'SalesAgentName',
  IsUserLoggedIn: 'IsUserLoggedIn',
  IsTerminalLoggedIn: 'IsTerminalLoggedIn',
  LastBillNumber: 'LastBillNumber',
  LastReturnBillNumber: 'LastReturnBillNumber',
  DecimalsInQuantity: 'DecimalsInQuantity',
  DecimalsInPrice: 'DecimalsInPrice',
  DecimalsInAmount: 'DecimalsInAmount',
  IsProductTaxEnabled: 'IsProductTaxEnabled',
  ValueAddedTaxNumber: 'ValueAddedTaxNumber',
  IsItemProductTaxEnabled: 'IsItemProductTaxEnabled',
  IsDiscountOnSalesInvoice: 'IsDiscountOnSalesInvoice',
  IsDiscountOnSalesProduct: 'IsDiscountOnSalesProduct',
  IsTaxOnSalesInvoice: 'IsTaxOnSalesInvoice',
  IsTaxOnSalesProduct: 'IsTaxOnSalesProduct',
  StopSMS: 'StopSMS',
  IsGlobalProductTaxEnabled: 'IsGlobalProductTaxEnabled',
  IsAccountLinked: 'IsAccountLinked',
  IsUserAdmin: 'IsUserAdmin',
  FiscalYearStartDate: 'FiscalYearStartDate',
  FiscalYearEndDate: 'FiscalYearEndDate',
  FiscalYearPostedUpToDate: 'FiscalYearPostedUpToDate',
  IsCompanyClosed: 'IsCompanyClosed',
  Heading1: 'Heading1',
  Heading2: 'Heading2',
  Heading3: 'Heading3',
  Heading4: 'Heading4',
  Footer1: 'Footer1',
  Footer2: 'Footer2',
  Footer3: 'Footer3',
  Footer4: 'Footer4',
  Footer5: 'Footer5',
  Footer6: 'Footer6',
  Footer7: 'Footer7',
  PostingMode: 'PostingMode',
  PostingInterval: 'PostingInterval',
  CompanyLogo: 'CompanyLogo',
  CompanyLogoType: 'CompanyLogoType',
  DefaultGlobalProductTaxGroupSalesBill:
    'DefaultGlobalProductTaxGroupSalesBill',
  OfflineLoginIsAllowed: 'OfflineLoginIsAllowed',
  A4PrintingIsAllowed: 'A4PrintingIsAllowed',
  ItemGroupIsLinkedWithPrinter: 'ItemGroupIsLinkedWithPrinter',
  CardChargesIsEnabled: 'CardChargesIsEnabled',
  IgnoreBatchAndSerial: 'IgnoreBatchAndSerial',
  CompanyName: ' CompanyName',
  CalendarCode: 'CalendarCode',
  AmountFormat: 'AmountFormat',
  CCRNumber: 'CCRNumber',
  CompanyEmail: 'CompanyEmail',
  CompanyURL: 'CompanyURL',
  IsLoyaltyCardAuto: 'IsLoyaltyCardAuto',
  AllowLoyaltyInvoiceToReturn: 'AllowLoyaltyInvoiceToReturn',
  Strings: 'Strings',
  CompanyAddress: 'CompanyAddress',
  GoDownName: 'GoDownName',
  GoDownLogo: 'GoDownLogo',
  GoDownLogoType: 'GoDownLogoType',
  GoDownStamp: 'GoDownStamp',
  GoDownStampType: 'GoDownStampType',
  GoDownSlogan: 'GoDownSlogan',
  GoDownAddress: 'GoDownAddress',
  IsGodownInfo: 'IsGodownInfo',
  DefaultPrintStyle: 'DefaultPrintStyle',
  GodownCCRNumber: 'GodownCCRNumber',
  CompanyStampType: 'CompanyStampType',
  CompanyStamp: 'CompanyStamp',
  CompanyBankDetail: 'CompanyBankDetail',
  CompanyPhone: 'CompanyPhone',
};
export const TerminalConfigurationCreateTableCoulumns =
  `UserCode TEXT  PRIMARY KEY NOT NULL, FiscalSpanID  INTEGER, CompanyCode  TEXT, GoDownCode  TEXT, BillPrefix TEXT, ` +
  `BillReturnPrefix TEXT, ProductsWithPicture INTEGER, ProductsPriceType INTEGER, LanguageCode TEXT, ` +
  `IsSecondLanguageRequired INTEGER, SecondLanguageCode TEXT, LanguageIsRightToLeft INTEGER, LanguageCharacterSet TEXT, AllowCreditSale INTEGER, ` +
  `DiscountLimit FLOAT, TerminalCode TEXT, SalesAgentCode TEXT, SalesAgentName TEXT, IsUserLoggedIn INTEGER, ` +
  `IsTerminalLoggedIn INTEGER, LastBillNumber TEXT, LastReturnBillNumber  TEXT, DecimalsInQuantity  INTEGER, ` +
  `DecimalsInPrice  INTEGER, DecimalsInAmount  INTEGER, IsProductTaxEnabled  INTEGER,ValueAddedTaxNumber TEXT, ` +
  `IsItemProductTaxEnabled INTEGER, IsDiscountOnSalesInvoice  INTEGER, IsDiscountOnSalesProduct  INTEGER, ` +
  `IsTaxOnSalesInvoice  INTEGER, IsTaxOnSalesProduct  INTEGER, StopSMS  INTEGER, IsGlobalProductTaxEnabled INTEGER, ` +
  `IsAccountLinked INTEGER, IsUserAdmin  INTEGER, FiscalYearStartDate  TEXT, ` +
  `FiscalYearEndDate  TEXT, FiscalYearPostedUpToDate  TEXT, IsCompanyClosed  INTEGER, ` +
  `Heading1 TEXT, Heading2 TEXT, Heading3  TEXT, Heading4  TEXT, ` +
  `Footer1  TEXT, Footer2  TEXT, Footer3  TEXT, ` +
  `Footer4 TEXT, Footer5 TEXT, Footer6 TEXT, Footer7 TEXT, PostingMode FLOAT, PostingInterval  FLOAT, CompanyLogo  TEXT, ` +
  `CompanyLogoType  TEXT, DefaultGlobalProductTaxGroupSalesBill  TEXT, OfflineLoginIsAllowed  INTEGER, ` +
  `A4PrintingIsAllowed INTEGER, ItemGroupIsLinkedWithPrinter INTEGER, CardChargesIsEnabled  INTEGER, IgnoreBatchAndSerial  INTEGER, ` +
  `CompanyName  TEXT, CalendarCode  TEXT, AmountFormat  TEXT, ` +
  `CCRNumber TEXT, CompanyEmail TEXT, CompanyURL  TEXT, IsLoyaltyCardAuto  INTEGER, ` +
  `AllowLoyaltyInvoiceToReturn  INTEGER, Strings  TEXT, CompanyAddress TEXT, GoDownName TEXT, GoDownLogo TEXT,  ` +
  `GoDownLogoType TEXT, GoDownStamp TEXT, GoDownStampType TEXT, GoDownSlogan TEXT, GoDownAddress TEXT, IsGodownInfo TEXT, ` +
  `DefaultPrintStyle TEXT, GodownCCRNumber TEXT, CompanyStampType TEXT, CompanyStamp TEXT, CompanyBankDetail TEXT, CompanyPhone TEXT`;

export const TerminalConfigurationInsertCoulumns =
  `UserCode, FiscalSpanID, CompanyCode, GoDownCode, BillPrefix, BillReturnPrefix, ProductsWithPicture, ProductsPriceType, ` +
  `LanguageCode, IsSecondLanguageRequired, SecondLanguageCode, LanguageIsRightToLeft, LanguageCharacterSet, AllowCreditSale, DiscountLimit, TerminalCode, ` +
  `SalesAgentCode, SalesAgentName, IsUserLoggedIn, IsTerminalLoggedIn, LastBillNumber, ` +
  `LastReturnBillNumber, DecimalsInQuantity, DecimalsInPrice, DecimalsInAmount, IsProductTaxEnabled, ` +
  `ValueAddedTaxNumber, IsItemProductTaxEnabled, IsDiscountOnSalesInvoice, IsDiscountOnSalesProduct, IsTaxOnSalesInvoice, IsTaxOnSalesProduct, StopSMS, ` +
  `IsGlobalProductTaxEnabled, IsAccountLinked, IsUserAdmin, FiscalYearStartDate, FiscalYearEndDate, FiscalYearPostedUpToDate, IsCompanyClosed, ` +
  `Heading1, Heading2, Heading3, Heading4, Footer1, Footer2, Footer3, ` +
  `Footer4, Footer5 , Footer6 , Footer7, PostingMode, PostingInterval, CompanyLogo, CompanyLogoType, DefaultGlobalProductTaxGroupSalesBill, OfflineLoginIsAllowed, ` +
  `A4PrintingIsAllowed, ItemGroupIsLinkedWithPrinter, CardChargesIsEnabled, IgnoreBatchAndSerial, CompanyName, CalendarCode, AmountFormat, ` +
  `CCRNumber, CompanyEmail, CompanyURL, IsLoyaltyCardAuto, AllowLoyaltyInvoiceToReturn, Strings, CompanyAddress, GoDownName, GoDownLogo, ` +
  `GoDownLogoType, GoDownStamp, GoDownStampType, GoDownSlogan, GoDownAddress, IsGodownInfo, DefaultPrintStyle, GodownCCRNumber, CompanyStampType, CompanyStamp, CompanyBankDetail, CompanyPhone`;

export const InsertTerminalConfiguration = async values => {
  let InsertDataQuery = `INSERT INTO ${TerminalConfigurationTable} (${TerminalConfigurationInsertCoulumns}) VALUES`;

  let CompanyName = values.CompanyName.replace("'", '');
  let SalesAgentName = values.SalesAgentName.replace("'", '');

  InsertDataQuery =
    InsertDataQuery +
    "('" +
    values.UserCode +
    "','" +
    values.FiscalSpanID +
    "','" +
    values.CompanyCode +
    "','" +
    values.GoDownCode +
    "','" +
    values.BillPrefix +
    "','" +
    values.BillReturnPrefix +
    "','" +
    values.ProductsWithPicture +
    "','" +
    values.ProductsPriceType +
    "','" +
    values.LanguageCode +
    "','" +
    values.IsSecondLanguageRequired +
    "','" +
    values.SecondLanguageCode +
    "','" +
    values.LanguageIsRightToLeft +
    "','" +
    values.LanguageCharacterSet +
    "','" +
    values.AllowCreditSale +
    "','" +
    values.DiscountLimit +
    "','" +
    values.TerminalCode +
    "','" +
    values.SalesAgentCode +
    "','" +
    SalesAgentName +
    "','" +
    values.IsUserLoggedIn +
    "','" +
    values.IsTerminalLoggedIn +
    "','" +
    values.LastBillNumber +
    "','" +
    values.LastReturnBillNumber +
    "','" +
    values.DecimalsInQuantity +
    "','" +
    values.DecimalsInPrice +
    "','" +
    values.DecimalsInAmount +
    "','" +
    values.IsProductTaxEnabled +
    "','" +
    values.ValueAddedTaxNumber +
    "','" +
    values.IsItemProductTaxEnabled +
    "','" +
    values.IsDiscountOnSalesInvoice +
    "','" +
    values.IsDiscountOnSalesProduct +
    "','" +
    values.IsTaxOnSalesInvoice +
    "','" +
    values.IsTaxOnSalesProduct +
    "','" +
    values.StopSMS +
    "','" +
    values.IsGlobalProductTaxEnabled +
    "','" +
    values.IsAccountLinked +
    "','" +
    values.IsUserAdmin +
    "','" +
    values.FiscalYearStartDate +
    "','" +
    values.FiscalYearEndDate +
    "','" +
    values.FiscalYearPostedUpToDate +
    "','" +
    values.IsCompanyClosed +
    "','" +
    values.Heading1 +
    "','" +
    values.Heading2 +
    "','" +
    values.Heading3 +
    "','" +
    values.Heading4 +
    "','" +
    values.Footer1 +
    "','" +
    values.Footer2 +
    "','" +
    values.Footer3 +
    "','" +
    values.Footer4 +
    "','" +
    values.Footer5 +
    "','" +
    values.Footer6 +
    "','" +
    values.Footer7 +
    "','" +
    values.PostingMode +
    "','" +
    values.PostingInterval +
    "','" +
    values.CompanyLogo +
    "','" +
    values.CompanyLogoType +
    "','" +
    values.DefaultGlobalProductTaxGroupSalesBill +
    "','" +
    values.OfflineLoginIsAllowed +
    "','" +
    values.A4PrintingIsAllowed +
    "','" +
    values.ItemGroupIsLinkedWithPrinter +
    "','" +
    values.CardChargesIsEnabled +
    "','" +
    values.IgnoreBatchAndSerial +
    "','" +
    CompanyName +
    "','" +
    values.CalendarCode +
    "','" +
    values.AmountFormat +
    "','" +
    values.CCRNumber +
    "','" +
    values.CompanyEmail +
    "','" +
    values.CompanyURL +
    "','" +
    values.IsLoyaltyCardAuto +
    "','" +
    values.AllowLoyaltyInvoiceToReturn +
    "','" +
    values.Strings +
    "','" +
    values.CompanyAddress +
    "','" +
    values.GoDownName +
    "','" +
    values.GoDownLogo +
    "','" +
    values.GoDownLogoType +
    "','" +
    values.GoDownStamp +
    "','" +
    values.GoDownStampType +
    "','" +
    values.GoDownSlogan +
    "','" +
    values.GoDownAddress +
    "','" +
    values.IsGodownInfo +
    "','" +
    values.DefaultPrintStyle +
    "','" +
    values.GodownCCRNumber +
    "','" +
    values.CompanyStampType +
    "','" +
    values.CompanyStamp +
    "','" +
    values.CompanyBankDetail +
    "','" +
    values.CompanyPhone +
    "')";

  InsertDataQuery = InsertDataQuery + ';';

  let InsertTerminalConfiguration = await ExecuteQuery(InsertDataQuery, []);
  //   console.log('Insert Product Details..', InsertTerminalConfiguration);
};
