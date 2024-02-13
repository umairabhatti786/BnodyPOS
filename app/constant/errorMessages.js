const GetLoginMessage = (responseCode, StringsList) => {
  let message = '';
  // console.log(responseCode, StringsList);

  switch (parseInt(responseCode)) {
    case -1:
      //Exception Internal error
      message = StringsList?._207
        ? StringsList?._207
        : 'Unabale To Login Due To Internal System Failure';
      break;
    case -20:
      message = StringsList?._208
        ? StringsList?._208
        : 'Enter username & password';
      break;
    case -21:
      message = StringsList?._209 ? StringsList?._209 : 'Enter username';
      break;
    case -22:
      message = StringsList?._210 ? StringsList?._210 : 'Enter password';
      break;
    case -23:
      message = StringsList?._211
        ? StringsList?._211
        : 'Unprocessed Bills need to be Synced before login to other Company';
      break;
    case -24:
      message = StringsList?._212
        ? StringsList?._212
        : 'System Failure - API System Error';
      break;
    case 0:
      message = 'System Failure - Local System Error';
      break;
    case 1:
      //USER & DEVICE are OPEN, means Application was closed unexpectedly or User Logged out on this device in Offline Mode.
      message = StringsList?._213
        ? StringsList?._213
        : 'Application Failure or User Sign out in Offline State';
      break;
    case 2:
      //DEVICE is OPEN and USER is not Logged in or Previous User Logged out in Ofline Mode.
      //USER has to wait to Login on this device until  POS WINDOW SERVICE runs on server. Our POS Service will make this device close.
      message = StringsList?._214
        ? StringsList?._214
        : 'Last user sign out in disconnected environment, please ask last user to sign in';
      break;
    case 3:
      //USER is already Logged in on other device, first logged out from that device and then login from this device
      message = StringsList?._215
        ? StringsList?._215
        : 'User is already Signed on other device';
      break;
    case 4:
      //Invalid Login ID
      message = StringsList?._216 ? StringsList?._216 : 'Invalid user';
      break;

    case 5:
      //Invalid Password
      message = StringsList?._217 ? StringsList?._217 : 'Invalid password';
      break;

    case 6:
      //Invalid License Key (CounterUniqueKey) or Counter is not registered.
      message = StringsList?._218
        ? StringsList?._218
        : 'Required  Terminal code';
      //message = Common.GetLanguageString(3436, "Invalid Counter License (Your counter is not registered with server)");
      break;

    case 7:
      //USER is not Active (Means administrator disabled this User)
      message = StringsList?._219 ? StringsList?._219 : 'In Active User';
      break;

    case 8:
      //COUNTER is not Active (Means administrator disabled this Counter)
      message = StringsList?._220 ? StringsList?._220 : 'In Active Terminal';
      break;

    case 9:
      //Administrator has forcefully logged out the USER OR DEVICE, please contact administrator
      message = StringsList?._221
        ? StringsList?._221
        : 'User or Terminal is signed out from server';
      break;

    case 10:
      //Provided Counter Code is Invalid, means no registeration
      message = StringsList?._222 ? StringsList?._222 : 'Invalid Terminal code';
      break;

    case 11:
      //Desired Counter is already registered, means he is tring to run this application on other system
      message = StringsList?._223
        ? StringsList?._223
        : 'Terminal code is already in user';
      break;
    case 12:
      //This Counter Unique Key is already registered
      message = StringsList?._224
        ? StringsList?._224
        : 'Terminal Registration key already exist on server';
      break;
    //case 13:
    //    //IsOfflineLoginAllowed is True and wrong Salesman try to login
    //    message = Common.GetLanguageString(216, "Username is invalid");
    //break;
    case 14:
      //If user is linked to other counter then user cannot login from this counter
      message = StringsList?._225
        ? StringsList?._225
        : 'User mapped to other Terminal';
      break;
    case 15:
      //If user is linked to other counter then user cannot login from this counter
      message = StringsList?._228
        ? StringsList?._228
        : 'Server is not responding';
      break;
    default:
      message = '';
      break;

    //========================================= Above All Changed Strings ==============================================
  }

  return message;
};

const GetDBConnectionMessage = strCaption => {
  let message = '';

  switch (strCaption) {
    case 'Invalid Credentail':
      message = 'Database Server Information is not correct';
      break;

    case 'Unable to connect':
      message = 'Failed to pair with database';
      break;

    default:
      message = '';
      break;
  }

  return message;
};

