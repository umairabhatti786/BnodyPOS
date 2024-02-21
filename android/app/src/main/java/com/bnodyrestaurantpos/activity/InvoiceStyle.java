package com.bnodyrestaurantpos.activity;

import android.Manifest;
import android.annotation.SuppressLint;
import android.app.Activity;
import android.app.AlertDialog;
import android.app.PendingIntent;
import android.app.ProgressDialog;
import android.bluetooth.BluetoothAdapter;
import android.bluetooth.BluetoothDevice;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.pm.PackageManager;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Paint;
import android.hardware.usb.UsbConstants;
import android.hardware.usb.UsbDevice;
import android.hardware.usb.UsbManager;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.os.Handler;
import android.os.Message;
import android.provider.MediaStore;
import android.text.TextUtils;
import android.util.Base64;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.AdapterView;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ProgressBar;
import android.widget.RadioGroup;
import android.widget.TextView;

import androidx.annotation.IdRes;
import androidx.annotation.RequiresApi;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;

import com.bnodyrestaurantpos.R;
import com.bnodyrestaurantpos.app.BaseActivity;
import com.bnodyrestaurantpos.app.BaseApplication;
import com.bnodyrestaurantpos.dialog.BluetoothDeviceChooseDialog;
import com.bnodyrestaurantpos.dialog.UsbDeviceChooseDialog;
import com.bnodyrestaurantpos.utils.BaseEnum;
import com.bnodyrestaurantpos.utils.FuncUtils;
import com.bnodyrestaurantpos.utils.LogUtils;
import com.bnodyrestaurantpos.utils.SPUtils;
import com.bnodyrestaurantpos.utils.TempletDemo;
import com.bnodyrestaurantpos.utils.TimeRecordUtils;
import com.bnodyrestaurantpos.utils.ToastUtil;
import com.bnodyrestaurantpos.utils.TonyUtils;
import com.bnodyrestaurantpos.view.FlowRadioGroup;
import com.rt.printerlibrary.bean.BluetoothEdrConfigBean;
import com.rt.printerlibrary.bean.Position;
import com.rt.printerlibrary.bean.PrinterStatusBean;
import com.rt.printerlibrary.bean.UsbConfigBean;
import com.rt.printerlibrary.bean.WiFiConfigBean;
import com.rt.printerlibrary.cmd.Cmd;
import com.rt.printerlibrary.cmd.CpclFactory;
import com.rt.printerlibrary.cmd.EscCmd;
import com.rt.printerlibrary.cmd.EscFactory;
import com.rt.printerlibrary.cmd.PinFactory;
import com.rt.printerlibrary.cmd.TscFactory;
import com.rt.printerlibrary.cmd.ZplFactory;
import com.rt.printerlibrary.connect.PrinterInterface;
import com.rt.printerlibrary.enumerate.BarcodeStringPosition;
import com.rt.printerlibrary.enumerate.BarcodeType;
import com.rt.printerlibrary.enumerate.CommonEnum;
import com.rt.printerlibrary.enumerate.ConnectStateEnum;
import com.rt.printerlibrary.enumerate.ESCBarcodeFontTypeEnum;
import com.rt.printerlibrary.enumerate.SettingEnum;
import com.rt.printerlibrary.exception.SdkException;
import com.rt.printerlibrary.factory.cmd.CmdFactory;
import com.rt.printerlibrary.factory.connect.BluetoothFactory;
import com.rt.printerlibrary.factory.connect.PIFactory;
import com.rt.printerlibrary.factory.connect.UsbFactory;
import com.rt.printerlibrary.factory.connect.WiFiFactory;
import com.rt.printerlibrary.factory.printer.LabelPrinterFactory;
import com.rt.printerlibrary.factory.printer.PinPrinterFactory;
import com.rt.printerlibrary.factory.printer.PrinterFactory;
import com.rt.printerlibrary.factory.printer.ThermalPrinterFactory;
import com.rt.printerlibrary.factory.printer.UniversalPrinterFactory;
import com.rt.printerlibrary.observer.PrinterObserver;
import com.rt.printerlibrary.observer.PrinterObserverManager;
import com.rt.printerlibrary.printer.RTPrinter;
import com.rt.printerlibrary.setting.BarcodeSetting;
import com.rt.printerlibrary.setting.CommonSetting;
import com.rt.printerlibrary.setting.TextSetting;
import com.rt.printerlibrary.utils.ConnectListener;
import com.rt.printerlibrary.utils.PrintListener;
import com.rt.printerlibrary.utils.PrintStatusCmd;
import com.rt.printerlibrary.utils.PrinterStatusPareseUtils;
import com.rt.printerlibrary.enumerate.BmpPrintMode;
import com.rt.printerlibrary.enumerate.CommonEnum;
import com.rt.printerlibrary.enumerate.PrintDirection;
import com.rt.printerlibrary.exception.SdkException;
import com.rt.printerlibrary.factory.cmd.CmdFactory;
import com.rt.printerlibrary.printer.RTPrinter;
import com.rt.printerlibrary.setting.BitmapSetting;
import com.rt.printerlibrary.setting.CommonSetting;
import com.rt.printerlibrary.utils.BitmapConvertUtil;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.nio.charset.StandardCharsets;
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;

import java.time.format.DateTimeFormatter;
import java.time.LocalDateTime;

public class InvoiceStyle extends AppCompatActivity implements View.OnClickListener, PrinterObserver {
    //权限申请
    private String[] NEED_PERMISSION = {
            Manifest.permission.CAMERA,
            Manifest.permission.ACCESS_COARSE_LOCATION,
            Manifest.permission.WRITE_EXTERNAL_STORAGE
    };
    private List<String> NO_PERMISSION = new ArrayList<String>();
    private static final int REQUEST_CAMERA = 0;
    private final int REQUEST_ENABLE_BT = 101;
    private TextView tv_ver;
    private RadioGroup rg_cmdtype;
    private FlowRadioGroup rg_connect;
    private Button btn_selftest_print, btn_txt_print, btn_img_print, btn_template_print, btn_barcode_print,
            btn_beep, btn_all_cut, btn_cash_box, btn_wifi_setting, btn_wifi_ipdhcp, btn_cmd_test, btn_label_setting,
            btn_print_status, btn_print_status2;
    private Button btn_disConnect, btn_connect;
    private TextView tv_device_selected;
    private Button btn_connected_list;
    private ProgressBar pb_connect;
    private Button btn_test;

    @SuppressLint("WrongConstant")
    @BaseEnum.ConnectType
    private int checkedConType = 3;
    private RTPrinter rtPrinter = null;
    private PrinterFactory printerFactory;
    private final String SP_KEY_IP = "ip";
    private final String SP_KEY_PORT = "port";
    private Object configObj;
    private ArrayList<PrinterInterface> printerInterfaceArrayList = new ArrayList<>();
    private PrinterInterface curPrinterInterface = null;
    private BroadcastReceiver broadcastReceiver;//USB Attach-Deattached Receiver
    private BluetoothAdapter mBluetoothAdapter;
    private int iprintTimes = 0;
    private String TAG = "MainActivity";
    private List<UsbDevice> mList;
    public UsbConfigBean usbconfigObj;
    private TextSetting textSetting;
    private String extraData = "hello";
    private Bitmap mBitmap, testing;
    //    private JSONArray productArray;
    private JSONObject invoiceInOf;
    private LocalDateTime currentDate;
    private static final DecimalFormat df = new DecimalFormat("0.00");

    private void CheckAllPermission() {
        NO_PERMISSION.clear();
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            for (int i = 0; i < NEED_PERMISSION.length; i++) {
                if (checkSelfPermission(NEED_PERMISSION[i]) != PackageManager.PERMISSION_GRANTED) {
                    NO_PERMISSION.add(NEED_PERMISSION[i]);
                }
            }
            if (NO_PERMISSION.size() == 0) {
                recordVideo();
            } else {
                requestPermissions(NO_PERMISSION.toArray(new String[NO_PERMISSION.size()]), REQUEST_CAMERA);
            }
        } else {
            recordVideo();
        }

    }

    private Handler handler = new Handler() {
        @Override
        public void handleMessage(Message msg) {
            switch (msg.what) {
                case 11:
                    // connectBluetoothByMac();
            }
        }
    };


    private void recordVideo() {
        Log.d("Invoice Style Screen ", "have permission");
        ;
    }

    @RequiresApi(api = Build.VERSION_CODES.O)
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        // getCurrentDate();
        String uri = getIntent().getStringExtra("uri");

        try {
            mBitmap = MediaStore.Images.Media.getBitmap(getContentResolver(), Uri.parse(uri));
            Log.d(TAG, "mBitmap: " + mBitmap);
        } catch (IOException e) {
            e.printStackTrace();
        }

        testing = textAsBitmap("اختبار اللغة العربية", 100, Color.BLACK);
        Log.d(TAG, "onCreatebitmap: " + testing);
        String proArry = getIntent().getStringExtra("arrays");
        String object = getIntent().getStringExtra("Object");
        //Log.d(TAG, "proArry: "+proArry);
