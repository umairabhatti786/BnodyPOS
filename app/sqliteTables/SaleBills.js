import {ExecuteQuery} from '../sqliteHelper';

export const SaleBillsTable = 'SaleBills';

export const SaleBillsCoulumnskey = {
  salesBillID: 'salesBillID',
  billNumber: 'billNumber',
  fiscalSpanID: 'fiscalSpanID',
  billDate: 'billDate',
  billType: 'billType',
  paymentType: 'paymentType',
  godownCode: 'godownCode',
  buyerCode: 'buyerCode',
  buyerName: 'buyerName',
  cardDetails: 'cardDetails',
  loyaltyCode: 'loyaltyCode',
  salesagentCode: 'salesagentCode',
  salesmanName: 'salesmanName',
  grandAmount: 'grandAmount',
  globalDiscountRate: 'globalDiscountRate',
  globalDiscountAmount: 'globalDiscountAmount',
  globalTax1Code: 'globalTax1Code',
  globalTax1Name: 'globalTax1Name',
  globalTax1Rate: 'globalTax1Rate',
  globalTax1Amount: 'globalTax1Amount',
  globalTax2Code: 'globalTax2Code',
  globalTax2Name: 'globalTax2Name',
  globalTax2Rate: 'globalTax2Rate',
  globalTax2Amount: 'globalTax2Amount',

  surplusChargesAmount: 'surplusChargesAmount',
  netAmount: 'netAmount',
  advancePaidInCash: 'advancePaidInCash',
  counterCode: 'counterCode',
  roundOffAmount: 'roundOffAmount',
  roundOffDifference: 'roundOffDifference',
  posUserID: 'posUserID',
  returnedBillNumber: 'returnedBillNumber',
  returnedFiscalSpanID: 'returnedFiscalSpanID',
  returnedBillDate: 'returnedBillDate',
  isProcessed: 'isProcessed',
  isUploaded: 'isUploaded',
  startTime: 'startTime',
  endTime: 'endTime',
  tagNo: 'tagNo',
  cashTender: 'cashTender',

  creditAmount: 'creditAmount',
  globalTaxGroupID: 'globalTaxGroupID',
  isGlobalTax1IncludedInPrice: 'isGlobalTax1IncludedInPrice',
  isGlobalTax2IncludedInPrice: 'isGlobalTax2IncludedInPrice',
  billTime: 'billTime',
  paymentTypeName: 'paymentTypeName',
  BillDetails: 'BillDetails ',

  buyerVAT: 'buyerVAT',
  buyerCCR: 'buyerCCR',
  buyerPhone: 'buyerPhone',
  buyerAddress: 'buyerAddress',
  deliveryType: 'deliveryType',
  deliveryTypeNote: 'deliveryTypeNote',
  totalPTax1Name: 'totalPTax1Name',
  totalTax1Amount: 'totalTax1Amount',
  totalPTax2Name: 'totalPTax2Name',
  totalTax2Amount: 'totalTax2Amount',
  totalGlobalTaxAmount: 'totalGlobalTaxAmount',
  totalTaxAmount: 'totalTaxAmount',
  totalProductTaxAmount: 'totalProductTaxAmount',
  earnedPoints: 'earnedPoints',
  redeemPoints: 'redeemPoints',
  status: 'status',
  isLoyaltyInvoice: 'isLoyaltyInvoice',
  rewardType: 'rewardType',
};
export const SaleBillsCreateTableCoulumns =
  `salesBillID TEXT  PRIMARY KEY NOT NULL, billNumber  TEXT, fiscalSpanID  INTEGER, billDate  TEXT, billType INTEGER, ` +
  `paymentType INTEGER, godownCode TEXT, buyerCode TEXT, buyerName TEXT, ` +
  `cardDetails TEXT, loyaltyCode TEXT, salesagentCode TEXT, salesmanName TEXT, grandAmount FLOAT, ` +
  `globalDiscountRate FLOAT, globalDiscountAmount TEXT, globalTax1Code TEXT, globalTax1Name TEXT, globalTax1Rate FLOAT, ` +
  `globalTax1Amount FLOAT, globalTax2Code TEXT, globalTax2Name  TEXT, globalTax2Rate  FLOAT, ` +
  `globalTax2Amount  FLOAT, surplusChargesAmount  FLOAT, netAmount  FLOAT, advancePaidInCash FLOAT, ` +
  `counterCode TEXT, roundOffAmount  FLOAT, roundOffDifference  FLOAT, ` +
  `posUserID  INTEGER, returnedBillNumber  TEXT, returnedFiscalSpanID  INTEGER, returnedBillDate TEXT, ` +
  `isProcessed INTEGER, isUploaded  INTEGER, startTime  TEXT, ` +
  `endTime  TEXT, tagNo  TEXT, cashTender  FLOAT, ` +
  `creditAmount FLOAT,  globalTaxGroupID TEXT, isGlobalTax1IncludedInPrice  INTEGER, isGlobalTax2IncludedInPrice  INTEGER, ` +
  `billTime  TEXT, paymentTypeName  TEXT, BillDetails TEXT, buyerVAT  TEXT, ` +
  `buyerCCR TEXT, buyerPhone INTEGER, buyerAddress  TEXT, deliveryType  TEXT, ` +
  `deliveryTypeNote  TEXT, totalPTax1Name  TEXT, totalTax1Amount  FLOAT, ` +
  `totalPTax2Name TEXT, totalTax2Amount FLOAT, totalGlobalTaxAmount  FLOAT, totalTaxAmount  FLOAT, ` +
  `totalProductTaxAmount  FLOAT, earnedPoints  INTEGER, redeemPoints  INTEGER, ` +
  `status INTEGER, isLoyaltyInvoice INTEGER, rewardType  INTEGER`;

