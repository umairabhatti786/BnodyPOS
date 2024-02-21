import { ExecuteQuery } from "../sqliteHelper";

export const SalesAgentsTable = "SalesAgentsTable";

export const SalesAgentsCoulumns = {
  UserCode: "UserCode",
  AllowCreditSale: "AllowCreditSale",
  IsAdminUser: "IsAdminUser",
  SalesAgentCode: "SalesAgentCode",
  SalesAgentName: "SalesAgentName",
  Email: "Email",
  Phone: "Phone",
  Mobile: "Mobile",
  DiscountLimit: "DiscountLimit",
};

export const SalesAgentsCreateTableCoulumns =
  `UserCode INTEGER , AllowCreditSale  BOOLEAN, IsAdminUser  BOOLEAN, ` +
  `SalesAgentCode TEXT PRIMARY KEY NOT NULL, SalesAgentName TEXT, Email TEXT, Phone TEXT, Mobile TEXT, DiscountLimit FLOAT`;

export const SalesAgentsInsertCoulumns = `UserCode,AllowCreditSale, IsAdminUser, SalesAgentCode, SalesAgentName, Email, Phone, Mobile, DiscountLimit`;

export const InsertSalesAgentsList = async (values) => {
  let InsertDataQuery = `INSERT INTO ${SalesAgentsTable} (${SalesAgentsInsertCoulumns}) VALUES`;

  for (let i = 0; i < values?.length; ++i) {
    let SalesAgentName = values[i].SalesAgentName.replace("'", "");

    InsertDataQuery =
      InsertDataQuery +
      "('" +
      values[i].UserCode +
      "','" +
      values[i].AllowCreditSale +
      "','" +
      values[i].IsAdminUser +
      "','" +
      values[i].SalesAgentCode +
      "','" +
      SalesAgentName +
      "','" +
      values[i].Email +
      "','" +
      values[i].Phone +
      "','" +
      values[i].Mobile +
      "','" +
      values[i].DiscountLimit +
      "')";
    if (i != values.length - 1) {
      InsertDataQuery = InsertDataQuery + ",";
    }
    // console.log('Insert Product Details InsertDataQuery..', name, name2);
  }

  InsertDataQuery = InsertDataQuery + ";";

  let InsertSalesAgentsList = await ExecuteQuery(InsertDataQuery, []);
  console.log("Insert SalesAgent Details..", InsertSalesAgentsList);
};
