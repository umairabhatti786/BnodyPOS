import moment from 'moment';
import { ExecuteQuery } from '../sqliteHelper';

export const DrawerSetupTable = 'DrawerSetup';

export const DrawerSetupCoulumnskey = [
  {
    id: 'D12345678',
    StartDate: '0', //moment().format('DD-MM-YYYY, hh:mm:ss A'),
    initialCash: '0',
    DepositCash: '0',
    CashRefund: '0',
    CashSales: '0',
    withDraw: '0',
    estimatedAmountinDrawer: '0',
    creditSales: '0',
    creditRefunds: '0',
    cardSale: '0',
    cardReturn: '0',
    isInitialCashSet: 'false',
    isInitialLogin: 'true',
  },
];
export const DrawerSetupCreateTableCoulumns =
  `id TEXT  PRIMARY KEY NOT NULL, StartDate  TEXT, initialCash  TEXT, DepositCash  TEXT, CashRefund TEXT, CashSales TEXT,` +
  ` withDraw TEXT,estimatedAmountinDrawer TEXT, creditSales TEXT, creditRefunds TEXT, cardSale TEXT, cardReturn  TEXT, isInitialCashSet TEXT, isInitialLogin TEXT`;

export const DrawerSetupInsertCoulumns = `id, StartDate,initialCash, DepositCash, CashRefund, CashSales, withDraw, estimatedAmountinDrawer, creditSales, creditRefunds, cardSale, cardReturn, isInitialCashSet, isInitialLogin`;

export const InsertDrawerSetup = async values => {
  let InsertDataQuery = `INSERT INTO ${DrawerSetupTable} (${DrawerSetupInsertCoulumns}) VALUES`;

  for (let i = 0; i < values?.length; ++i) {
    InsertDataQuery =
      InsertDataQuery +
      "('" +
      values[i].id +
      "','" +
      values[i].StartDate +
      "','" +
      values[i].initialCash +
      "','" +
      values[i].DepositCash +
      "','" +
      values[i].CashRefund +
      "','" +
      values[i].CashSales +
      "','" +
      values[i].withDraw +
      "','" +
      values[i].estimatedAmountinDrawer +
      "','" +
      values[i].creditSales +
      "','" +
      values[i].creditRefunds +
      "','" +
      values[i].cardSale +
      "','" +
      values[i].cardReturn +
      "','" +
      values[i].isInitialCashSet +
      "','" +
      values[i].isInitialLogin +
      "')";
    if (i != values.length - 1) {
      InsertDataQuery = InsertDataQuery + ',';
    }
    // console.log('Insert Product Details InsertDataQuery..', name, name2);
  }

  InsertDataQuery = InsertDataQuery + ';';

  let InsertDrawerSetup = await ExecuteQuery(InsertDataQuery, []);
  //   console.log('Insert Product Details..', InsertDrawerSetup);
};