export const SaleBillsInsertCoulumns =
  `salesBillID, billNumber, fiscalSpanID, billDate, billType, paymentType, godownCode, buyerCode, ` +
  `buyerName, cardDetails, loyaltyCode, salesagentCode, salesmanName, grandAmount, globalDiscountRate, globalDiscountAmount, ` +
  `globalTax1Code, globalTax1Name, globalTax1Rate, globalTax1Amount, globalTax2Code, ` +
  `globalTax2Name, globalTax2Rate, globalTax2Amount, surplusChargesAmount, netAmount, ` +
  `advancePaidInCash, counterCode, roundOffAmount, roundOffDifference, posUserID, returnedBillNumber, returnedFiscalSpanID, ` +
  `returnedBillDate, isProcessed, isUploaded, startTime, endTime, tagNo, cashTender, ` +
  `creditAmount,  globalTaxGroupID, isGlobalTax1IncludedInPrice, isGlobalTax2IncludedInPrice, billTime, paymentTypeName, BillDetails, buyerVAT, ` +
  `buyerCCR, buyerPhone, buyerAddress, deliveryType, deliveryTypeNote, totalPTax1Name, totalTax1Amount, ` +
  `totalPTax2Name, totalTax2Amount, totalGlobalTaxAmount, totalTaxAmount, totalProductTaxAmount, earnedPoints, redeemPoints, ` +
  `status, isLoyaltyInvoice, rewardType`;

export const InsertSaleBills = async values => {
  let InsertDataQuery = `INSERT INTO ${SaleBillsTable} (${SaleBillsInsertCoulumns}) VALUES`;

  InsertDataQuery =
    InsertDataQuery +
    "('" +
    values.salesBillID +
    "','" +
    values.billNumber +
    "','" +
    values.fiscalSpanID +
    "','" +
    values.billDate +
    "','" +
    values.billType +
    "','" +
    values.paymentType +
    "','" +
    values.godownCode +
    "','" +
    values.buyerCode +
    "','" +
    values.buyerName +
    "','" +
    values.cardDetails +
    "','" +
    values.loyaltyCode +
    "','" +
    values.salesagentCode +
    "','" +
    values.salesmanName +
    "','" +
    values.grandAmount +
    "','" +
    values.globalDiscountRate +
    "','" +
    values.globalDiscountAmount +
    "','" +
    values.globalTax1Code +
    "','" +
    values.globalTax1Name +
    "','" +
    values.globalTax1Rate +
    "','" +
    values.globalTax1Amount +
    "','" +
    values.globalTax2Code +
    "','" +
    values.globalTax2Name +
    "','" +
    values.globalTax2Rate +
    "','" +
    values.globalTax2Amount +
    "','" +
    values.surplusChargesAmount +
    "','" +
    values.netAmount +
    "','" +
    values.advancePaidInCash +
    "','" +
    values.counterCode +
    "','" +
    values.roundOffAmount +
    "','" +
    values.roundOffDifference +
    "','" +
    values.posUserID +
    "','" +
    values.returnedBillNumber +
    "','" +
    values.returnedFiscalSpanID +
    "','" +
    values.returnedBillDate +
    "','" +
    values.isProcessed +
    "','" +
    values.isUploaded +
    "','" +
    values.startTime +
    "','" +
    values.endTime +
    "','" +
    values.tagNo +
    "','" +
    values.cashTender +
    "','" +
    values.creditAmount +
    "','" +
    values.globalTaxGroupID +
    "','" +
    values.isGlobalTax1IncludedInPrice +
    "','" +
    values.isGlobalTax2IncludedInPrice +
    "','" +
    values.billTime +
    "','" +
    values.paymentTypeName +
    "','" +
    values.BillDetails +
    "','" +
    values.buyerVAT +
    "','" +
    values.buyerCCR +
    "','" +
    values.buyerPhone +
    "','" +
    values.buyerAddress +
    "','" +
    values.deliveryType +
    "','" +
    values.deliveryTypeNote +
    "','" +
    values.totalPTax1Name +
    "','" +
    values.totalTax1Amount +
    "','" +
    values.totalPTax2Name +
    "','" +
    values.totalTax2Amount +
    "','" +
    values.totalGlobalTaxAmount +
    "','" +
    values.totalTaxAmount +
    "','" +
    values.totalProductTaxAmount +
    "','" +
    values.earnedPoints +
    "','" +
    values.redeemPoints +
    "','" +
    values.status +
    "','" +
    values.isLoyaltyInvoice +
    "','" +
    values.rewardType +
    "')";

  InsertDataQuery = InsertDataQuery + ';';

  let InsertSaleBills = await ExecuteQuery(InsertDataQuery, []);
  //   console.log('Insert Product Details..', SaleBills);
};
