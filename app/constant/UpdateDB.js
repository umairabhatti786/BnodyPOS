import React, {useState, useRef, useEffect} from 'react';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CreateTable, DeleteTable} from '../sqliteHelper';
import {
  InsertStringsList,
  StringsListCoulumns,
  StringsListTable,
} from '../sqliteTables/StringsList';
import {
  CategoriesCreateTableCoulumns,
  CategoriesListTable,
  InsertCategoriesList,
} from '../sqliteTables/CategoriesList';
import {
  InsertProductList,
  ProductCreateTableCoulumns,
  ProductListTable,
} from '../sqliteTables/ProductList';
import {
  InsertProductDetails,
  ProductDetailCreateTableCoulumns,
  ProductDetailListTable,
} from '../sqliteTables/ProductDetailList';
import {
  InsertSalesAgentsList,
  SalesAgentsCreateTableCoulumns,
  SalesAgentsTable,
} from '../sqliteTables/SalesAgents';
import {
  InsertTerminalConfiguration,
  TerminalConfigurationCreateTableCoulumns,
  TerminalConfigurationTable,
} from '../sqliteTables/TerminalConfiguration';
import {
  A4PrintCellsCreateTableCoulumns,
  A4PrintCellsTable,
  InsertA4PrintCells,
} from '../sqliteTables/A4PrintCells';
import {
  A4PrintStylesCreateTableCoulumns,
  A4PrintStylesTable,
  InsertA4PrintStyles,
} from '../sqliteTables/A4PrintStyles';
import {
  InsertProductCardAddOnGroupList,
  ProductCardAddOnGroupListCreateTableCoulumns,
  ProductCardAddOnGroupListTable,
} from '../sqliteTables/ProductCardAddOnGroupList';
import {
  InsertSalesFamilySummaryList,
  SalesFamilySummaryListCreateTableCoulumns,
  SalesFamilySummaryListTable,
} from '../sqliteTables/SalesFamilySummaryList';
import {
  InsertSalesPostingConfigurationList,
  SalesPostingConfigurationListCreateTableCoulumns,
  SalesPostingConfigurationListTable,
} from '../sqliteTables/SalesPostingConfigurationList';
import {
  InsertTaxesPostingConfigurationList,
  TaxesPostingConfigurationListCreateTableCoulumns,
  TaxesPostingConfigurationListTable,
} from '../sqliteTables/TaxesPostingConfigurationList';
import {
  InsertTaxMethodsList,
  TaxMethodsListCreateTableCoulumns,
  TaxMethodsListTable,
} from '../sqliteTables/TaxMethodsList';
import {
  InsertTaxRateParentList,
  TaxRateParentListCreateTableCoulumns,
  TaxRateParentListTable,
} from '../sqliteTables/TaxRateParentList';
import {
  InsertUserConfiguration,
  UserConfigurationCreateTableCoulumns,
  UserConfigurationTable,
} from '../sqliteTables/UserConfiguration';
import {
  InsertWeighingScaleConfiguration,
  WeighingScaleConfigurationCoulumnskey,
  WeighingScaleConfigurationCreateTableCoulumns,
  WeighingScaleConfigurationTable,
} from '../sqliteTables/WeighingScaleConfiguration';
import {
  SaleBillDetailsCreateTableCoulumns,
  SaleBillDetailsTable,
} from '../sqliteTables/SaleBillDetails';
import {
  SaleBillsCreateTableCoulumns,
  SaleBillsTable,
} from '../sqliteTables/SaleBills';
import {
  InsertTerminalSetup,
  TerminalSetupCoulumnskey,
  TerminalSetupCreateTableCoulumns,
  TerminalSetupTable,
} from '../sqliteTables/TerminalSetup';
import {
  HoldInvoiceCreateTableCoulumns,
  HoldInvoiceTable,
} from '../sqliteTables/HoldInvoice';
import {
  DrawerSetupCoulumnskey,
  DrawerSetupCreateTableCoulumns,
  DrawerSetupTable,
  InsertDrawerSetup,
} from '../sqliteTables/DrawerSetup';
import {
  InsertUpdateProductDetailList,
  UpdateProductDetailListCoulumnskey,
  UpdateProductDetailListCreateTableCoulumns,
  UpdateProductDetailListTable,
} from '../sqliteTables/UpdateProductDetailList';
import {
  InsertLoyaltyDetailLists,
  LoyaltyDetailListCoulumnskey,
  LoyaltyDetailListsCreateTableCoulumns,
  LoyaltyDetailListTable,
} from '../sqliteTables/LoyaltyDetailList';
import {
  InsertLoyaltyList,
  LoyaltyListCreateTableCoulumns,
  LoyaltyListTable,
} from '../sqliteTables/LoyaltyList';
import {
  InsertLoyaltyRewardNamesList,
  LoyaltyRewardNamesListCreateTableCoulumns,
  LoyaltyRewardNamesListTable,
} from '../sqliteTables/LoyaltyRewardNamesList';
import {
  InsertLoyaltyRewardsLists,
  LoyaltyRewardsListsCreateTableCoulumns,
  LoyaltyRewardsListTable,
} from '../sqliteTables/LoyaltyRewardsList';

