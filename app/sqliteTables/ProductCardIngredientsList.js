import { ExecuteQuery } from '../sqliteHelper';

export const ProductCardIngredientsListTable = 'ProductCardIngredientsList';

export const ProductCardIngredientsListCoulumnskey = {
  Id: "Id",
  CategoryIngredientCode: 'CategoryIngredientCode',
  IngredientName: 'IngredientName',
  IngredientName1: 'IngredientName1',
  Operation: 'Operation',
  ProductBarCode: 'ProductBarCode',
  ProductCode: "ProductCode"
};
export const ProductCardIngredientsListCreateTableCoulumns = `Id Text  PRIMARY KEY NOT NULL, CategoryIngredientCode INTEGERL, IngredientName  TEXT, IngredientName1  TEXT, Operation  TEXT, ProductBarCode TEXT, ProductCode TEXT`;

export const ProductCardIngredientsListInsertCoulumns = `Id, CategoryIngredientCode, IngredientName, IngredientName1, Operation,ProductBarCode, ProductCode`;

export const InsertProductCardIngredientsList = async values => {
  let InsertDataQuery = `INSERT INTO ${ProductCardIngredientsListTable} (${ProductCardIngredientsListInsertCoulumns}) VALUES`;

  for (let i = 0; i < values?.length; ++i) {
    let IngredientName1 = values[i].IngredientName1.replace("'", '');
    // console.log(
    //   'InsertProductCardIngredientsList',
    //   values[i].CategoryIngredientCode + values[i].IngredientName,
    // );
    InsertDataQuery =
      InsertDataQuery +
      "('" +
      values[i].CategoryIngredientCode +
      values[i].ProductBarCode +
      "','" +
      values[i].CategoryIngredientCode +
      "','" +
      values[i].IngredientName +
      "','" +
      IngredientName1 +
      "','" +
      values[i].Operation +
      "','" +
      values[i].ProductBarCode +
      "','" +
      values[i].ProductCode +
      "')";
    if (i != values.length - 1) {
      InsertDataQuery = InsertDataQuery + ',';
    }
    // console.log('Insert Product Details InsertDataQuery..', name, name2);
  }

  InsertDataQuery = InsertDataQuery + ';';

  let InsertTaxesPostingConfigurationList = await ExecuteQuery(
    InsertDataQuery,
    [],
  );
  //   console.log('Insert Product Details..', InsertTaxesPostingConfigurationList);
};
