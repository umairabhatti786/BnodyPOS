import {ExecuteQuery} from '../sqliteHelper';

export const TerminalSetupTable = 'TerminalSetup';

export const TerminalSetupCoulumnskey = [
  {
    id: '12345678',
    DrawerHanding: false,
    AddParcelType: false,
    EndDrawerOnLogout: false,
    BeepSound: false,
    TerminalLanguage: 'engliah',
    SelfBilling: false,
    Copies: '1',
    SelfCount: false,
    StartFrom: '001',
    PrintProductFamily: false,
    PrintAddons: false,
    BillLabeling: false,
    printGroupProducts: false,
    requiredTime: '30',
    IsKitchenDisplay: true,
  },
];
export const TerminalSetupCreateTableCoulumns =
  `id TEXT  PRIMARY KEY NOT NULL, AddParcelType  TEXT, EndDrawerOnLogout  TEXT, BeepSound  TEXT, TerminalLanguage TEXT, SelfBilling TEXT,` +
  ` DrawerHanding TEXT,BillLabeling TEXT, Copies TEXT,requiredTime  TEXT,printGroupProducts  TEXT, SelfCount TEXT, StartFrom  TEXT, PrintProductFamily TEXT, PrintAddons TEXT , IsKitchenDisplay TEXT`;

export const TerminalSetupInsertCoulumns = `id, AddParcelType,EndDrawerOnLogout, BeepSound, TerminalLanguage, SelfBilling, DrawerHanding, BillLabeling, Copies,requiredTime, SelfCount,printGroupProducts, StartFrom, PrintProductFamily, PrintAddons , IsKitchenDisplay`;

export const InsertTerminalSetup = async values => {
  let InsertDataQuery = `INSERT INTO ${TerminalSetupTable} (${TerminalSetupInsertCoulumns}) VALUES`;

  for (let i = 0; i < values?.length; ++i) {
    InsertDataQuery =
      InsertDataQuery +
      "('" +
      values[i].id +
      "','" +
      values[i].AddParcelType +
      "','" +
      values[i].EndDrawerOnLogout +
      "','" +
      values[i].BeepSound +
      "','" +
      values[i].TerminalLanguage +
      "','" +
      values[i].SelfBilling +
      "','" +
      values[i].DrawerHanding +
      "','" +
      values[i].BillLabeling +
      "','" +
      values[i].Copies +
      "','" +
      values[i].requiredTime +
      "','" +
      values[i].printGroupProducts +
      "','" +
      values[i].SelfCount +
      "','" +
      values[i].StartFrom +
      "','" +
      values[i].PrintProductFamily +
      "','" +
      values[i].PrintAddons +
      "','" +
      values[i].IsKitchenDisplay +
      "')";
    if (i != values.length - 1) {
      InsertDataQuery = InsertDataQuery + ',';
    }
    // console.log('Insert Product Details InsertDataQuery..', name, name2);
  }

  InsertDataQuery = InsertDataQuery + ';';

  let InsertTerminalSetup = await ExecuteQuery(InsertDataQuery, []);
  //   console.log('Insert Product Details..', InsertTerminalSetup);
};