import {I18nManager} from 'react-native';
import {SaveAllData, ServerCall} from '../redux/actions/asynchronousAction';
import {
  InsertProductCardAddOnEquivalentProductsList,
  ProductCardAddOnEquivalentProductsListCoulumnskey,
  ProductCardAddOnEquivalentProductsListCreateTableCoulumns,
  ProductCardAddOnEquivalentProductsListInsertCoulumns,
  ProductCardAddOnEquivalentProductsListTable,
} from '../sqliteTables/ProductCardAddOnEquivalentProductsList';
import {
  InsertProductCardIngredientsList,
  ProductCardIngredientsListCreateTableCoulumns,
  ProductCardIngredientsListTable,
} from '../sqliteTables/ProductCardIngredientsList';
import {
  InsertPaymentMethodList,
  PaymentMethodListCreateTableCoulumns,
  PaymentMethodTable,
} from '../sqliteTables/PaymentMethods';

const reduceImageSizes = (
  path,
  maxWidth,
  maxHeight,
  compressFormat,
  quality,
) => {
  ImageResizer.createResizedImage(
    path,
    maxWidth,
    maxHeight,
    compressFormat,
    quality,
  )
    .then(response => {
      // response.uri is the URI of the new image that can now be displayed, uploaded...
      // response.path is the path of the new image
      // response.name is the name of the new image with the extension
      // response.size is the size of the new image
      return response.uri;
    })
    .catch(err => {
      // Oops, something went wrong. Check that the filename is correct and
      // inspect err to get more details.
    });
};

