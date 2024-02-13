import { ExecuteQuery } from '../sqliteHelper';

export const LoyaltyRewardsListTable = 'LoyaltyRewardsList';

export const LoyaltyRewardsListCoulumnskey = {
  LoyaltyRewardID: 'LoyaltyRewardID',
  LoyaltyCode: 'LoyaltyCode',
  RewardID: 'RewardID',
  MinInvoiceAmount: 'MinInvoiceAmount',
  MinPoints: 'MinPoints',
  RewardCostFrom: 'RewardCostFrom',
  RewardCostTo: 'RewardCostTo',
  ProductBarCode: 'ProductBarCode',
  ProductName: 'ProductName',
  RewardCostAmount: 'RewardCostAmount',
  IsTaxIncluded: 'IsTaxIncluded',
  IsDiscountIncluded: "IsDiscountIncluded",
  MaxDiscountLimit: "MaxDiscountLimit",
  ExcludeProductBarCode: "ExcludeProductBarCode",
  Discount: "Discount",
  RowIndex: "RowIndex",
  Total: "Total",


};
export const LoyaltyRewardsListsCreateTableCoulumns =
  `LoyaltyRewardID TEXT  PRIMARY KEY NOT NULL, LoyaltyCode TEXT, RewardID TEXT, MinInvoiceAmount  INTEGER, MinPoints  INTEGER, RewardCostFrom INTEGER, ` +
  `RewardCostTo INTEGER, ProductBarCode TEXT, ProductName TEXT, RewardCostAmount INTEGER, IsTaxIncluded INTEGER, IsDiscountIncluded INTEGER, MaxDiscountLimit INTEGER, ExcludeProductBarCode TEXT, Discount INTEGER, ` +
  `RowIndex INTEGER, Total INTEGER`;

export const LoyaltyRewardsListsInsertCoulumns =
  `LoyaltyRewardID, LoyaltyCode, RewardID, MinInvoiceAmount, MinPoints, RewardCostFrom, RewardCostTo, ` +
  `ProductBarCode, ProductName, RewardCostAmount, IsTaxIncluded, IsDiscountIncluded, MaxDiscountLimit, ExcludeProductBarCode, Discount, RowIndex, Total`;

export const InsertLoyaltyRewardsLists = async values => {
  let InsertDataQuery = `INSERT INTO ${LoyaltyRewardsListTable} (${LoyaltyRewardsListsInsertCoulumns}) VALUES`;

  for (let i = 0; i < values?.length; ++i) {
    InsertDataQuery =
      InsertDataQuery +
      "('" +
      values[i].LoyaltyRewardID +
      "','" +
      values[i].LoyaltyCode +
      "','" +
      values[i].RewardID +
      "','" +
      values[i].MinInvoiceAmount +
      "','" +
      values[i].MinPoints +
      "','" +
      values[i].RewardCostFrom +
      "','" +
      values[i].RewardCostTo +
      "','" +
      values[i].ProductBarCode +
      "','" +
      values[i].ProductName +
      "','" +
      values[i].RewardCostAmount +
      "','" +
      values[i].IsTaxIncluded +
      "','" +
      values[i].IsDiscountIncluded +
      "','" +
      values[i].MaxDiscountLimit +
      "','" +
      values[i].ExcludeProductBarCode +
      "','" +
      values[i].Discount +
      "','" +
      values[i].RowIndex +
      "','" +
      values[i].Total +

      "')";
    if (i != values.length - 1) {
      InsertDataQuery = InsertDataQuery + ',';
    }
    // console.log('Insert Product Details InsertDataQuery..', name, name2);
  }

  InsertDataQuery = InsertDataQuery + ';';

  let InsertLoyaltyRewardsLists = await ExecuteQuery(InsertDataQuery, [], LoyaltyRewardsListTable);
  //   console.log('Insert Product Details..', InsertLoyaltyRewardsLists);
};