const GetInternetConnectionMessage = strCaption => {
  let message = '';

  switch (strCaption) {
    case 'NoInternet':
      message = 'Server is not responding';
      break;
    case 'EmptyAPIURL':
      message = 'API Address not found';
      break;

    default:
      message = '';
      break;
  }

  return message;
};

const GetCounterMessage = (strCaption, str) => {
  let message = '';

  switch (strCaption) {
    case 'itemCheckQuantityLess':
      message = 'Cannot return more then actual quantity of an item ';
      break;

    case 'creditError':
      message = 'Account is not set against current payment method';
      break;
    case 'invoiceMessage':
      message = 'Press new button to proceed';
      break;
    case 'invalidCustomerCode':
      message = 'Buyer code not exist';
      break;
    case 'paidAmountLessthanBalance':
      message = 'Cash amount is less than total amount to pay';
      break;
    case 'selectItems':
      message = 'Cart is empty';
      break;
    case 'withdrawAmtIncreased':
      message = 'Canot Withdraw more then cash in hand';
      break;
    case 'customerCodeProced':
      message = 'Buyer code required';
      break;
    case 'noItemUnableHold':
      message = str._238 ? str_238 : 'Cannot process to Freez ,Record not found';
      break;
    case 'holdInvoiceNameAlreadyExit':
      message = 'Duplicate bill name';
      break;
    case 'PostSettingAccountMsg':
      message = 'Buyer Account is not configured';
      break;
    case 'PostSettingReturnnotAllow':
      message = 'Return accounts are not configured';
      break;
    case 'PostSettingTaxorDiscounttoRemove':
      message = str?._242 ? str._242 : 'Bill cannot be post due to internet or server issue,Try again';
      break;
    case 'RecordAlreadyExists':
      message = 'Name already exists';
      break;
    case 'InvoiceDoesNotExist':
      message = 'Bill not found';
      break;
    case 'NoMoretoReturn':
      message = 'Bill already returned';
      break;
    case 'ServerError':
      message = 'inappropriate Configration or logged in Information.';
      break;
    case 'NoPostingSetup':
      message = 'Payment method not defined';
      break;
    case 'PendingInvoices':
      message = str._248 ? str._248 : 'Post all bills before reboot terminal.';
      break;
    case 'AsktoResetApp':
      message = 'Are you sure to reboot terminal.';
      break;
    case 'AsktoSYNCApp':
      message = 'Are you sure to post all bills';
      //message = Common.GetLanguageString(250, "You really want to process all offline invoices");
      break;
    case 'ItemcodeIsNotValid':
      message = 'Product code is not found';
      break;
    case 'DateFormat':
      message = 'Invalid Date format';
      break;
    case 'TimeFormat':
      message = 'Invalid time format(24:30)';
      break;
    case 'InvalidEntry':
      message = 'Invalid entry';
      break;
    case 'DeleteConfirmation':
      message = 'Do you want to continue?';
      break;
    case 'PriceCannotBeZero':
      message = 'Product cannot sale with price zero';
      break;
    case 'QuantityCannotBeZero':
      message = 'Enter Quantity to proceed';
      break;
    case 'DuplicateInvoiceExist':
      message = 'Need to reboot terminal to get latest invoice number';
      break;

    case 'UnableToSave':
      message = 'Facing problem in saving form ';
      break;
    case 'OfflineCounterNotAuthorizedMessage':
      message = str._276 ? str._276 : 'Authentication failed! You need to login again';
      break;
    case 'BuyerNotAdded':
      message = 'Buyer is not added yet';
      break;
    case 'IngredientSave':
      message = 'Product Ingredient Saved Successfully';
      break;
    default:
      message = '';
      break;
  }

  return message;
};

