import { ExecuteQuery } from '../sqliteHelper';

export const WeighingScaleConfigurationTable =
  'WeighingScaleConfigurationTable';

export const WeighingScaleConfigurationCoulumnskey = {
  Id: 'Id',
  BarcodePrefix: 'BarcodePrefix',
  PrefixWidth: 'PrefixWidth',
  ProductCodeBeginingDigit: 'ProductCodeBeginingDigit',
  ProductCodeWidth: 'ProductCodeWidth',
  IsQuantityScale: 'IsQuantityScale',
  QuantityValueBeginingDigit: 'QuantityValueBeginingDigit',
  QuantityValueWidth: 'QuantityValueWidth',
  QuantityDecimalBeginingDigit: 'QuantityDecimalBeginingDigit',
  QuantityDecimalWidth: 'QuantityDecimalWidth',
  IsAmountScale: 'IsAmountScale',
  AmountValueBeginingDigit: 'AmountValueBeginingDigit',
  AmountValueWidth: 'AmountValueWidth',
  AmountDecimalBeginingDigit: 'AmountDecimalBeginingDigit',
  AmountDecimalWidth: 'AmountDecimalWidth',
};
export const WeighingScaleConfigurationCreateTableCoulumns =
  `Id TEXT  PRIMARY KEY NOT NULL, BarcodePrefix  TEXT, PrefixWidth INTEGER, ProductCodeBeginingDigit  INTEGER, ProductCodeWidth  INTEGER, IsQuantityScale BOOLEAN, ` +
  `QuantityValueBeginingDigit INTEGER, QuantityValueWidth INTEGER, QuantityDecimalBeginingDigit INTEGER, QuantityDecimalWidth INTEGER, IsAmountScale BOOLEAN, ` +
  `AmountValueBeginingDigit INTEGER, AmountValueWidth INTEGER, AmountDecimalBeginingDigit INTEGER, AmountDecimalWidth INTEGER`;

export const WeighingScaleConfigurationInsertCoulumns =
  `Id, BarcodePrefix, PrefixWidth, ProductCodeBeginingDigit, ProductCodeWidth, IsQuantityScale, QuantityValueBeginingDigit, ` +
  `QuantityValueWidth, QuantityDecimalBeginingDigit, QuantityDecimalWidth, IsAmountScale, AmountValueBeginingDigit, AmountValueWidth, AmountDecimalBeginingDigit, ` +
  `AmountDecimalWidth`;

export const InsertWeighingScaleConfiguration = async values => {
  let InsertDataQuery = `INSERT INTO ${WeighingScaleConfigurationTable} (${WeighingScaleConfigurationInsertCoulumns}) VALUES`;

  for (let i = 0; i < values?.length; ++i) {
    InsertDataQuery =
      InsertDataQuery +
      "('" +
      values[i].BarcodePrefix +
      values[i].PrefixWidth +
      "','" +
      values[i].BarcodePrefix +
      "','" +
      values[i].PrefixWidth +
      "','" +
      values[i].ProductCodeBeginingDigit +
      "','" +
      values[i].ProductCodeWidth +
      "','" +
      values[i].IsQuantityScale +
      "','" +
      values[i].QuantityValueBeginingDigit +
      "','" +
      values[i].QuantityValueWidth +
      "','" +
      values[i].QuantityDecimalBeginingDigit +
      "','" +
      values[i].QuantityDecimalWidth +
      "','" +
      values[i].IsAmountScale +
      "','" +
      values[i].AmountValueBeginingDigit +
      "','" +
      values[i].AmountValueWidth +
      "','" +
      values[i].AmountDecimalBeginingDigit +
      "','" +
      values[i].AmountDecimalWidth +
      "')";
    if (i != values.length - 1) {
      InsertDataQuery = InsertDataQuery + ',';
    }
    // console.log('Insert Product Details InsertDataQuery..', name, name2);
  }

  InsertDataQuery = InsertDataQuery + ';';

  let InsertWeighingScaleConfiguration = await ExecuteQuery(
    InsertDataQuery,
    [],
  );
  //   console.log('Insert Product Details..', InsertWeighingScaleConfiguration);
};
