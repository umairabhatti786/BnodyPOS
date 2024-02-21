import {combineReducers} from 'redux';
const initialState = {
  UserLogin: '',
  TerminalConfiguration: '',
  SalesPostingConfigurationList: '',
  TaxesPostingConfigurationList: '',
  ProductsInfo: '',
  StringsList: '',
  TaxSetupParent: '',
  WeighingScaleConfiguration: '',
  A4PrintCells: '',
  A4PrintStyles: '',
  UserConfiguration: '',
  PrinterFamily: '',
  LoyaltyList: '',
  LoyaltyRewardsList: '',
  LoyaltyRewardNamesList: '',
  LoyaltyDetailList: '',
  CardSetupParent: '',
  stringsListEnglish: '',
  stringsListArabic: '',
};
const ServerCall = (state = {}, action) => {
  // console.log('actionsss', action);
  switch (action.type) {
    case 'SERVER_LOADING':
      return {
        isLoading: true,
        isError: false,
        isSuccess: false,
        errors: null,
      };

    case 'SERVER_SUCCESS':
      return {
        isLoading: false,
        isError: false,
        isSuccess: true,
        errors: null,
      };

    case 'SERVER_FAIL':
      return {
        isLoading: false,
        isError: true,
        isSuccess: false,
        errors: action.payload,
      };

    default:
      return state;
  }
};

const SaveAllData = (state = initialState, action) => {
  switch (action.type) {
    case 'SAVE_DATA':
      switch (action.payload.type) {
        case 'configrution':
          return {
            UserLogin: action.payload?.data.accessToken,
            TerminalConfiguration: action.payload?.data?.TerminalConfiguration,
            SalesPostingConfigurationList:
              action.payload?.data?.SalesPostingConfigurationList,
            TaxesPostingConfigurationList:
              action.payload?.data?.TaxesPostingConfigurationList,
            ProductsInfo: action.payload?.data?.ProductsInfo,
            StringsList: action.payload?.data?.StringsList,
            TaxSetupParent: action.payload?.data?.TaxSetupParent,
            WeighingScaleConfiguration:
              action.payload?.data?.WeighingScaleConfiguration,
            A4PrintCells: action.payload?.data?.A4PrintCells,
            A4PrintStyles: action.payload?.data?.A4PrintStyles,
            UserConfiguration: action.payload?.data?.UserConfiguration,
            PrinterFamily: action.payload?.data?.PrinterFamily,
            LoyaltyList: action.payload?.data?.LoyaltyList,
            LoyaltyRewardsList: action.payload?.data?.LoyaltyRewardsList,
            LoyaltyRewardNamesList:
              action.payload?.data?.LoyaltyRewardNamesList,
            LoyaltyDetailList: action.payload?.data?.LoyaltyDetailList,
            CardSetupParent: action.payload?.data?.CardSetupParent,
            stringsListEnglish: action.payload?.data?.stringsListEnglish,
            stringsListArabic: action.payload?.data?.stringsListArabic,
            orderTackerList: action.payload?.data?.OrderTackers,
          };
          break;
        case 'ChangeStringsList':
          state.StringsList = action.payload?.data;
          return {
            ...state,
            // StringsList: state.StringsList,
          };

        default:
          break;
      }
      return {
        isLoading: true,
        isError: false,
        isSuccess: false,
        errors: null,
      };
    default:
      return state;
  }
};

export default combineReducers({
  ServerCall,
  SaveAllData,
});