//        try {
//            JSONArray jsonArr = new JSONArray(proArry);
//            productArray=jsonArr;
//
//        } catch (JSONException e) {
//            e.printStackTrace();
//        }
        try {
            JSONArray jsonObj = new JSONArray(object);
            invoiceInOf = jsonObj.getJSONObject(0);

        } catch (JSONException e) {
            e.printStackTrace();
        }
        //extraData= getIntent().getStringExtra("data");
        CheckAllPermission();
        init();
        //addListener();
        // mBluetoothAdapter = BluetoothAdapter.getDefaultAdapter();
    }


    @RequiresApi(api = Build.VERSION_CODES.O)
    public void getCurrentDate() {
        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");
        LocalDateTime now = LocalDateTime.now();
        currentDate = now;
    }

    @SuppressLint("WrongConstant")
    public void init() {

        //BaseApplication.instance.setCurrentCmdType(1);
        printerFactory = new ThermalPrinterFactory();
        rtPrinter = printerFactory.create();

        Log.d(TAG, "init printer: " + rtPrinter);

        // tv_ver.setText("PrinterExample Ver: v" + TonyUtils.getVersionName(this));
        PrinterObserverManager.getInstance().add(this);//Add connection status monitor

//        if (BaseApplication.getInstance().getCurrentCmdType() == 5) {
//            btn_barcode_print.setVisibility(View.GONE);
//        } else {
//            btn_barcode_print.setVisibility(View.VISIBLE);
//        }

        // btn_label_setting.setEnabled(true);//TODO
        connectBluetoothByMac();

    }

    public void addListener() {

        btn_selftest_print.setOnClickListener(this);
        btn_txt_print.setOnClickListener(this);
        btn_img_print.setOnClickListener(this);
        btn_connect.setOnClickListener(this);
        btn_disConnect.setOnClickListener(this);
        btn_template_print.setOnClickListener(this);
        tv_device_selected.setOnClickListener(this);
        btn_barcode_print.setOnClickListener(this);
        btn_connected_list.setOnClickListener(this);
        btn_cash_box.setOnClickListener(this);
        btn_all_cut.setOnClickListener(this);
        btn_beep.setOnClickListener(this);
        btn_wifi_setting.setOnClickListener(this);
        btn_wifi_ipdhcp.setOnClickListener(this);
        btn_cmd_test.setOnClickListener(this);
        btn_test.setOnClickListener(this);
        btn_label_setting.setOnClickListener(this);
        btn_print_status.setOnClickListener(this);
        btn_print_status2.setOnClickListener(this);


        radioButtonCheckListener();//single button listener

        rg_cmdtype.check(R.id.rb_cmd_esc);
        rg_connect.check(R.id.rb_connect_bluetooth);
    }

    private void radioButtonCheckListener() {
        rg_cmdtype.setOnCheckedChangeListener(new RadioGroup.OnCheckedChangeListener() {
            @SuppressLint("WrongConstant")
            @Override
            public void onCheckedChanged(RadioGroup radioGroup, @IdRes int i) {
                switch (i) {

                    case R.id.rb_cmd_esc://esc
                        //BaseApplication.instance.setCurrentCmdType(1);
                        printerFactory = new ThermalPrinterFactory();
                        rtPrinter = printerFactory.create();
                        rtPrinter.setPrinterInterface(curPrinterInterface);
                        btn_barcode_print.setVisibility(View.VISIBLE);
                        btn_label_setting.setVisibility(View.GONE);
                        break;


                }
                //  BaseApplication.getInstance().setRtPrinter(rtPrinter);
            }
        });

        rg_connect.setOnCheckedChangeListener(new RadioGroup.OnCheckedChangeListener() {
            @SuppressLint("WrongConstant")
            @Override
            public void onCheckedChanged(RadioGroup radioGroup, @IdRes int i) {
                doDisConnect();//有切换的话就断开
                switch (i) {
                    case R.id.rb_connect_wifi://WiFi
                        checkedConType = 3;
                        break;
                    case R.id.rb_connect_bluetooth://bluetooth
                        checkedConType = 1;
                        break;
//                    case R.id.rb_connect_bluetooth_ble://bluetooth_ble
////                        checkedConType = BaseEnum.CON_BLUETOOTH_BLE;
//                        break;
                    case R.id.rb_connect_usb://usb
                        checkedConType = 5;
                        break;
                    case R.id.rb_connect_com://串口-AP02
                        checkedConType = 4;
                        break;
                }
//                BaseApplication.getInstance().setCurrentConnectType(checkedConType);
            }
        });
    }

    @Override
    public void onClick(View view) {
        switch (view.getId()) {

            case R.id.btn_txt_print:
                try {
                    textPrint();
                } catch (UnsupportedEncodingException | JSONException e) {
                    e.printStackTrace();
                }
                break;
            case R.id.btn_img_print:

                try {
                    imagePrint();
                } catch (UnsupportedEncodingException | JSONException e) {
                    e.printStackTrace();
                }

                break;
            case R.id.btn_disConnect:

                Activity activity = InvoiceStyle.this;
                if (activity != null) {
                    activity.finish();
                }
                break;
            case R.id.btn_connect:
                doConnect();
                break;

            case R.id.tv_device_selected:
                showConnectDialog();
                break;

            case R.id.btn_connected_list://显示多连接
                showConnectedListDialog();
                break;


            case R.id.btn_test:
                testTsc();
                break;

            default:
                break;
        }
    }


    private CmdFactory getCmdFactory(@BaseEnum.CmdType int baseEnum) {
        CmdFactory cmdFactory = null;
        switch (baseEnum) {
            case 5:
                cmdFactory = new PinFactory();
                break;
            case 1:
                cmdFactory = new EscFactory();
                break;
            case 2:
                cmdFactory = new TscFactory();
                break;
            case 3:
                cmdFactory = new CpclFactory();
                break;
            case 4:
                cmdFactory = new ZplFactory();
                break;
            default:
                break;
        }
        return cmdFactory;
    }

    /**
     * turn to Label Setting[CPCL]
     */


    private void testTsc() {
        if (rtPrinter == null) {
            return;
        }
        TonyUtils.Tsc_InitLabelPrint(rtPrinter);
        String strPrintTxt = TonyUtils.printText("80", "80", "TSS24.BF2", "0", "1", "1", "Hello,容大!");
        String strPrint = TonyUtils.setPRINT("1", "1");

        try {
            rtPrinter.writeMsg(strPrintTxt.getBytes("GBK"));
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        rtPrinter.writeMsg(strPrint.getBytes());
    }

    private void initBroadcast() {
        broadcastReceiver = new BroadcastReceiver() {

            @SuppressLint("WrongConstant")
            @Override
            public void onReceive(Context context, Intent intent) {
                // TODO Auto-generated method stub
                String action = intent.getAction();
                if (UsbManager.ACTION_USB_DEVICE_DETACHED.equals(action)) {
                    //   ToastUtil.show(context,"接收到断开信息");
                    if (BaseApplication.getInstance().getCurrentConnectType() == 5) {
                        doDisConnect();//断开USB连接， Disconnect USB connection.
                    }
                }
                if (UsbManager.ACTION_USB_DEVICE_ATTACHED.equals(action)) {
                    //    ToastUtil.show(context,"插入USB");
                }
            }

        };

        IntentFilter intentFilter = new IntentFilter();
        intentFilter.addAction(UsbManager.ACTION_USB_DEVICE_ATTACHED);
        intentFilter.addAction(UsbManager.ACTION_USB_ACCESSORY_ATTACHED);
        intentFilter.addAction(UsbManager.ACTION_USB_DEVICE_DETACHED);
        registerReceiver(broadcastReceiver, intentFilter);
    }


    /**
     * 显示已连接设备窗口
     */
    private void showConnectedListDialog() {
        AlertDialog.Builder dialog = new AlertDialog.Builder(this);
        dialog.setTitle(R.string.dialog_title_connected_devlist);
        String[] devList = new String[printerInterfaceArrayList.size()];
        for (int i = 0; i < devList.length; i++) {
            devList[i] = printerInterfaceArrayList.get(i).getConfigObject().toString();
        }
        if (devList.length > 0) {
            dialog.setItems(devList, new DialogInterface.OnClickListener() {
                @Override
                public void onClick(DialogInterface dialogInterface, int i) {
                    PrinterInterface printerInter = printerInterfaceArrayList.get(i);
                    tv_device_selected.setText(printerInter.getConfigObject().toString());
                    rtPrinter.setPrinterInterface(printerInter);//设置连接方式 Connection port settings
                    tv_device_selected.setTag(1);
                    curPrinterInterface = printerInter;
                    //  BaseApplication.getInstance().setRtPrinter(rtPrinter);//设置全局RTPrinter
                    if (printerInter.getConnectState() == ConnectStateEnum.Connected) {
                        setPrintEnable(true);
                    } else {
                        setPrintEnable(false);
                    }
                }
            });
        } else {
            dialog.setMessage(R.string.pls_connect_printer_first);
        }
        dialog.setNegativeButton(R.string.dialog_cancel, null);
        dialog.show();
    }

    @SuppressLint("WrongConstant")
    private void doConnect() {
        // configObj = new BluetoothEdrConfigBean("DC:0D:30:A7:8E:F2");
        tv_device_selected.setTag(1);
        isConfigPrintEnable(configObj);
        switch (1) {

            case 1:
                TimeRecordUtils.record("RT连接start：", System.currentTimeMillis());
                BluetoothEdrConfigBean bluetoothEdrConfigBean = (BluetoothEdrConfigBean) configObj;
                iprintTimes = 0;
                Log.d(TAG, "doConnect: " + bluetoothEdrConfigBean);
                connectBluetooth(bluetoothEdrConfigBean);
                // connectBluetoothByMac();

                break;

            default:

                break;
        }

    }

    private void connectBluetoothByMac() {
        ProgressDialog pd = new ProgressDialog(InvoiceStyle.this);
        pd.setMessage("Invoice printing...");
        pd.show();
        // ToastUtil.show(InvoiceStyle.this, "Printer Not Connected");
        String str = null;
        try {
            str = invoiceInOf.get("printerMacAddress").toString();
        } catch (JSONException e) {
            e.printStackTrace();
        }
        BluetoothDevice device = BluetoothAdapter.getDefaultAdapter().getRemoteDevice(str);//直接连接蓝牙mac 地址 00:00:0E:01:D0:32
        BluetoothEdrConfigBean bluetoothEdrConfigBean = new BluetoothEdrConfigBean(device);
        PIFactory piFactory = new BluetoothFactory();
        PrinterInterface printerInterface = piFactory.create();
        printerInterface.setConfigObject(bluetoothEdrConfigBean);
        rtPrinter.setPrinterInterface(printerInterface);
        rtPrinter.setConnectListener(new ConnectListener() { //必须在connect之后，设置监听
            @Override
            public void onPrinterConnected(Object configObj) {
                Log.d(TAG, "onPrinterConnected: printer connected");
                try {
                    pd.dismiss();
                    textPrint();
                } catch (UnsupportedEncodingException | JSONException e) {
                    //  showToast("print status：");
                    pd.dismiss();

                    Activity activity = InvoiceStyle.this;

                    if (activity != null) {
                        // ToastUtil.show(activity, "Printer Not Connected");
                        activity.finish();
                    }
                    e.printStackTrace();
                }
                iprintTimes++;
            }

            @Override
            public void onPrinterDisconnect(Object configObj) {
                if (iprintTimes < 5) {
                    // ToastUtil.show(InvoiceStyle.this, "Printer Not Connected");
                    new Thread(new Runnable() {
                        @Override
                        public void run() {
                            Message message = new Message();
                            message.what = 11;
                            handler.sendMessage(message);
                        }
                    }).start();
                    pd.dismiss();

                    Activity activity = InvoiceStyle.this;

                    if (activity != null) {

                        activity.finish();
                    }
                }
            }

            @Override
            public void onPrinterWritecompletion(Object configObj) { //写入完成时,断开,要改为收到打印完成状态
                try {
                    Thread.sleep(500);//根据打印内容的长短，来设置 Set according to the length of the printed content
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
                rtPrinter.disConnect();
            }
        });
        try {
            rtPrinter.connect(bluetoothEdrConfigBean);
//            rtPrinter.setPrintListener(new PrintListener() {
//                @Override
//                public void onPrinterStatus(PrinterStatusBean StatusBean) {
//                    if (StatusBean.printStatusCmd == PrintStatusCmd.cmd_PrintFinish)
//                    {
//                        rtPrinter.disConnect();
//                        if (StatusBean.blPrintSucc) {
//                           // Log.e("printok","printok");
//                        }
//                    }
//
//
//                }
//            });
        } catch (Exception e) {
            e.printStackTrace();
        }


    }


    private void connectBluetooth(BluetoothEdrConfigBean bluetoothEdrConfigBean) {
        PIFactory piFactory = new BluetoothFactory();
        PrinterInterface printerInterface = piFactory.create();
        printerInterface.setConfigObject(bluetoothEdrConfigBean);
        rtPrinter.setPrinterInterface(printerInterface);
        try {
            Log.d(TAG, "connectBluetooth try: " + rtPrinter);
            rtPrinter.connect(bluetoothEdrConfigBean);
            Log.d(TAG, "connectBluetooth: after connect " + rtPrinter);
        } catch (Exception e) {
            Log.d(TAG, "connectBluetooth catch: " + bluetoothEdrConfigBean);
            e.printStackTrace();
            // Log.e("mao",e.getMessage());
        } finally {

        }
    }


    private void doDisConnect() {

        if (Integer.parseInt(tv_device_selected.getTag().toString()) == -1) {//未选择设备
//            showAlertDialog(getString(R.string.main_discon_click_repeatedly));
            return;
        }

        if (rtPrinter != null && rtPrinter.getPrinterInterface() != null) {
            rtPrinter.disConnect();
            // DisconnectByATDISC();
        }
        tv_device_selected.setText(getString(R.string.please_connect));
        tv_device_selected.setTag(-1);
        setPrintEnable(false);
    }

    @SuppressLint("WrongConstant")
    private void showConnectDialog() {
        switch (checkedConType) {

            case 1:

                if (!BluetoothAdapter.getDefaultAdapter().isEnabled()) { //蓝牙未开启，则开启蓝牙
                    Intent enableIntent = new Intent(BluetoothAdapter.ACTION_REQUEST_ENABLE);
                    if (ActivityCompat.checkSelfPermission(this, Manifest.permission.BLUETOOTH_CONNECT) != PackageManager.PERMISSION_GRANTED) {
                        // TODO: Consider calling
                        //    ActivityCompat#requestPermissions
                        // here to request the missing permissions, and then overriding
                        //   public void onRequestPermissionsResult(int requestCode, String[] permissions,
                        //                                          int[] grantResults)
                        // to handle the case where the user grants the permission. See the documentation
                        // for ActivityCompat#requestPermissions for more details.
                        return;
                    }
                    startActivityForResult(enableIntent, REQUEST_ENABLE_BT);
                } else {
                    showBluetoothDeviceChooseDialog();
                }
                break;
            default:
                break;
        }
    }

    private void imagePrint() throws UnsupportedEncodingException, JSONException {
        // escPrint("moty printer chal gaya hai :)");
    }

    public void textPrint() throws UnsupportedEncodingException, JSONException {
        escPrintAb();
//        if(String.valueOf(invoiceInOf.get("ar")).equals("ar")){
//            Log.d(TAG, "textPrint: AR ");
//
//        escPrintAb();
//        }else{
//            Log.d(TAG, "textPrint: En ");
//            escPrint();
//        }
    }

    public Bitmap textAsBitmap(String text, float textSize, int textColor) {
        Paint paint = new Paint(Paint.ANTI_ALIAS_FLAG);
        paint.setTextSize(textSize);
        paint.setColor(textColor);
        paint.setTextAlign(Paint.Align.LEFT);
        float baseline = -paint.ascent(); // ascent() is negative
        int width = (int) (paint.measureText(text) + 0.5f); // round
        int height = (int) (baseline + paint.descent() + 0.5f);
        Bitmap image = Bitmap.createBitmap(width, height, Bitmap.Config.ARGB_8888);
        Canvas canvas = new Canvas(image);
        canvas.drawText(text, 0, baseline, paint);
        return image;
    }

    public Bitmap StringToBitMap(String encodedString) {


        try {
            //byte [] encodeByte = encodedString.getBytes(StandardCharsets.UTF_8);
            byte[] encodeByte = Base64.decode(encodedString, Base64.DEFAULT);
            Log.d(TAG, "encodedString: " + encodeByte.length);
            Bitmap bitmap = BitmapFactory.decodeByteArray(encodeByte, 0, encodeByte.length);
            return bitmap;
        } catch (Exception e) {
            e.getMessage();
            return null;
        }
    }

    private void escPrint() throws UnsupportedEncodingException, JSONException {


        textSetting = new TextSetting();
        // textSetting.setIsEscSmallCharactor(SettingEnum.Enable);
        // textSetting.setAlign(CommonEnum.ALIGN_LEFT);
        if (rtPrinter != null) {
            EscFactory escFac = new EscFactory();
            EscCmd escCmd = escFac.create();
            escCmd.append(escCmd.getHeaderCmd());//初始化, Initial
            //    escCmd.append(((EscCmd)escCmd).getPageMode(true));//设置为页模式
            //    escCmd.append(((EscCmd)escCmd).getPageArea(10,10,200,200));//Print area set to page mode
            //      escCmd.append(((EscCmd)escCmd).getSetLeftStartSpacing(10*8));//左边留白 Leave white on the left(Unit: Point 1mm=8 points)
//            escCmd.append(((EscCmd)escCmd).getSetAreaWidth(76*8));//设置打印区域Set the print area (Unit: Point 1mm=8 points)
//            escCmd.append(((EscCmd)escCmd).getSetAreaWidth(104*8));//TODO  by FZP 由于下位机对于新版本RP410c的打印区域算法会溢出，所以针对此机型先屏蔽处理
            escCmd.setChartsetName("UTF-8");

            //company logo

            //inovice Type
            textSetting.setAlign(CommonEnum.ALIGN_MIDDLE);//Alignment - left, center, right
            textSetting.setBold(SettingEnum.Disable);//bold
            textSetting.setUnderline(SettingEnum.Disable);//underscore
            textSetting.setIsAntiWhite(SettingEnum.Disable);//Anti-White
            textSetting.setDoubleHeight(SettingEnum.Disable);//double high
            textSetting.setDoubleWidth(SettingEnum.Disable);//double width
            textSetting.setItalic(SettingEnum.Disable);//Italics
            escCmd.append(escCmd.getTextCmd(textSetting, String.valueOf(invoiceInOf.get("invoiceType"))));
            escCmd.append(escCmd.getLFCRCmd());
            //headers
            textSetting.setAlign(CommonEnum.ALIGN_MIDDLE);//Alignment - left, center, right
            textSetting.setBold(SettingEnum.Disable);//bold
            textSetting.setUnderline(SettingEnum.Disable);//underscore
            textSetting.setIsAntiWhite(SettingEnum.Disable);//Anti-White
            textSetting.setDoubleHeight(SettingEnum.Disable);//double high
            textSetting.setDoubleWidth(SettingEnum.Disable);//double width
            textSetting.setItalic(SettingEnum.Disable);//Italics
            if (!String.valueOf(invoiceInOf.get("Heading1")).isEmpty()) {
                escCmd.append(escCmd.getTextCmd(textSetting, String.valueOf(invoiceInOf.get("Heading1"))));
                escCmd.append(escCmd.getLFCRCmd());
            }
            if (!String.valueOf(invoiceInOf.get("Heading2")).isEmpty()) {
                escCmd.append(escCmd.getTextCmd(textSetting, String.valueOf(invoiceInOf.get("Heading1"))));
                escCmd.append(escCmd.getLFCRCmd());
            }
            if (!String.valueOf(invoiceInOf.get("Heading3")).isEmpty()) {
                escCmd.append(escCmd.getTextCmd(textSetting, String.valueOf(invoiceInOf.get("Heading1"))));
                escCmd.append(escCmd.getLFCRCmd());
            }
            if (!String.valueOf(invoiceInOf.get("Heading4")).isEmpty()) {
                escCmd.append(escCmd.getTextCmd(textSetting, String.valueOf(invoiceInOf.get("Heading1"))));
                escCmd.append(escCmd.getLFCRCmd());
            }
            // company Name
            textSetting.setAlign(CommonEnum.ALIGN_MIDDLE);//Alignment - left, center, right
            textSetting.setBold(SettingEnum.Enable);//bold
            textSetting.setUnderline(SettingEnum.Disable);//underscore
            textSetting.setIsAntiWhite(SettingEnum.Disable);//Anti-White
            textSetting.setDoubleHeight(SettingEnum.Disable);//double high
            textSetting.setDoubleWidth(SettingEnum.Disable);//double width
            textSetting.setItalic(SettingEnum.Disable);//Italics
            escCmd.append(escCmd.getTextCmd(textSetting, String.valueOf(invoiceInOf.get("CompanyName"))));
            escCmd.append(escCmd.getLFCRCmd());

            // current Date Time
            textSetting.setAlign(CommonEnum.ALIGN_MIDDLE);//Alignment - left, center, right
            textSetting.setBold(SettingEnum.Enable);//bold
            textSetting.setUnderline(SettingEnum.Disable);//underscore
            textSetting.setIsAntiWhite(SettingEnum.Disable);//Anti-White
            textSetting.setDoubleHeight(SettingEnum.Disable);//double high
            textSetting.setDoubleWidth(SettingEnum.Enable);//double width
            textSetting.setItalic(SettingEnum.Disable);//Italics
            escCmd.append(escCmd.getTextCmd(textSetting, String.valueOf(invoiceInOf.get("currentDate"))));
            escCmd.append(escCmd.getLFCRCmd());
            // Divider line
            String line = "************************************************"; //48
            textSetting.setDoubleWidth(SettingEnum.Disable);//double width
            textSetting.setBold(SettingEnum.Enable);
            escCmd.append(escCmd.getTextCmd(textSetting, line));
            escCmd.append(escCmd.getLFCRCmd());

            // tag
            textSetting.setAlign(CommonEnum.ALIGN_LEFT);//Alignment - left, center, right
            textSetting.setBold(SettingEnum.Enable);//bold
            textSetting.setUnderline(SettingEnum.Disable);//underscore
            textSetting.setIsAntiWhite(SettingEnum.Disable);//Anti-White
            textSetting.setDoubleHeight(SettingEnum.Disable);//double high
            textSetting.setDoubleWidth(SettingEnum.Enable);//double width
            textSetting.setItalic(SettingEnum.Disable);//Italics
            escCmd.append(escCmd.getTextCmd(textSetting, String.valueOf(invoiceInOf.get("tagNo"))));
            escCmd.append(escCmd.getLFCRCmd());
            escCmd.append(escCmd.getLFCRCmd());

//           // Company VAT
            textSetting.setAlign(CommonEnum.ALIGN_MIDDLE);//Alignment - left, center, right
            textSetting.setBold(SettingEnum.Enable);//bolds
            textSetting.setUnderline(SettingEnum.Disable);//underscore
            textSetting.setIsAntiWhite(SettingEnum.Disable);//Anti-White
            textSetting.setDoubleHeight(SettingEnum.Disable);//double high
            textSetting.setDoubleWidth(SettingEnum.Enable);//double width
            textSetting.setItalic(SettingEnum.Disable);//Italics
            escCmd.append(escCmd.getTextCmd(textSetting, String.valueOf(invoiceInOf.get("companyVAT"))));
            escCmd.append(escCmd.getLFCRCmd());
//
            // barcode
            BarcodeSetting barcodeSetting = new BarcodeSetting();
            barcodeSetting.setBarcodeStringPosition(BarcodeStringPosition.BELOW_BARCODE);
            barcodeSetting.setHeightInDot(72);//accept value:1~255
            barcodeSetting.setBarcodeWidth(3);//accept value:2~6
            barcodeSetting.setQrcodeDotSize(5);//accept value: Esc(1~15), Tsc(1~10)
            barcodeSetting.setEscBarcodFont(ESCBarcodeFontTypeEnum.BARFONT_B_9x17);
            try {
                escCmd.append(escCmd.getBarcodeCmd(BarcodeType.valueOf("CODE128"), barcodeSetting, String.valueOf(invoiceInOf.get("invoiceNumber"))));
            } catch (SdkException e) {
                e.printStackTrace();
            }
//
            escCmd.append(escCmd.getLFCRCmd());

            // invoice Number
            textSetting.setAlign(CommonEnum.ALIGN_MIDDLE);//Alignment - left, center, right
            textSetting.setBold(SettingEnum.Enable);//bold
            textSetting.setUnderline(SettingEnum.Disable);//underscore
            textSetting.setIsAntiWhite(SettingEnum.Disable);//Anti-White
            textSetting.setDoubleHeight(SettingEnum.Disable);//double high
            textSetting.setDoubleWidth(SettingEnum.Enable);//double width
            textSetting.setItalic(SettingEnum.Disable);//Italics
            escCmd.append(escCmd.getTextCmd(textSetting, String.valueOf(invoiceInOf.get("invoiceNumber"))));

            escCmd.append(escCmd.getLFCRCmd());


            CommonSetting commonSetting = new CommonSetting();
            BitmapSetting bitmapSetting = new BitmapSetting();
            //  Position txtposition = new Position(0, 0);
            //  textSetting.setTxtPrintPosition(txtposition);//If the offset of the X value is not set, do not call

            // commonSetting.setEscLineSpacing(10);

            // escCmd.append(escCmd.getCommonSettingCmd(commonSetting));
            //  escCmd.append(escCmd.getLFCRCmd());


            //products
            textSetting.setAlign(CommonEnum.ALIGN_LEFT);//Alignment - left, center, right
            textSetting.setBold(SettingEnum.Enable);//bold
            textSetting.setUnderline(SettingEnum.Disable);//underscore
            textSetting.setIsAntiWhite(SettingEnum.Disable);//Anti-White
            textSetting.setDoubleHeight(SettingEnum.Disable);//double high
            textSetting.setDoubleWidth(SettingEnum.Disable);//double width
            textSetting.setItalic(SettingEnum.Disable);//Italics
            //escCmd.append(((EscCmd)escCmd).getPageMode(true));
            //escCmd.append(((EscCmd)escCmd).getPageArea(100,50,50,100));

            escCmd.append(escCmd.getTextCmd(textSetting, String.format("%3.20s", "Product Name" + "                    ")));
            escCmd.append(escCmd.getTextCmd(textSetting, "   " + String.format("%3.6s", "Price" + "     ")));
            escCmd.append(escCmd.getTextCmd(textSetting, "   " + String.format("%3.4s", "Qty" + "     ")));
            escCmd.append(escCmd.getTextCmd(textSetting, "   " + "GAmount"));
            escCmd.append(escCmd.getLFCRCmd());
            escCmd.append(escCmd.getLFCRCmd());
//            for(int i=0; i<productArray.length();i++){
//                JSONObject jsonObj = productArray.getJSONObject(i);
//
//            escCmd.append(escCmd.getTextCmd(textSetting, String.format("%3.20s",jsonObj.get("ProductName")+"                    ")));
//                escCmd.append(escCmd.getTextCmd(textSetting, "   "+String.format("%3.6s",df.format(jsonObj.get("PriceOriginal"))+"     ")));
//                escCmd.append(escCmd.getTextCmd(textSetting, "   "+String.format("%3.4s",jsonObj.get("Quantity")+"     ")));
//                escCmd.append(escCmd.getTextCmd(textSetting, "   "+df.format(jsonObj.get("GrandAmount"))));
////                if(!String.valueOf(jsonObj.get("IngredientNames")).isEmpty()){
////                    escCmd.append(escCmd.getLFCRCmd());
////                    escCmd.append(escCmd.getTextCmd(textSetting, ""+df.format(jsonObj.get("IngredientNames"))));
////                }
//                escCmd.append(escCmd.getLFCRCmd());
//            }

            // escCmd.append(((EscCmd)escCmd).getPageMode(false));

            // Divider line
            textSetting.setAlign(CommonEnum.ALIGN_MIDDLE);//Alignment - left, center, right
            textSetting.setDoubleWidth(SettingEnum.Disable);//double width
            textSetting.setBold(SettingEnum.Enable);
            escCmd.append(escCmd.getTextCmd(textSetting, line));
            escCmd.append(escCmd.getLFCRCmd());
            escCmd.append(escCmd.getLFCRCmd());

            // calculation

            String blank = "                         ";
            textSetting.setAlign(CommonEnum.ALIGN_LEFT);//Alignment - left, center, right
            textSetting.setBold(SettingEnum.Disable);//bold
            textSetting.setUnderline(SettingEnum.Disable);//underscore
            textSetting.setIsAntiWhite(SettingEnum.Disable);//Anti-White
            textSetting.setDoubleHeight(SettingEnum.Disable);//double high
            textSetting.setDoubleWidth(SettingEnum.Disable);//double width
            textSetting.setItalic(SettingEnum.Disable);//Italics
            escCmd.append(escCmd.getTextCmd(textSetting, "Sub Amount" + "                          " + invoiceInOf.get("subPriceSpce") + invoiceInOf.get("subPrice"))); //36
            escCmd.append(escCmd.getLFCRCmd());
            escCmd.append(escCmd.getTextCmd(textSetting, "Tax" + "                                 " + invoiceInOf.get("taxSpace") + invoiceInOf.get("totalTax")));
            escCmd.append(escCmd.getLFCRCmd());
            escCmd.append(escCmd.getTextCmd(textSetting, "Discount" + "                            " + invoiceInOf.get("discountSpace") + invoiceInOf.get("totalDiscount")));
            escCmd.append(escCmd.getLFCRCmd());
            textSetting.setBold(SettingEnum.Enable);//bold
            escCmd.append(escCmd.getTextCmd(textSetting, "Total Price" + "                         " + invoiceInOf.get("totalPrice")));
            escCmd.append(escCmd.getLFCRCmd());
            escCmd.append(escCmd.getLFCRCmd());
            //divider
            textSetting.setAlign(CommonEnum.ALIGN_MIDDLE);//Alignment - left, center, right
            textSetting.setDoubleWidth(SettingEnum.Disable);//double width
            textSetting.setBold(SettingEnum.Enable);
            escCmd.append(escCmd.getTextCmd(textSetting, line));
            escCmd.append(escCmd.getLFCRCmd());
            escCmd.append(escCmd.getLFCRCmd());

            //Terminal info
            textSetting.setAlign(CommonEnum.ALIGN_LEFT);//Alignment - left, center, right
            textSetting.setBold(SettingEnum.Disable);//bold
            textSetting.setUnderline(SettingEnum.Disable);//underscore
            textSetting.setIsAntiWhite(SettingEnum.Disable);//Anti-White
            textSetting.setDoubleHeight(SettingEnum.Disable);//double high
            textSetting.setDoubleWidth(SettingEnum.Disable);//double width
            textSetting.setItalic(SettingEnum.Disable);//Italics
            escCmd.append(escCmd.getTextCmd(textSetting, "Sale type" + "        " + "Sale Agent" + "       " + "Terminal"));
            escCmd.append(escCmd.getLFCRCmd());
            escCmd.append(escCmd.getTextCmd(textSetting, String.format("%3.17s", invoiceInOf.get("paymentType") + "                ")));
            escCmd.append(escCmd.getTextCmd(textSetting, String.format("%3.17s", invoiceInOf.get("salesmanName") + "                  ")));
            escCmd.append(escCmd.getTextCmd(textSetting, String.format("%3.16s", invoiceInOf.get("TerminalCode") + " ")));
            escCmd.append(escCmd.getLFCRCmd());
            escCmd.append(escCmd.getLFCRCmd());
            //divider
            textSetting.setAlign(CommonEnum.ALIGN_MIDDLE);//Alignment - left, center, right
            textSetting.setDoubleWidth(SettingEnum.Disable);//double width
            textSetting.setBold(SettingEnum.Enable);
            escCmd.append(escCmd.getTextCmd(textSetting, line));
            escCmd.append(escCmd.getLFCRCmd());


            //Buyer info
            if (invoiceInOf.get("isBuyer").equals("true")) {

                textSetting.setAlign(CommonEnum.ALIGN_LEFT);//Alignment - left, center, right
                textSetting.setBold(SettingEnum.Enable);//bold
                textSetting.setUnderline(SettingEnum.Disable);//underscore
                textSetting.setIsAntiWhite(SettingEnum.Disable);//Anti-White
                textSetting.setDoubleHeight(SettingEnum.Disable);//double high
                textSetting.setDoubleWidth(SettingEnum.Disable);//double width
                textSetting.setItalic(SettingEnum.Disable);//Italics
                escCmd.append(escCmd.getTextCmd(textSetting, "Buyer Info:-"));
                escCmd.append(escCmd.getLFCRCmd());

                escCmd.append(escCmd.getTextCmd(textSetting, "Name" + "        " + "Code" + "       " + "Phone"));
                escCmd.append(escCmd.getLFCRCmd());
                textSetting.setBold(SettingEnum.Disable);//bold
                escCmd.append(escCmd.getTextCmd(textSetting, String.format("%3.17s", invoiceInOf.get("BuyerName") + "                ")));
                escCmd.append(escCmd.getTextCmd(textSetting, String.format("%3.17s", invoiceInOf.get("BuyerCode") + "                  ")));
                escCmd.append(escCmd.getTextCmd(textSetting, String.format("%3.20s", invoiceInOf.get("PrimaryPhone") + " ")));
                escCmd.append(escCmd.getLFCRCmd());
                textSetting.setBold(SettingEnum.Enable);//bold
                escCmd.append(escCmd.getTextCmd(textSetting, "VAT ID" + "        " + "CCRNumber"));
                escCmd.append(escCmd.getLFCRCmd());
                textSetting.setBold(SettingEnum.Disable);//bold
                escCmd.append(escCmd.getTextCmd(textSetting, String.format("%3.17s", invoiceInOf.get("ValueAddedTaxNumber") + "                ")));
                escCmd.append(escCmd.getTextCmd(textSetting, String.format("%3.17s", invoiceInOf.get("CCRNumber") + "                  ")));
                escCmd.append(escCmd.getLFCRCmd());
                textSetting.setBold(SettingEnum.Enable);//bold
                escCmd.append(escCmd.getTextCmd(textSetting, "Address"));
                escCmd.append(escCmd.getLFCRCmd());
                textSetting.setBold(SettingEnum.Disable);//bold
                escCmd.append(escCmd.getTextCmd(textSetting, String.format("%3.88s", invoiceInOf.get("BuyerAddress") + "                ")));

                escCmd.append(escCmd.getLFCRCmd());
                escCmd.append(escCmd.getLFCRCmd());
                //divider
                textSetting.setAlign(CommonEnum.ALIGN_MIDDLE);//Alignment - left, center, right
                textSetting.setDoubleWidth(SettingEnum.Disable);//double width
                textSetting.setBold(SettingEnum.Enable);
                escCmd.append(escCmd.getTextCmd(textSetting, line));
                escCmd.append(escCmd.getLFCRCmd());
                escCmd.append(escCmd.getLFCRCmd());
            }

            //QR code
            commonSetting.setAlign(CommonEnum.ALIGN_MIDDLE);
            escCmd.append(escCmd.getCommonSettingCmd(commonSetting));
            bitmapSetting.setBmpPrintMode(BmpPrintMode.MODE_SINGLE_COLOR);
            bitmapSetting.setBimtapLimitWidth(8 * 8 * 8);
            escCmd.append(escCmd.getBitmapCmd(bitmapSetting, mBitmap));


            //以下为设置X轴的函数的测试
            //注意如果txtposition.x>0,会和居中，对齐，冲突，不能共用
//            txtposition.x = 160;//往右偏移160*0.125=20mm,txtposition.y目前没有用
//          textSetting.setTxtPrintPosition(txtposition); //也可以用getSetXPosition来代替 escCmd.append(((EscCmd)escCmd).getSetXPosition(160));
//            escCmd.append(escCmd.getTextCmd(textSetting, printStr));
//            escCmd.append(escCmd.getLFCRCmd());
            //   escCmd.append(((EscCmd)escCmd).getPageEnd(true));
            escCmd.append(escCmd.getLFCRCmd());
            escCmd.append(escCmd.getLFCRCmd());
            escCmd.append(escCmd.getLFCRCmd());
            escCmd.append(escCmd.getHeaderCmd());//初始化, Initial
            escCmd.append(escCmd.getLFCRCmd());
            rtPrinter.writeMsgAsync(escCmd.getAppendCmds());

            /*************for RPP02N  call back status  状态改为主动上报  Change status to active reporting********************/

            rtPrinter.setPrintListener(new PrintListener() {
                @Override
                public void onPrinterStatus(PrinterStatusBean StatusBean) {
                    String msg = FuncUtils.PrinterStatusToStr(StatusBean);
                    if (!msg.isEmpty())
                        ToastUtil.show(InvoiceStyle.this, "print status：" + msg);

                }
            });

            /**************************************************************************************/

//            String stcCmds = "AT+DISC\r\n";
//            escCmd.clear();
//            byte[] bytes = stcCmds.getBytes();
//            escCmd.append(bytes);
//            rtPrinter.writeMsgAsync(escCmd.getAppendCmds());
            //DisconnectByATDISC();
        } else {

            Log.d(TAG, "escPrint: no printer found");
        }
        Activity activity = InvoiceStyle.this;
        if (activity != null) {
            activity.finish();
        }

    }

    private void escPrintAb() throws UnsupportedEncodingException, JSONException {


        textSetting = new TextSetting();
        // textSetting.setIsEscSmallCharactor(SettingEnum.Enable);
        // textSetting.setAlign(CommonEnum.ALIGN_LEFT);
        if (rtPrinter != null) {
            EscFactory escFac = new EscFactory();
            CommonSetting commonSetting = new CommonSetting();
            BitmapSetting bitmapSetting = new BitmapSetting();
            EscCmd escCmd = escFac.create();
            escCmd.append(escCmd.getHeaderCmd());//初始化, Initial
            //    escCmd.append(((EscCmd)escCmd).getPageMode(true));//设置为页模式
            //    escCmd.append(((EscCmd)escCmd).getPageArea(10,10,200,200));//Print area set to page mode
            //      escCmd.append(((EscCmd)escCmd).getSetLeftStartSpacing(10*8));//左边留白 Leave white on the left(Unit: Point 1mm=8 points)
//            escCmd.append(((EscCmd)escCmd).getSetAreaWidth(76*8));//设置打印区域Set the print area (Unit: Point 1mm=8 points)
//            escCmd.append(((EscCmd)escCmd).getSetAreaWidth(104*8));//TODO  by FZP 由于下位机对于新版本RP410c的打印区域算法会溢出，所以针对此机型先屏蔽处理
            // escCmd.setChartsetName("UTF-16");
            // current Date Time
//            textSetting.setAlign(CommonEnum.ALIGN_MIDDLE);//Alignment - left, center, right
//            textSetting.setBold(SettingEnum.Enable);//bold
//            textSetting.setUnderline(SettingEnum.Disable);//underscore
//            textSetting.setIsAntiWhite(SettingEnum.Disable);//Anti-White
//            textSetting.setDoubleHeight(SettingEnum.Disable);//double high
//            textSetting.setDoubleWidth(SettingEnum.Enable);//double width
//            textSetting.setItalic(SettingEnum.Disable);//Italics
//            escCmd.append(escCmd.getTextCmd(textSetting , String.valueOf(invoiceInOf.get("currentDate"))));
//            escCmd.append(escCmd.getLFCRCmd());
            // Divider line
            String line = "************************************************"; //48
//            textSetting.setDoubleWidth(SettingEnum.Disable);//double width
//            textSetting.setBold(SettingEnum.Enable);
//            escCmd.append(escCmd.getTextCmd(textSetting, line));
//            escCmd.append(escCmd.getLFCRCmd());

            // tag
//            textSetting.setAlign(CommonEnum.ALIGN_LEFT);//Alignment - left, center, right
//            textSetting.setBold(SettingEnum.Enable);//bold
//            textSetting.setUnderline(SettingEnum.Disable);//underscore
//            textSetting.setIsAntiWhite(SettingEnum.Disable);//Anti-White
//            textSetting.setDoubleHeight(SettingEnum.Disable);//double high
//            textSetting.setDoubleWidth(SettingEnum.Enable);//double width
//            textSetting.setItalic(SettingEnum.Disable);//Italics
//            escCmd.append(escCmd.getTextCmd(textSetting, String.valueOf(invoiceInOf.get("tagNo"))));
//            escCmd.append(escCmd.getLFCRCmd());
//            escCmd.append(escCmd.getLFCRCmd());

//            // invoice Number
//            textSetting.setAlign(CommonEnum.ALIGN_MIDDLE);//Alignment - left, center, right
//            textSetting.setBold(SettingEnum.Enable);//bold
//            textSetting.setUnderline(SettingEnum.Disable);//underscore
//            textSetting.setIsAntiWhite(SettingEnum.Disable);//Anti-White
//            textSetting.setDoubleHeight(SettingEnum.Disable);//double high
//            textSetting.setDoubleWidth(SettingEnum.Enable);//double width
//            textSetting.setItalic(SettingEnum.Disable);//Italics
//            escCmd.append(escCmd.getTextCmd(textSetting, String.valueOf(invoiceInOf.get("invoiceNumber"))));
//
//            escCmd.append(escCmd.getLFCRCmd());
//
//            // barcode
//            BarcodeSetting barcodeSetting = new BarcodeSetting();
//            barcodeSetting.setBarcodeStringPosition(BarcodeStringPosition.BELOW_BARCODE);
//            barcodeSetting.setHeightInDot(72);//accept value:1~255
//            barcodeSetting.setBarcodeWidth(3);//accept value:2~6
//            barcodeSetting.setQrcodeDotSize(5);//accept value: Esc(1~15), Tsc(1~10)
//            barcodeSetting.setEscBarcodFont(ESCBarcodeFontTypeEnum.BARFONT_B_9x17);
//            try {
//                escCmd.append(escCmd.getBarcodeCmd(BarcodeType.valueOf("CODE128"), barcodeSetting,String.valueOf( invoiceInOf.get("invoiceNumber"))));
//            } catch (SdkException e) {
//                e.printStackTrace();
//            }
////
//            escCmd.append(escCmd.getLFCRCmd());


            //  Position txtposition = new Position(0, 0);
            //  textSetting.setTxtPrintPosition(txtposition);//If the offset of the X value is not set, do not call

            // commonSetting.setEscLineSpacing(10);

            // escCmd.append(escCmd.getCommonSettingCmd(commonSetting));
            //  escCmd.append(escCmd.getLFCRCmd());


            //products
//            textSetting.setAlign(CommonEnum.ALIGN_LEFT);//Alignment - left, center, right
//            textSetting.setBold(SettingEnum.Enable);//bold
//            textSetting.setUnderline(SettingEnum.Disable);//underscore
//            textSetting.setIsAntiWhite(SettingEnum.Disable);//Anti-White
//            textSetting.setDoubleHeight(SettingEnum.Disable);//double high
//            textSetting.setDoubleWidth(SettingEnum.Disable);//double width
//            textSetting.setItalic(SettingEnum.Disable);//Italics
//            //escCmd.append(((EscCmd)escCmd).getPageMode(true));
//            //escCmd.append(((EscCmd)escCmd).getPageArea(100,50,50,100));
//
//
//
//
//                escCmd.append(escCmd.getTextCmd(textSetting,"مجموع"));
//            escCmd.append(escCmd.getTextCmd(textSetting, "   "+String.format("%3.4s", "الكمية"+"     ")));
//            escCmd.append(escCmd.getTextCmd(textSetting, "   "+String.format("%3.6s", "السعر"+"     ")));
//            escCmd.append(escCmd.getTextCmd(textSetting, String.format("%3.20s","اسم المنتج"+"                    ")));
//            escCmd.append(escCmd.getLFCRCmd());
//            escCmd.append(escCmd.getLFCRCmd());
//            for(int i=0; i<productArray.length();i++){
//                JSONObject jsonObj = productArray.getJSONObject(i);
//
//                escCmd.append(escCmd.getTextCmd(textSetting, String.format("%3.20s",jsonObj.get("ProductName2")+"                    ")));
//                escCmd.append(escCmd.getTextCmd(textSetting, "   "+String.format("%3.6s",df.format(jsonObj.get("PriceOriginal"))+"     ")));
//                escCmd.append(escCmd.getTextCmd(textSetting, "   "+String.format("%3.4s",jsonObj.get("Quantity")+"     ")));
//                escCmd.append(escCmd.getTextCmd(textSetting, "   "+df.format(jsonObj.get("GrandAmount"))));
//
//
//                escCmd.append(escCmd.getLFCRCmd());
//            }

            // escCmd.append(((EscCmd)escCmd).getPageMode(false));

            // Divider line
//            textSetting.setAlign(CommonEnum.ALIGN_MIDDLE);//Alignment - left, center, right
//            textSetting.setDoubleWidth(SettingEnum.Disable);//double width
//            textSetting.setBold(SettingEnum.Enable);
//            escCmd.append(escCmd.getTextCmd(textSetting, line));
//            escCmd.append(escCmd.getLFCRCmd());
//            escCmd.append(escCmd.getLFCRCmd());

            // calculation

//            String blank = "                         ";
//            textSetting.setAlign(CommonEnum.ALIGN_LEFT);//Alignment - left, center, right
//            textSetting.setBold(SettingEnum.Disable);//bold
//            textSetting.setUnderline(SettingEnum.Disable);//underscore
//            textSetting.setIsAntiWhite(SettingEnum.Disable);//Anti-White
//            textSetting.setDoubleHeight(SettingEnum.Disable);//double high
//            textSetting.setDoubleWidth(SettingEnum.Disable);//double width
//            textSetting.setItalic(SettingEnum.Disable);//Italics
//            escCmd.append(escCmd.getTextCmd(textSetting, invoiceInOf.get("subPrice")+"                          "+invoiceInOf.get("subPriceSpce")+"المبلغ الفرعي")); //36
//            escCmd.append(escCmd.getLFCRCmd());
//            escCmd.append(escCmd.getTextCmd(textSetting, invoiceInOf.get("totalTax")+"                                 "+invoiceInOf.get("taxSpace")+"ضريبة"));
//            escCmd.append(escCmd.getLFCRCmd());
//            escCmd.append(escCmd.getTextCmd(textSetting, invoiceInOf.get("totalDiscount")+"                            "+invoiceInOf.get("discountSpace")+"خصم"));
//            escCmd.append(escCmd.getLFCRCmd());
//            textSetting.setBold(SettingEnum.Enable);//bold
//            escCmd.append(escCmd.getTextCmd(textSetting, invoiceInOf.get("totalPrice")+"                         "+"السعر الكلي"));
//            escCmd.append(escCmd.getLFCRCmd());
//            //divider
//            textSetting.setAlign(CommonEnum.ALIGN_MIDDLE);//Alignment - left, center, right
//            textSetting.setDoubleWidth(SettingEnum.Disable);//double width
//            textSetting.setBold(SettingEnum.Enable);
//            escCmd.append(escCmd.getTextCmd(textSetting, line));
//            escCmd.append(escCmd.getLFCRCmd());
//            escCmd.append(escCmd.getLFCRCmd());

            //Terminal info
//            textSetting.setAlign(CommonEnum.ALIGN_LEFT);//Alignment - left, center, right
//            textSetting.setBold(SettingEnum.Disable);//bold
//            textSetting.setUnderline(SettingEnum.Disable);//underscore
//            textSetting.setIsAntiWhite(SettingEnum.Disable);//Anti-White
//            textSetting.setDoubleHeight(SettingEnum.Disable);//double high
//            textSetting.setDoubleWidth(SettingEnum.Disable);//double width
//            textSetting.setItalic(SettingEnum.Disable);//Italics
//            escCmd.append(escCmd.getTextCmd(textSetting, "صالة"+"        "+"وكيل بيع"+"       "+"نوع البيع"));
//
//            escCmd.append(escCmd.getLFCRCmd());
//            escCmd.append(escCmd.getTextCmd(textSetting, String.format("%3.16s",invoiceInOf.get("TerminalCode")+" ")));
//            escCmd.append(escCmd.getTextCmd(textSetting, String.format("%3.17s",invoiceInOf.get("salesmanName")+"                  ")));
//            escCmd.append(escCmd.getTextCmd(textSetting, String.format("%3.17s",invoiceInOf.get("paymentType")+"                ")));
//
//
//            escCmd.append(escCmd.getLFCRCmd());
//            escCmd.append(escCmd.getLFCRCmd());
            //skljdhfk


            // commonSetting.setAlign(CommonEnum.ALIGN_MIDDLE);

            escCmd.append(escCmd.getCommonSettingCmd(commonSetting));
            if (String.valueOf(invoiceInOf.get("printerName")).equals("InnerPrinter")) {
                bitmapSetting.setBimtapLimitWidth(6 * 8 * 8);
            } else {
                bitmapSetting.setBimtapLimitWidth(12 * 12 * 12);
            }
            bitmapSetting.setBmpPrintMode(BmpPrintMode.MODE_SINGLE_COLOR);

            escCmd.append(escCmd.getBitmapCmd(bitmapSetting, mBitmap));

//            escCmd.append(escCmd.getLFCRCmd());
//            escCmd.append(escCmd.getLFCRCmd());
//            //divider
//            textSetting.setAlign(CommonEnum.ALIGN_MIDDLE);//Alignment - left, center, right
//            textSetting.setDoubleWidth(SettingEnum.Disable);//double width
//            textSetting.setBold(SettingEnum.Enable);
//            escCmd.append(escCmd.getTextCmd(textSetting, line));
//            escCmd.append(escCmd.getLFCRCmd());
//            escCmd.append(escCmd.getLFCRCmd());

            //QR code
//            commonSetting.setAlign(CommonEnum.ALIGN_MIDDLE);
//            escCmd.append(escCmd.getCommonSettingCmd(commonSetting));
//            bitmapSetting.setBmpPrintMode(BmpPrintMode.MODE_SINGLE_COLOR);
//            bitmapSetting.setBimtapLimitWidth(8*8*8);
//            escCmd.append(escCmd.getBitmapCmd(bitmapSetting, mBitmap));
            //以下为设置X轴的函数的测试
            //注意如果txtposition.x>0,会和居中，对齐，冲突，不能共用
//            txtposition.x = 160;//往右偏移160*0.125=20mm,txtposition.y目前没有用
//          textSetting.setTxtPrintPosition(txtposition); //也可以用getSetXPosition来代替 escCmd.append(((EscCmd)escCmd).getSetXPosition(160));
//            escCmd.append(escCmd.getTextCmd(textSetting, printStr));
//            escCmd.append(escCmd.getLFCRCmd());
            //   escCmd.append(((EscCmd)escCmd).getPageEnd(true));
            // escCmd.append(escCmd.getLFCRCmd());
//            escCmd.append(escCmd.getLFCRCmd());
//            escCmd.append(escCmd.getLFCRCmd());

            escCmd.append(escCmd.getLFCRCmd());
            rtPrinter.writeMsgAsync(escCmd.getAppendCmds());
            escCmd.append(escCmd.getHeaderCmd());//初始化, Initial

            /*************for RPP02N  call back status  状态改为主动上报  Change status to active reporting********************/

            rtPrinter.setPrintListener(new PrintListener() {
                @Override
                public void onPrinterStatus(PrinterStatusBean StatusBean) {
                    String msg = FuncUtils.PrinterStatusToStr(StatusBean);
                    if (!msg.isEmpty())
                        ToastUtil.show(InvoiceStyle.this, "print status：" + msg);

                }
            });

            /**************************************************************************************/

//            String stcCmds = "AT+DISC\r\n";
//            escCmd.clear();
//            byte[] bytes = stcCmds.getBytes();
//            escCmd.append(bytes);
//            rtPrinter.writeMsgAsync(escCmd.getAppendCmds());
            //DisconnectByATDISC();
        } else {

            Log.d(TAG, "escPrint: no printer found");
        }
        Activity activity = InvoiceStyle.this;
        if (activity != null) {
            activity.finish();
        }

    }


//    @Override
//    public void printerObserverCallback(final PrinterInterface printerInterface, final int state) {
//        runOnUiThread(new Runnable() {
//            @Override
//            public void run() {
//                pb_connect.setVisibility(View.GONE);
//                switch (state) {
//                    case CommonEnum.CONNECT_STATE_SUCCESS:
//                        TimeRecordUtils.record("RT连接end：", System.currentTimeMillis());
//                        showToast(printerInterface.getConfigObject().toString() + getString(R.string._main_connected));
//                        tv_device_selected.setText(printerInterface.getConfigObject().toString());
//                        tv_device_selected.setTag(1);
//                        curPrinterInterface = printerInterface;//设置为当前连接， set current Printer Interface
//                        printerInterfaceArrayList.add(printerInterface);//多连接-添加到已连接列表
//                        rtPrinter.setPrinterInterface(printerInterface);
//                        //  BaseApplication.getInstance().setRtPrinter(rtPrinter);
//                        setPrintEnable(true);
//                        break;
//                    case CommonEnum.CONNECT_STATE_INTERRUPTED:
//                        if (printerInterface != null && printerInterface.getConfigObject() != null) {
//                            showToast(printerInterface.getConfigObject().toString() + getString(R.string._main_disconnect));
//                        } else {
//                            showToast(getString(R.string._main_disconnect));
//                        }
//                        TimeRecordUtils.record("RT连接断开：", System.currentTimeMillis());
//                        tv_device_selected.setText(R.string.please_connect);
//                        tv_device_selected.setTag(-1);
//                        curPrinterInterface = null;
//                        printerInterfaceArrayList.remove(printerInterface);//多连接-从已连接列表中移除
//                        //  BaseApplication.getInstance().setRtPrinter(null);
//                        setPrintEnable(false);
//
//                        break;
//                    default:
//                        break;
//                }
//            }
//        });
//    }

    // @Override
//    public void printerReadMsgCallback(PrinterInterface printerInterface, final byte[] bytes) {
//
//        runOnUiThread(new Runnable() {
//            @Override
//            public void run() {
//                PrinterStatusBean StatusBean = PrinterStatusPareseUtils.parsePrinterStatusResult(bytes);
//                if (StatusBean.printStatusCmd == PrintStatusCmd.cmd_PrintFinish) {
//                    if (StatusBean.blPrintSucc) {
//                        //  Log.e("mydebug","print ok");
//                        ToastUtil.show(MainActivity.this, "print ok");
//                    } else {
//                        ToastUtil.show(MainActivity.this, PrinterStatusPareseUtils.getPrinterStatusStr(StatusBean));
//
//                    }
//
//
//                } else if (StatusBean.printStatusCmd == PrintStatusCmd.cmd_Normal) {
//                    ToastUtil.show(MainActivity.this, "print status：" + PrinterStatusPareseUtils.getPrinterStatusStr(StatusBean));
//
//                } else if (StatusBean.printStatusCmd == PrintStatusCmd.cmd_Print_RPP02N) {
//                    String msg = FuncUtils.PrinterStatusToStr(StatusBean);
//                    if (!msg.isEmpty())
//                        ToastUtil.show(MainActivity.this, "print status：" + msg);
//                }
//            }
//        });
//
//
//    }


    private void showBluetoothDeviceChooseDialog() {
        BluetoothDeviceChooseDialog bluetoothDeviceChooseDialog = new BluetoothDeviceChooseDialog();
        bluetoothDeviceChooseDialog.setOnDeviceItemClickListener(new BluetoothDeviceChooseDialog.onDeviceItemClickListener() {
            @Override
            public void onDeviceItemClick(BluetoothDevice device) {

                if (ActivityCompat.checkSelfPermission(InvoiceStyle.this, Manifest.permission.BLUETOOTH_CONNECT) != PackageManager.PERMISSION_GRANTED) {
                    // TODO: Consider calling
                    //    ActivityCompat#requestPermissions
                    // here to request the missing permissions, and then overriding
                    //   public void onRequestPermissionsResult(int requestCode, String[] permissions,
                    //                                          int[] grantResults)
                    // to handle the case where the user grants the permission. See the documentation
                    // for ActivityCompat#requestPermissions for more details.
                    return;
                }
                if (TextUtils.isEmpty(device.getName())) {
                    tv_device_selected.setText(device.getAddress());
                } else {
                    tv_device_selected.setText(device.getName() + " [" + device.getAddress() + "]");
                }
                configObj = new BluetoothEdrConfigBean(device);
                tv_device_selected.setTag(1);
                isConfigPrintEnable(configObj);
            }
        });
        bluetoothDeviceChooseDialog.show(InvoiceStyle.this.getFragmentManager(), null);
    }



    /**
     * 设置是否可进行打印操作
     *
     * @param isEnable
     */
    private void setPrintEnable(boolean isEnable) {


    }

    private void isConfigPrintEnable(Object configObj) {
        if (isInConnectList(configObj)) {
            setPrintEnable(true);
        } else {
            setPrintEnable(false);
        }
    }

    private boolean isInConnectList(Object configObj) {
        boolean isInList = false;
        for (int i = 0; i < printerInterfaceArrayList.size(); i++) {
            PrinterInterface printerInterface = printerInterfaceArrayList.get(i);
            if (configObj.toString().equals(printerInterface.getConfigObject().toString())) {
                if (printerInterface.getConnectState() == ConnectStateEnum.Connected) {
                    isInList = true;
                    break;
                }
            }
        }
        return isInList;
    }

    @Override
    public void onBackPressed() {
        super.onBackPressed();
        System.exit(0);//完全退出应用，关闭进程
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if(requestCode == REQUEST_ENABLE_BT){
            if(requestCode == RESULT_OK){
                //蓝牙已经开启
                showBluetoothDeviceChooseDialog();
            }
        }
    }

    @Override
    public void printerObserverCallback(PrinterInterface printerInterface, int i) {

    }

    @Override
    public void printerReadMsgCallback(PrinterInterface printerInterface, byte[] bytes) {

    }
}
