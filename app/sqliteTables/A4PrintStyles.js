import {ExecuteQuery} from '../sqliteHelper';

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
  IsFooterOnEveryPage: 'IsFooterOnEveryPage',
  IsHeaderOnEveryPage: 'IsHeaderOnEveryPage',
  PageHeight: 'PageHeight',
};
export const A4PrintStylesCreateTableCoulumns =
  `ReportFormatID INTEGER  PRIMARY KEY NOT NULL, PageID  INTEGER, ReportHeader  TEXT, ` +
  `IsPageHeaderActive  BOOLEAN, PageHeaderBody TEXT, PrintType INTEGER , ReportEditorType INTEGER, ReportBody TEXT, ReportFooter TEXT, ` +
  `IsPageFooterActive BOOLEAN, PageFooterBody TEXT, QSParameters TEXT, UseDefault BOOLEAN, SerialNo FLOAT, ` +
  `CultureCode TEXT, IsActive BOOLEAN, CreatedDate TEXT, UpdatedDate TEXT, HeaderSettings TEXT, ` +
  `BodySettings TEXT, FooterSettings TEXT, ShowDetailBorder  BOOLEAN, IsInstructionPageActive  BOOLEAN, ` +
  `InstructionPageBody  TEXT, DetailTitleBgColor  TEXT, DetailTitleFontColor  TEXT, DetailBorderType INTEGER , IsFooterOnEveryPage TEXT , IsHeaderOnEveryPage TEXT, PageHeight TEXT`;

export const A4PrintStylesInsertCoulumns =
  `ReportFormatID, PageID, ReportHeader, IsPageHeaderActive, PageHeaderBody, PrintType, ReportEditorType, ReportBody,` +
  ` ReportFooter, IsPageFooterActive, PageFooterBody, QSParameters, UseDefault, SerialNo, CultureCode, IsActive,` +
  `CreatedDate, UpdatedDate, HeaderSettings, BodySettings, FooterSettings, ` +
  `ShowDetailBorder, IsInstructionPageActive, InstructionPageBody, DetailTitleBgColor, DetailTitleFontColor, DetailBorderType, IsFooterOnEveryPage, IsHeaderOnEveryPage, PageHeight`;

export const InsertA4PrintStyles = async values => {
  let InsertDataQuery = `INSERT INTO ${A4PrintStylesTable} (${A4PrintStylesInsertCoulumns}) VALUES`;
  // let no = 0;
  let array = values.filter(
    x => x.PageID === 403006 || x.PageID === 403007 || x.PageID === 4030061,
  );

  for (let i = 0; i < array?.length; ++i) {
    // console.log("InsertA4PrintStyles....", values[i])
    // if (
    //   values[i].PageID === 403006 ||
    //   values[i].PageID === 403007 ||
    //   values[i].PageID === 4030061
    // ) {
    // no++;
    let ReportFooter = array[i].ReportFooter.replace("'", '');
    let ReportBody = array[i].ReportBody.replace("'", '');
    let ReportHeader = array[i].ReportHeader.replace("'", '');
    // ReportHeader = array[i].ReportHeader.replace(/'/g, "''");
    // ReportHeader = ""
    // console.log('InsertA4PrintStyles....', ReportHeader);

    InsertDataQuery =
      InsertDataQuery +
      "('" +
      array[i].ReportFormatID +
      "','" +
      array[i].PageID +
      "','" +
      ReportHeader +
      "','" +
      array[i].IsPageHeaderActive +
      "','" +
      array[i].PageHeaderBody +
      "','" +
      array[i].PrintType +
      "','" +
      array[i].ReportEditorType +
      "','" +
      ReportBody +
      "','" +
      ReportFooter +
      "','" +
      array[i].IsPageFooterActive +
      "','" +
      array[i].PageFooterBody +
      "','" +
      array[i].QSParameters +
      "','" +
      array[i].UseDefault +
      "','" +
      array[i].SerialNo +
      "','" +
      array[i].CultureCode +
      "','" +
      array[i].IsActive +
      "','" +
      array[i].CreatedDate +
      "','" +
      array[i].UpdatedDate +
      "','" +
      array[i].HeaderSettings +
      "','" +
      array[i].BodySettings +
      "','" +
      array[i].FooterSettings +
      "','" +
      array[i].ShowDetailBorder +
      "','" +
      array[i].IsInstructionPageActive +
      "','" +
      array[i].InstructionPageBody +
      "','" +
      array[i].DetailTitleBgColor +
      "','" +
      array[i].DetailTitleFontColor +
      "','" +
      array[i].DetailBorderType +
      "','" +
      array[i].IsFooterOnEveryPage +
      "','" +
      array[i].IsHeaderOnEveryPage +
      "','" +
      array[i].PageHeight +
      "')";

    if (i + 1 !== array.length) {
      InsertDataQuery = InsertDataQuery + ',';
    }
    // console.log('Insert Product Details InsertDataQuery..', name, name2);
    // }
  }

  InsertDataQuery = InsertDataQuery + ';';
  // console.log('Insert Product Details..', InsertDataQuery);
  try {
    let InsertA4PrintStyles = await ExecuteQuery(InsertDataQuery, []);
    // console.log('Insert A4 stylesss..', InsertA4PrintStyles);
  } catch (error) {
    // console.log('Insert A4 stylesss..', error);
  }
};
