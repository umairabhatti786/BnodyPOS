import { ExecuteQuery } from '../sqliteHelper';

export const UserConfigurationTable = 'UserConfiguration';

export const UserConfigurationCoulumnskey = {
  UserCode: 'UserCode',
  ISAdmin: 'ISAdmin',
  Username: 'Username',
  Password: 'Password',
  UserEmail: 'UserEmail',
  UserPhone: 'UserPhone',
  UserMobile: 'UserMobile',
  AllowCreditSale: 'AllowCreditSale',
  DiscountLimit: 'DiscountLimit',
  SalesAgentCode: 'SalesAgentCode',
  SalesAgentName: 'SalesAgentName',
  IsUserLinkedToTerminal: 'IsUserLinkedToTerminal',
  TerminalCode: 'TerminalCode',
  SupervisorPassword: 'SupervisorPassword',
  SalesRefundAllowed: 'SalesRefundAllowed',
  BillUpdationAllowed: 'BillUpdationAllowed',
  ResetTerminalAllowed: 'ResetTerminalAllowed',
  PriceChangeAllowed: 'PriceChangeAllowed',
  EndCashDrawerAllowed: 'EndCashDrawerAllowed',
  OpenCashDrawerAllowed: 'OpenCashDrawerAllowed',
  ChangeSalesAgentAllowed: 'ChangeSalesAgentAllowed',
  DiscountAllowed: 'DiscountAllowed',
  ReprintAllowed: 'ReprintAllowed',
  AssignSalesAgentAgainstServices: 'AssignSalesAgentAgainstServices',
};
export const UserConfigurationCreateTableCoulumns =
  `UserCode INTEGER  PRIMARY KEY NOT NULL, ISAdmin  BOOLEAN, Username  TEXT, ` +
  `Password  TEXT, UserEmail TEXT, UserPhone TEXT, UserMobile TEXT, AllowCreditSale BOOLEAN, DiscountLimit FLOAT, ` +
  `SalesAgentCode TEXT, SalesAgentName TEXT, IsUserLinkedToTerminal BOOLEAN, TerminalCode TEXT, SupervisorPassword TEXT, ` +
  `SalesRefundAllowed INTEGER, BillUpdationAllowed INTEGER, ResetTerminalAllowed INTEGER, PriceChangeAllowed INTEGER, EndCashDrawerAllowed INTEGER, ` +
  `OpenCashDrawerAllowed INTEGER, ChangeSalesAgentAllowed INTEGER, DiscountAllowed  INTEGER, ReprintAllowed INTEGER, AssignSalesAgentAgainstServices  INTEGER`;

export const UserConfigurationInsertCoulumns =
  `UserCode, ISAdmin, Username, Password, UserEmail, UserPhone, UserMobile, AllowCreditSale,` +
  ` DiscountLimit, SalesAgentCode, SalesAgentName, IsUserLinkedToTerminal, TerminalCode, SupervisorPassword, SalesRefundAllowed, BillUpdationAllowed,` +
  `ResetTerminalAllowed, PriceChangeAllowed, EndCashDrawerAllowed, OpenCashDrawerAllowed,ChangeSalesAgentAllowed, ` +
  `DiscountAllowed, ReprintAllowed, AssignSalesAgentAgainstServices`;

export const InsertUserConfiguration = async values => {
  let InsertDataQuery = `INSERT INTO ${UserConfigurationTable} (${UserConfigurationInsertCoulumns}) VALUES`;
  console.log("UserConfigurationTable............", values?.length)

  for (let i = 0; i < values?.length; ++i) {
    let Username = values[i].Username.replace("'", '');
    let SalesAgentName = values[i].SalesAgentName.replace("'", '');

    InsertDataQuery =
      InsertDataQuery +
      "('" +
      values[i].UserCode +
      "','" +
      values[i].ISAdmin +
      "','" +
      Username +
      "','" +
      values[i].Password +
      "','" +
      values[i].UserEmail +
      "','" +
      values[i].UserPhone +
      "','" +
      values[i].UserMobile +
      "','" +
      values[i].AllowCreditSale +
      "','" +
      values[i].DiscountLimit +
      "','" +
      values[i].SalesAgentCode +
      "','" +
      SalesAgentName +
      "','" +
      values[i].IsUserLinkedToTerminal +
      "','" +
      values[i].TerminalCode +
      "','" +
      values[i].SupervisorPassword +
      "','" +
      values[i].SalesRefundAllowed +
      "','" +
      values[i].BillUpdationAllowed +
      "','" +
      values[i].ResetTerminalAllowed +
      "','" +
      values[i].PriceChangeAllowed +
      "','" +
      values[i].EndCashDrawerAllowed +
      "','" +
      values[i].OpenCashDrawerAllowed +
      "','" +
      values[i].ChangeSalesAgentAllowed +
      "','" +
      values[i].DiscountAllowed +
      "','" +
      values[i].ReprintAllowed +
      "','" +
      values[i].AssignSalesAgentAgainstServices +
      "')";

    if (i != values.length - 1) {
      InsertDataQuery = InsertDataQuery + ',';
    }
    // console.log('Insert Product Details InsertDataQuery..', name, name2);
  }

  InsertDataQuery = InsertDataQuery + ';';

  let InsertUserConfiguration = await ExecuteQuery(InsertDataQuery, []);
  //   console.log('Insert Product Details..', InsertUserConfiguration);
};
