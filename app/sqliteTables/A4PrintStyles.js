import { ExecuteQuery } from '../sqliteHelper';

export const A4PrintStylesTable = 'A4PrintStylesTable';

export const A4PrintStylesCoulumnskey = {
  ReportFormatID: 'ReportFormatID',
  PageID: 'PageID',
  ReportHeader: 'ReportHeader',
  IsPageHeaderActive: 'IsPageHeaderActive',
  PageHeaderBody: 'PageHeaderBody',
  PrintType: 'PrintType',
  ReportEditorType: 'ReportEditorType',
  ReportBody: 'ReportBody',
  ReportFooter: 'ReportFooter',
  IsPageFooterActive: 'IsPageFooterActive',
  PageFooterBody: 'PageFooterBody',
  QSParameters: 'QSParameters',
  UseDefault: 'UseDefault',
  SerialNo: 'SerialNo',
  CultureCode: 'CultureCode',
  IsActive: 'IsActive',
  CreatedDate: 'CreatedDate',
  UpdatedDate: 'UpdatedDate',
  HeaderSettings: 'HeaderSettings',
  BodySettings: 'BodySettings',
  FooterSettings: 'FooterSettings',
  ShowDetailBorder: 'ShowDetailBorder',
  IsInstructionPageActive: 'IsInstructionPageActive',
  InstructionPageBody: 'InstructionPageBody',
  DetailTitleBgColor: 'DetailTitleBgColor',
  DetailTitleFontColor: 'DetailTitleFontColor',
  DetailBorderType: 'DetailBorderType',
};
export const A4PrintStylesCreateTableCoulumns =
  `ReportFormatID INTEGER  PRIMARY KEY NOT NULL, PageID  INTEGER, ReportHeader  TEXT, ` +
  `IsPageHeaderActive  BOOLEAN, PageHeaderBody TEXT, PrintType INTEGER , ReportEditorType INTEGER, ReportBody TEXT, ReportFooter TEXT, ` +
  `IsPageFooterActive BOOLEAN, PageFooterBody TEXT, QSParameters TEXT, UseDefault BOOLEAN, SerialNo FLOAT, ` +
  `CultureCode TEXT, IsActive BOOLEAN, CreatedDate TEXT, UpdatedDate TEXT, HeaderSettings TEXT, ` +
  `BodySettings TEXT, FooterSettings TEXT, ShowDetailBorder  BOOLEAN, IsInstructionPageActive  BOOLEAN, ` +
  `InstructionPageBody  TEXT, DetailTitleBgColor  TEXT, DetailTitleFontColor  TEXT, DetailBorderType INTEGER`;

export const A4PrintStylesInsertCoulumns =
  `ReportFormatID, PageID, ReportHeader, IsPageHeaderActive, PageHeaderBody, PrintType, ReportEditorType, ReportBody,` +
  ` ReportFooter, IsPageFooterActive, PageFooterBody, QSParameters, UseDefault, SerialNo, CultureCode, IsActive,` +
  `CreatedDate, UpdatedDate, HeaderSettings, BodySettings, FooterSettings, ` +
  `ShowDetailBorder, IsInstructionPageActive, InstructionPageBody, DetailTitleBgColor, DetailTitleFontColor, DetailBorderType`;

export const InsertA4PrintStyles = async values => {
  let InsertDataQuery = `INSERT INTO ${A4PrintStylesTable} (${A4PrintStylesInsertCoulumns}) VALUES`;

  for (let i = 0; i < values?.length; ++i) {
    let ReportFooter = values[i].ReportFooter.replace("'", '');
    let ReportBody = values[i].ReportBody.replace("'", '');
    let ReportHeader = values[i].ReportHeader.replace("'", '');

    InsertDataQuery =
      InsertDataQuery +
      "('" +
      values[i].ReportFormatID +
      "','" +
      values[i].PageID +
      "','" +
      ReportHeader +
      "','" +
      values[i].IsPageHeaderActive +
      "','" +
      values[i].PageHeaderBody +
      "','" +
      values[i].PrintType +
      "','" +
      values[i].ReportEditorType +
      "','" +
      ReportBody +
      "','" +
      ReportFooter +
      "','" +
      values[i].IsPageFooterActive +
      "','" +
      values[i].PageFooterBody +
      "','" +
      values[i].QSParameters +
      "','" +
      values[i].UseDefault +
      "','" +
      values[i].SerialNo +
      "','" +
      values[i].CultureCode +
      "','" +
      values[i].IsActive +
      "','" +
      values[i].CreatedDate +
      "','" +
      values[i].UpdatedDate +
      "','" +
      values[i].HeaderSettings +
      "','" +
      values[i].BodySettings +
      "','" +
      values[i].FooterSettings +
      "','" +
      values[i].ShowDetailBorder +
      "','" +
      values[i].IsInstructionPageActive +
      "','" +
      values[i].InstructionPageBody +
      "','" +
      values[i].DetailTitleBgColor +
      "','" +
      values[i].DetailTitleFontColor +
      "','" +
      values[i].DetailBorderType +
      "')";

    if (i != values.length - 1) {
      InsertDataQuery = InsertDataQuery + ',';
    }
    // console.log('Insert Product Details InsertDataQuery..', name, name2);
  }

  InsertDataQuery = InsertDataQuery + ';';

  let InsertA4PrintStyles = await ExecuteQuery(InsertDataQuery, []);
  //   console.log('Insert Product Details..', InsertA4PrintStyles);
};
