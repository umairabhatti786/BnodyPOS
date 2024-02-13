import { ExecuteQuery } from '../sqliteHelper';

export const LoyaltyRewardNamesListTable = 'LoyaltyRewardNamesList';

export const LoyaltyRewardNamesListCoulumnskey = {
  RewardID: 'RewardID',
  LoyaltyCode: 'LoyaltyCode',
  Name: 'Name',
  RewardType: 'RewardType',
  UserID: 'UserID',
  FiscalSpanID: 'FiscalSpanID',
  LoyaltyRewards: 'LoyaltyRewards',

};
export const LoyaltyRewardNamesListCreateTableCoulumns =
  `RewardID TEXT  PRIMARY KEY NOT NULL, LoyaltyCode  TEXT, Name TEXT, RewardType  INTEGER, UserID  INTEGER, FiscalSpanID INTEGER, ` +
  `LoyaltyRewards TEXT`;

export const LoyaltyRewardNamesListInsertCoulumns =
  `RewardID, LoyaltyCode, Name, RewardType, UserID, FiscalSpanID, LoyaltyRewards`;

export const InsertLoyaltyRewardNamesList = async values => {
  let InsertDataQuery = `INSERT INTO ${LoyaltyRewardNamesListTable} (${LoyaltyRewardNamesListInsertCoulumns}) VALUES`;

  for (let i = 0; i < values?.length; ++i) {
    InsertDataQuery =
      InsertDataQuery +
      "('" +
      values[i].RewardID +
      "','" +
      values[i].LoyaltyCode +
      "','" +
      values[i].Name +
      "','" +
      values[i].RewardType +
      "','" +
      values[i].UserID +
      "','" +
      values[i].FiscalSpanID +
      "','" +
      values[i].LoyaltyRewards +

      "')";
    if (i != values.length - 1) {
      InsertDataQuery = InsertDataQuery + ',';
    }
    // console.log('Insert Product Details InsertDataQuery..', name, name2);
  }

  InsertDataQuery = InsertDataQuery + ';';

  let InsertLoyaltyRewardNamesList = await ExecuteQuery(InsertDataQuery, [], LoyaltyRewardNamesListTable);
  //   console.log('Insert Product Details..', InsertLoyaltyRewardNamesList);
};