const AddDataInDb = async (props, type, accessToken, loginUserInfo) => {
  let date,
    month,
    year,
    stringList = [];
  date = new Date().getDate();
  month = new Date().getMonth();
  year = new Date().getFullYear();
  // console.log('month................', month, month.length);

  const currentDate = `${year}${month < 9 ? '0' + (month + 1) : month + 1}${
    date < 10 ? '0' + date : date
  }`;
  const response1 = await props.dispatch(
    ServerCall(
      accessToken,
      'Configuration/FetchConfiguration?freshCopy=true&currentdate=' +
        currentDate,
      'GET',
    ),
  );
  // console.log('response.......', response1);
  if (response1.success && response1?.TerminalConfiguration) {
    let productList = [],
      finalUpdatedProducts = [],
      finalUpdatedProductAddOnGroup = [];
    await DeleteTable(A4PrintCellsTable);
    await DeleteTable(A4PrintStylesTable);
    await DeleteTable(CategoriesListTable);
    await DeleteTable(ProductCardAddOnGroupListTable);
    await DeleteTable(ProductDetailListTable);
    await DeleteTable(ProductListTable);
    await DeleteTable(SalesAgentsTable);
    await DeleteTable(SalesFamilySummaryListTable);
    await DeleteTable(SalesPostingConfigurationListTable);
    await DeleteTable(StringsListTable);
    await DeleteTable(TaxesPostingConfigurationListTable);
    await DeleteTable(TaxMethodsListTable);
    await DeleteTable(TaxRateParentListTable);
    await DeleteTable(TerminalConfigurationTable);
    await DeleteTable(UserConfigurationTable);
    await DeleteTable(WeighingScaleConfigurationTable);
    await DeleteTable(SaleBillDetailsTable);
    await DeleteTable(SaleBillsTable);
    await DeleteTable(TerminalSetupTable);
    await DeleteTable(HoldInvoiceTable);
    if (type !== 'rebootTerminal') {
      await DeleteTable(DrawerSetupTable);
    }
    await DeleteTable(UpdateProductDetailListTable);
    await DeleteTable(LoyaltyDetailListTable);
    await DeleteTable(LoyaltyListTable);
    await DeleteTable(LoyaltyRewardNamesListTable);
    await DeleteTable(LoyaltyRewardsListTable);
    await DeleteTable(ProductCardAddOnEquivalentProductsListTable);
    await DeleteTable(ProductCardIngredientsListTable);
    await DeleteTable(PaymentMethodTable);

    CreateTable(A4PrintCellsTable, A4PrintCellsCreateTableCoulumns);
    CreateTable(A4PrintStylesTable, A4PrintStylesCreateTableCoulumns);
    CreateTable(CategoriesListTable, CategoriesCreateTableCoulumns);
    CreateTable(
      ProductCardAddOnGroupListTable,
      ProductCardAddOnGroupListCreateTableCoulumns,
    );
    // CreateTable(ProductDetailListTable, ProductDetailCreateTableCoulumns);
    CreateTable(ProductListTable, ProductCreateTableCoulumns);
    CreateTable(SalesAgentsTable, SalesAgentsCreateTableCoulumns);
    CreateTable(
      SalesFamilySummaryListTable,
      SalesFamilySummaryListCreateTableCoulumns,
    );
    CreateTable(
      SalesPostingConfigurationListTable,
      SalesPostingConfigurationListCreateTableCoulumns,
    );
    CreateTable(StringsListTable, StringsListCoulumns.StringsListOject);
    CreateTable(
      TaxesPostingConfigurationListTable,
      TaxesPostingConfigurationListCreateTableCoulumns,
    );
    CreateTable(TaxMethodsListTable, TaxMethodsListCreateTableCoulumns);
    CreateTable(TaxRateParentListTable, TaxRateParentListCreateTableCoulumns);
    CreateTable(TaxRateParentListTable, TaxRateParentListCreateTableCoulumns);
    CreateTable(
      TerminalConfigurationTable,
      TerminalConfigurationCreateTableCoulumns,
    );
    CreateTable(UserConfigurationTable, UserConfigurationCreateTableCoulumns);
    CreateTable(
      WeighingScaleConfigurationTable,
      WeighingScaleConfigurationCreateTableCoulumns,
    );
    CreateTable(SaleBillDetailsTable, SaleBillDetailsCreateTableCoulumns);
    CreateTable(SaleBillsTable, SaleBillsCreateTableCoulumns);
    CreateTable(TerminalSetupTable, TerminalSetupCreateTableCoulumns);
    CreateTable(HoldInvoiceTable, HoldInvoiceCreateTableCoulumns);
    if (type !== 'rebootTerminal') {
      CreateTable(DrawerSetupTable, DrawerSetupCreateTableCoulumns);
    }
    CreateTable(
      UpdateProductDetailListTable,
      UpdateProductDetailListCreateTableCoulumns,
    );
    CreateTable(LoyaltyDetailListTable, LoyaltyDetailListsCreateTableCoulumns);
    CreateTable(LoyaltyListTable, LoyaltyListCreateTableCoulumns);
    CreateTable(
      LoyaltyRewardNamesListTable,
      LoyaltyRewardNamesListCreateTableCoulumns,
    );
    CreateTable(
      LoyaltyRewardsListTable,
      LoyaltyRewardsListsCreateTableCoulumns,
    );
    CreateTable(
      ProductCardAddOnEquivalentProductsListTable,
      ProductCardAddOnEquivalentProductsListCreateTableCoulumns,
    );
    CreateTable(
      ProductCardIngredientsListTable,
      ProductCardIngredientsListCreateTableCoulumns,
    );
    CreateTable(PaymentMethodTable, PaymentMethodListCreateTableCoulumns);
    // console.log('Login Screen accessToken ', accessToken);
    let stringsListEnglish = Object.fromEntries(
      response1.StringsList.map(e => ['_' + e.SmartStringID, e.Name]),
    );
    let stringsListArabic = Object.fromEntries(
      response1.StringsList.map(e => [
        '_' + e.SmartStringID,
        e.SecondLanguageName,
      ]),
    );

    response1.ProductsInfo?.ProductCardFamilyList?.forEach((element, index) => {
      // console.log("element.ProductCardFamilyDetails......", element.ProductCardFamilyDetails)

      element.ProductCardFamilyDetails?.forEach((product, index) => {
        productList.push(product);
      });
    });
    InsertA4PrintCells(response1.A4PrintCells);
    InsertA4PrintStyles(response1.A4PrintStyles),
      InsertCategoriesList(response1.ProductsInfo?.ProductCardFamilyList),
      //  Filter the Addons list to only include the hold from sale check is off

      //   finalUpdatedProductAddOnGroup =
      //     response1.ProductsInfo?.ProductCardAddOnGroupList?.filter(
      //       x => x.HoldFromSale === false,
      //     )
      // if (
      //   Array.isArray(finalUpdatedProductAddOnGroup) &&
      //   finalUpdatedProductAddOnGroup !== undefined
      // ) {
      //   InsertProductCardAddOnGroupList(finalUpdatedProductAddOnGroup);
      // }

      InsertProductCardAddOnGroupList(
        response1.ProductsInfo?.ProductCardAddOnGroupList,
      ),
      // InsertProductDetails(
      //     response1.ProductsInfo?.ProductCardSummaryList,
      // );
      InsertProductList(productList);
    if (
      Array.isArray(response1?.TerminalConfiguration?.SalesAgents) &&
      response1.TerminalConfiguration?.SalesAgents.length > 0
    ) {
      let uniqueSaleAgent = [];
      response1?.TerminalConfiguration?.SalesAgents.forEach(element => {
        if (uniqueSaleAgent.length === 0) {
          uniqueSaleAgent.push(element);
        } else {
          let uniq = uniqueSaleAgent.find(
            x => x.SalesAgentCode === element.SalesAgentCode,
          );
          if (uniq) {
          } else {
            uniqueSaleAgent.push(element);
          }
        }
      });
      InsertSalesAgentsList(uniqueSaleAgent);
    }
    // InsertSalesAgentsList(response1?.TerminalConfiguration?.SalesAgents);
    InsertSalesFamilySummaryList(
      response1.ProductsInfo?.SalesFamilySummaryList,
    ),
      InsertSalesPostingConfigurationList(
        response1.SalesPostingConfigurationList,
      );
    if (
      Array.isArray(response1.SalesPostingConfigurationList) &&
      response1.SalesPostingConfigurationList.length > 0
    ) {
      let InsertValue = [];
      response1.SalesPostingConfigurationList.forEach(element => {
        let obj = {};
        obj.PaymentType = element.PaymentType;
        obj.PaymentTypeName = element.PaymentTypeName;
        obj.PaymentTypeName2 = element.PaymentTypeName2;
        obj.Sales = '0';
        InsertValue.push(obj);
      });
      InsertPaymentMethodList(InsertValue);
    }

    InsertStringsList(stringsListEnglish),
      InsertStringsList(stringsListArabic),
      InsertTaxesPostingConfigurationList(
        response1?.TaxesPostingConfigurationList,
      ),
      InsertTaxMethodsList(response1?.TaxSetupParent?.TaxMethodsList),
      InsertTaxRateParentList(response1?.TaxSetupParent?.TaxRateParentList);

    /////////here to stay//////////
    // await reduceImageSizes(response1?.TerminalConfiguration.CompanyLogo, 100, 100, "PNG", 70)
    ///////
    InsertTerminalConfiguration(response1?.TerminalConfiguration);
    InsertUserConfiguration(response1?.UserConfiguration);
    InsertWeighingScaleConfiguration(response1?.WeighingScaleConfiguration);
    InsertTerminalSetup(TerminalSetupCoulumnskey);
    if (type !== 'rebootTerminal') {
      InsertDrawerSetup(DrawerSetupCoulumnskey);
    }

    finalUpdatedProducts =
      response1.ProductsInfo?.ProductCardSummaryList?.filter(
        x => x.HoldFromSale === false,
      );
    if (
      Array.isArray(finalUpdatedProducts) &&
      finalUpdatedProducts !== undefined
    ) {
      InsertUpdateProductDetailList(finalUpdatedProducts);
    }
    InsertLoyaltyDetailLists(response1.LoyaltyDetailList);
    InsertLoyaltyList(response1.LoyaltyList);
    InsertLoyaltyRewardNamesList(response1.LoyaltyRewardNamesList);
    InsertLoyaltyRewardsLists(response1.LoyaltyRewardsList);
    // console.log("addon equivaletnt Products", response1?.ProductsInfo?.ProductCardAddOnEquivalentProductsList)
    InsertProductCardAddOnEquivalentProductsList(
      response1?.ProductsInfo?.ProductCardAddOnEquivalentProductsList,
    );
    InsertProductCardIngredientsList(
      response1?.ProductsInfo?.ProductCardIngredientsList,
    );

    stringList.stringsListEnglish = stringsListEnglish;
    stringList.stringsListArabic = stringsListArabic;
    stringList.StringsList = I18nManager.isRTL
      ? stringsListArabic
      : stringsListEnglish;

    // console.log('Login Screen Data ', UserLogin);
    let data = {type: 'configrution', data: stringList};
    const res = await props.dispatch(SaveAllData(data));
    console.log(
      'DEFAULT_GTAX',
      response1.TerminalConfiguration.DefaultGlobalProductTaxGroupSalesBill,
    );
    if (
      response1?.TerminalConfiguration?.DefaultGlobalProductTaxGroupSalesBill &&
      response1?.TerminalConfiguration
        ?.DefaultGlobalProductTaxGroupSalesBill !== ''
    )
      await AsyncStorage.setItem(
        'DEFAULT_GTAX',
        response1.TerminalConfiguration.DefaultGlobalProductTaxGroupSalesBill,
      );
    else {
      await AsyncStorage.removeItem('DEFAULT_GTAX');
    }
    if (type === 'rebootTerminal') {
      props.navigation.replace('Main');
    } else {
      await AsyncStorage.setItem('ACCESS_TOKEN', accessToken);
      await AsyncStorage.setItem(
        'LOGIN_USER_INFO',
        JSON.stringify(loginUserInfo),
      );
      props.navigation.replace('Main');
    }
    return true;
  } else {
    return false;
  }
};
const mapStateToProps = state => {
  return {
    TerminalConfiguration: state.user.SaveAllData.TerminalConfiguration,
    ProductsInfo: state.user.SaveAllData.ProductsInfo,
    StringsList: state.user.SaveAllData.StringsList,
  };
};

const DBTable = {
  AddDataInDb,
};

export default DBTable;
