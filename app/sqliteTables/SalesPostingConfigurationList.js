import { ExecuteQuery } from '../sqliteHelper';

export const SalesPostingConfigurationListTable =
  'SalesPostingConfigurationList';

export const SalesPostingConfigurationListtCoulumnskey = {
  Id: 'Id',
  GoDownCode: 'GoDownCode',
  PaymentType: 'PaymentType',
  PaymentTypeName: "PaymentTypeName",
  PaymentTypeName2: "PaymentTypeName2",
  SalesBillAccount: 'SalesBillAccount',
  SalesProcurementAccount: 'SalesProcurementAccount',
  CostProcurementDebit: 'CostProcurementDebit',
  CostProcurementCredit: 'CostProcurementCredit',
  SalesServiceAccount: 'SalesServiceAccount',
  RefundAccount: 'RefundAccount',
  AdvanceAccount: 'AdvanceAccount',
  DiscountAccount: 'DiscountAccount',
  SurplusCharges1Credit: 'SurplusCharges1Credit',
  ProductTax1: 'ProductTax1',
  ProductTax2: 'ProductTax2',
  ProductTax3: 'ProductTax3',
  ProductTax4: 'ProductTax4',
  GlobalTax1: 'GlobalTax1',
  GlobalTax2: 'GlobalTax2',
  GlobalTax3: 'GlobalTax3',
  GlobalTax4: 'GlobalTax4',
  RoundOffAccount: 'RoundOffAccount',
};
export const SalesPostingConfigurationListCreateTableCoulumns =
  `Id TEXT  PRIMARY KEY NOT NULL, GoDownCode  TEXT, PaymentType  TEXT, PaymentTypeName  TEXT, PaymentTypeName2  TEXT, SalesBillAccount  BOOLEAN, CostProcurementDebit BOOLEAN, ` +
  `CostProcurementCredit BOOLEAN, SalesServiceAccount BOOLEAN, RefundAccount BOOLEAN, AdvanceAccount BOOLEAN, DiscountAccount BOOLEAN, ` +
  `SurplusCharges1Credit BOOLEAN, ProductTax1 BOOLEAN, ProductTax2 BOOLEAN, ProductTax3 BOOLEAN, ProductTax4 BOOLEAN,  ` +
  `GlobalTax1 BOOLEAN, GlobalTax2 BOOLEAN, GlobalTax3 BOOLEAN, GlobalTax4 BOOLEAN, RoundOffAccount BOOLEAN`;

export const SalesPostingConfigurationListInsertCoulumns =
  `Id, GoDownCode, PaymentType, PaymentTypeName, PaymentTypeName2, SalesBillAccount, CostProcurementDebit, CostProcurementCredit, ` +
  `SalesServiceAccount, RefundAccount, AdvanceAccount, DiscountAccount, SurplusCharges1Credit, ProductTax1, ProductTax2, ` +
  `ProductTax3, ProductTax4, GlobalTax1, GlobalTax2, GlobalTax3, GlobalTax4, RoundOffAccount`;

export const InsertSalesPostingConfigurationList = async values => {
  let InsertDataQuery = `INSERT INTO ${SalesPostingConfigurationListTable} (${SalesPostingConfigurationListInsertCoulumns}) VALUES`;

  for (let i = 0; i < values?.length; ++i) {
    InsertDataQuery =
      InsertDataQuery +
      "('" +
      values[i].GoDownCode +
      values[i].PaymentType +
      values[i].SalesBillAccount +
      "','" +
      values[i].GoDownCode +
      "','" +
      values[i].PaymentType +
      "','" +
      values[i].PaymentTypeName +
      "','" +
      values[i].PaymentTypeName2 +
      "','" +
      values[i].SalesBillAccount +

      "','" +
      values[i].CostProcurementDebit +
      "','" +
      values[i].CostProcurementCredit +
      "','" +
      values[i].SalesServiceAccount +
      "','" +
      values[i].RefundAccount +
      "','" +
      values[i].DiscountAccount +
      "','" +
      values[i].AdvanceAccount +
      "','" +
      values[i].SurplusCharges1Credit +
      "','" +
      values[i].ProductTax1 +
      "','" +
      values[i].ProductTax2 +
      "','" +
      values[i].ProductTax3 +
      "','" +
      values[i].ProductTax4 +
      "','" +
      values[i].GlobalTax1 +
      "','" +
      values[i].GlobalTax2 +
      "','" +
      values[i].GlobalTax3 +
      "','" +
      values[i].GlobalTax4 +
      "','" +
      values[i].RoundOffAccount +
      "')";
    if (i != values.length - 1) {
      InsertDataQuery = InsertDataQuery + ',';
    }
    // console.log('Insert Product Details InsertDataQuery..', name, name2);
  }

  InsertDataQuery = InsertDataQuery + ';';

  let InsertSalesPostingConfigurationList = await ExecuteQuery(
    InsertDataQuery,
    [],
  );
  //   console.log('Insert Product Details..', InsertSalesPostingConfigurationList);
};