const GetCustomerMessage = (strCaption, str) => {
  let message = '';

  switch (strCaption) {
    case 'customerCodeProced':
      message = 'buyer code Required';
      break;
    case 'customerProcessFailed':
      message = 'Failed to get Buyer Information';
      break;
    case 'invalidCustomerCode':
      message = 'Buyer code not exist';
      break;
    case 'accountNotSetup':
      message = 'Buyer Account is not configured';
      break;
    case 'stopDealing':
      message = 'Buyer dealing been stopped from server.';
      break;
    case 'creditLimit':
      message = 'Cannot processed due to short of credit limit';
      break;
    case 'customerExist':
      message = 'Buyer already exists';
      break;
    case 'customerNamePhoneRequired':
      message = 'Phone' + '/' + 'Name' + ' ' + 'Required: ';
      break;
    case 'customerPhoneTenDigits':
      message = 'Phone must be of 10 digits';
      break;
    case 'addressrequired':
      message = 'Buyer Address Required';
      break;
    case 'notgetsmsdetail':
      message = 'could not fetch buyer sms details';
      break;
    case 'limitExpired':
      message = 'SMS limit expired';
      break;
    case 'smsurlnotfound':
      message = 'SMS sendig url address is not exist';
      break;
    case 'smssetupnotexist':
      message = 'buyer sms setup not exist';
      break;
    case 'smssnotsent':
      message = 'could not send sms to buyer';
      break;
    case 'noreward':
      message = 'Loyalty has no reward';
      break;
    case 'ExceedsRedeemPoints':
      message = str._415 ? str._415 : 'Redeem Points cannot be greater than Balance points';
      break;
    case 'AddRedeemPoints':
      message = 'Please add redeem points';
      break;

    default:
      message = '';
      break;
  }

  return message;
};

const GetCashDrawMessage = strCaption => {
  let message = '';

  switch (strCaption) {
    case 'cashdrawNotFound':
      message = 'Cash drawer not found';
      break;
    case 'diviceNotFound':
      message = 'Enable to find any device';
      break;
    case 'cashdrawNotConfigured':
      message = 'Cash drawer is not configured properly';
      break;
    default:
      message = '';
      break;
  }

  return message;
};

const GetPrinterMessage = strCaption => {
  let message = '';

  switch (strCaption) {
    case 'invalidPrinter':
      message = 'Print device not Exist';
      break;
    case 'PrinterNotFound':
      message = 'Print device not Exist';
      break;
    case '`Failed':
      message = 'Facing problem in saving form ';
      break;
    case 'PrintingError':
      message = 'Problem in Printing.';
      break;
    default:
      message = '';
      break;
  }

  return message;
};

const GetDeviceSettingMessage = strCaption => {
  let message = '';

  switch (strCaption) {
    case 'RecordSaved':
      message = 'Record saved successfully';
      break;
    case 'UnableToSave':
      message = 'Facing problem in saving form ';
      break;
    case 'InsertionFailed':
      message = 'Facing problem in saving form ';
      break;
    default:
      message = '';
      break;
  }

  return message;
};

const GetAPIMessage = strCaption => {
  let message = '';

  switch (strCaption) {
    case 'InvoicesNotProcessed':
      message = 'Problem occur in bills posting on server,unable to continue';
      break;
    case 'UnknownError':
      //message = Common.GetLanguageString(299, " API level Problem ,API call terminated");
      message = 'Unable to process due to Application problem';

      break;
    case 'UnknownAuthError':
      message = 'User is disconnected from Server';
      break;
    case 'PostSalesInvoice_ResponceString':
      message = 'Http Api Bill Uploading , Reply Code =  ';
      break;
    case 'PostSingleSalesInvoice_ResponceString':
      message = 'Sale Bill Uploading  , Reply Code =  ';
      break;
    case 'PostReturnSalesInvoice_ResponceString':
      message = 'Return Bill Uploading  , Reply Code =  ';
      break;
    case 'LogOut_ResponceString':
      message = 'Api LogOut Call, Reply Code =  ';
      break;
    case 'ResetSetUpCalled':
      message = DateTime.Now.ToString() + 'Rebooting';
      break;
    case 'SynchronizeDataCalled':
      message = DateTime.Now.ToString() + 'Uploading all Bills';
      break;
    case 'buyersmsdetailnotposted':
      message = 'Buyer SmS detail could not posted  on server';
      break;
    case 'NoRecordsFound':
      message = 'No Records Found';
      break;
    case 'limitExpired':
      message = 'SMS limit expired';
      break;
    case 'TermialConfigurationNull':
      message = 'Terminal is not Attached, You need to login Again';
      break;
    case 'ProbleminsendingSMS':
      message = 'Problem In Sending SMS';
      break;
    default:
      message = '';
      break;
  }

  return message;
};

const GetApplicationMessage = strCaption => {
  const message = string.Empty;

  switch (strCaption) {
    case 'UnknownError':
      message = 'Application level Problem,Process terminated';
      break;
    default:
      message = '';
      break;
  }

  return message;
};
const errorMessages = {
  GetLoginMessage,
  GetDBConnectionMessage,
  GetInternetConnectionMessage,
  GetCounterMessage,
  GetCustomerMessage,
  GetCashDrawMessage,
  GetPrinterMessage,
  GetDeviceSettingMessage,
  GetApplicationMessage,
  GetAPIMessage,
};
export default errorMessages;
