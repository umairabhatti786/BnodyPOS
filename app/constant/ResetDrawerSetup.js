import {CreateTable, DeleteTable, getData, updateColunm} from '../sqliteHelper';
import {
  DrawerSetupCoulumnskey,
  DrawerSetupCreateTableCoulumns,
  DrawerSetupTable,
  InsertDrawerSetup,
} from '../sqliteTables/DrawerSetup';
import {PaymentMethodTable} from '../sqliteTables/PaymentMethods';

const ResetDrawerSetup = () => {
  DeleteTable(DrawerSetupTable);
  DeleteTable(PaymentMethodTable);
  CreateTable(DrawerSetupTable, DrawerSetupCreateTableCoulumns);
  InsertDrawerSetup(DrawerSetupCoulumnskey);
  getData(DrawerSetupTable, cb => {
    //   setDrawerSetupArr(cb[0]);
    //   setLoading(false);
    //   setIniCash('');
    updateColunm(
      DrawerSetupTable,
      ['isInitialLogin'],
      'id',
      'D12345678',
      'false',
    );
  });
};

export default ResetDrawerSetup;
