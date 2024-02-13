//package com.bnodypos.activity;
//
//public class PrinterService {
//
//}

package com.bnodypos.activity;

import static com.facebook.react.bridge.UiThreadUtil.runOnUiThread;

import android.Manifest;
import android.app.IntentService;
import android.bluetooth.BluetoothAdapter;
import android.bluetooth.BluetoothDevice;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.graphics.Bitmap;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Paint;
import android.net.Uri;
import android.os.Build;
import android.provider.MediaStore;
import android.util.Log;
import androidx.annotation.Nullable;

import com.bnodypos.BitModel;
import com.bnodypos.PrinterNativeModule;
import com.bnodypos.utils.FuncUtils;
import com.bnodypos.utils.ToastUtil;
import com.rt.printerlibrary.bean.BluetoothEdrConfigBean;
import com.rt.printerlibrary.bean.PrinterStatusBean;
import com.rt.printerlibrary.cmd.Cmd;
import com.rt.printerlibrary.cmd.EscCmd;
import com.rt.printerlibrary.cmd.EscFactory;
import com.rt.printerlibrary.connect.PrinterInterface;
import com.rt.printerlibrary.enumerate.BmpPrintMode;
import com.rt.printerlibrary.enumerate.CommonEnum;
import com.rt.printerlibrary.enumerate.SettingEnum;
import com.rt.printerlibrary.factory.cmd.CmdFactory;
import com.rt.printerlibrary.factory.connect.BluetoothFactory;
import com.rt.printerlibrary.factory.connect.PIFactory;
import com.rt.printerlibrary.factory.printer.PrinterFactory;
import com.rt.printerlibrary.factory.printer.ThermalPrinterFactory;
import com.rt.printerlibrary.observer.PrinterObserver;
import com.rt.printerlibrary.observer.PrinterObserverManager;
import com.rt.printerlibrary.printer.RTPrinter;
import com.rt.printerlibrary.setting.BitmapSetting;
import com.rt.printerlibrary.setting.CommonSetting;
import com.rt.printerlibrary.setting.TextSetting;
import com.rt.printerlibrary.utils.ConnectListener;
import com.rt.printerlibrary.utils.PrintListener;
import com.rt.printerlibrary.utils.PrintStatusCmd;
import com.rt.printerlibrary.utils.PrinterStatusPareseUtils;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class PrinterService extends IntentService implements PrinterObserver {


    private final String TAG = PrinterService.class.getSimpleName();
    private JSONObject invoiceInOf;
    private RTPrinter rtPrinter = null;
    private PrinterFactory printerFactory;
    private Object configObj;
    private TextSetting textSetting;
    //for wifi printer
    private String printerIP = "";
    private String printerPORT = "";
    //for bluetooth printer
    private String bluetoothMac = "";

    private Bitmap mBitmap,testing;
//    private JSONArray productArray;
    private String[] NEED_PERMISSION = {
            Manifest.permission.CAMERA,
            Manifest.permission.ACCESS_COARSE_LOCATION,
            Manifest.permission.WRITE_EXTERNAL_STORAGE
    };
    private List<String> NO_PERMISSION = new ArrayList<String>();

    public PrinterService() {
        super("PrinterService");
    }

    @Override
    protected void onHandleIntent(@Nullable Intent intent) {
        Log.v("service start", "this is service");
        String uri=intent.getStringExtra("uri");
//        BitModel b = new BitModel();
//        BitModel singletonexample = com.bnodypos.BitModel.getInstance();
//        String uri = singletonexample.getBitVariable();

        try {
            mBitmap = MediaStore.Images.Media.getBitmap(getContentResolver(), Uri.parse(uri));
            Log.d(TAG, "mBitmap: "+mBitmap);
        } catch (IOException e) {
            e.printStackTrace();
        }
        testing=  textAsBitmap("اختبار اللغة العربية",100, Color.BLACK);
        Log.d(TAG, "onCreatebitmap: " + testing);
//        String proArry=intent.getStringExtra("arrays");
        String object=intent.getStringExtra("Object");
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
            invoiceInOf=jsonObj.getJSONObject(0);

        } catch (JSONException e) {
            e.printStackTrace();
        }
        CheckAllPermission();
        init();
    }

    private void init() {
        printerFactory = new ThermalPrinterFactory();
        rtPrinter = printerFactory.create();
        PrinterObserverManager.getInstance().clear();
        PrinterObserverManager.getInstance().add(this);

//        if (connectionType == ConnectionType.WIFI) {
//            connectWifi();
//        } else {
        connectBluetoothByMac();
//        }

    }


    private void connectBluetoothByMac() {
        // ToastUtil.show(InvoiceStyle.this, "Printer Not Connected");
        String str = null;
        try {
            str= invoiceInOf.get("printerMacAddress").toString();
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
//                    pd.dismiss();
                    textPrint();
                } catch (UnsupportedEncodingException | JSONException e) {
//                      showToast("print status：");
//                    pd.dismiss();

//                    Activity activity = InvoiceStyle.this;

//                    if (activity != null) {
//                        // ToastUtil.show(activity, "Printer Not Connected");
//                        activity.finish();
//                    }
//                    e.printStackTrace();
                }
//                iprintTimes++;
            }

            @Override
            public void onPrinterDisconnect(Object configObj) {
//                ToastUtil.show(this, "Printer Not Connected");
//                if (iprintTimes < 5) {
//                    // ToastUtil.show(InvoiceStyle.this, "Printer Not Connected");
//                    new Thread(new Runnable() {
//                        @Override
//                        public void run() {
//                            Message message = new Message();
//                            message.what = 11;
//                            handler.sendMessage(message);
//                        }
//                    }).start();
//                    pd.dismiss();
//
//                    Activity activity = InvoiceStyle.this;
//
//                    if (activity != null) {
//
//                        activity.finish();
//                    }



//                }
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
            if(String.valueOf(invoiceInOf.get("printerName")).equals("InnerPrinter")){
                bitmapSetting.setBimtapLimitWidth(6*8*8);
            }else{
                bitmapSetting.setBimtapLimitWidth(12*12*12);
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
//                    if (!msg.isEmpty())
//                        ToastUtil.show(InvoiceStyle.this, "print status：" + msg);

                }
            });

            /**************************************************************************************/

//            String stcCmds = "AT+DISC\r\n";
//            escCmd.clear();
//            byte[] bytes = stcCmds.getBytes();
//            escCmd.append(bytes);
//            rtPrinter.writeMsgAsync(escCmd.getAppendCmds());
            //DisconnectByATDISC();
        }else{

            Log.d(TAG, "escPrint: no printer found");
        }
//        Activity activity = InvoiceStyle.this;
//        if (activity != null) {
//            activity.finish();
//        }

    }

    private void CheckAllPermission() {
        NO_PERMISSION.clear();
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            for (int i = 0; i < NEED_PERMISSION.length; i++) {
                if (checkSelfPermission(NEED_PERMISSION[i]) != PackageManager.PERMISSION_GRANTED) {
                    NO_PERMISSION.add(NEED_PERMISSION[i]);
                }
            }
            if (NO_PERMISSION.size() == 0) {
//                recordVideo();
            } else {
//                requestPermissions(NO_PERMISSION.toArray(new String[NO_PERMISSION.size()]), REQUEST_CAMERA);
            }
        } else {
//            recordVideo();
        }

    }

    private void connectBluetooth() {
        BluetoothDevice device = BluetoothAdapter.getDefaultAdapter().getRemoteDevice(bluetoothMac);
        BluetoothEdrConfigBean bluetoothEdrConfigBean = new BluetoothEdrConfigBean(device);
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
            ToastUtil.show(this, e.getMessage());
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

            //Title
            textSetting.setAlign(CommonEnum.ALIGN_MIDDLE);//Alignment - left, center, right
            textSetting.setBold(SettingEnum.Disable);//bold
            textSetting.setUnderline(SettingEnum.Disable);//underscore
            textSetting.setIsAntiWhite(SettingEnum.Disable);//Anti-White
            textSetting.setDoubleHeight(SettingEnum.Disable);//double high
            textSetting.setDoubleWidth(SettingEnum.Disable);//double width
            textSetting.setItalic(SettingEnum.Disable);//Italics
            escCmd.append(escCmd.getTextCmd(textSetting, String.valueOf(invoiceInOf.get("title"))));
            escCmd.append(escCmd.getLFCRCmd());

            //Cashier
            textSetting.setAlign(CommonEnum.ALIGN_MIDDLE);//Alignment - left, center, right
            textSetting.setBold(SettingEnum.Disable);//bold
            textSetting.setUnderline(SettingEnum.Disable);//underscore
            textSetting.setIsAntiWhite(SettingEnum.Disable);//Anti-White
            textSetting.setDoubleHeight(SettingEnum.Disable);//double high
            textSetting.setDoubleWidth(SettingEnum.Disable);//double width
            textSetting.setItalic(SettingEnum.Disable);//Italics
            escCmd.append(escCmd.getTextCmd(textSetting, String.valueOf(invoiceInOf.get("cashier"))));
            escCmd.append(escCmd.getLFCRCmd());

            // current Date Time
            textSetting.setAlign(CommonEnum.ALIGN_MIDDLE);//Alignment - left, center, right
            textSetting.setBold(SettingEnum.Disable);//bold
            textSetting.setUnderline(SettingEnum.Disable);//underscore
            textSetting.setIsAntiWhite(SettingEnum.Disable);//Anti-White
            textSetting.setDoubleHeight(SettingEnum.Disable);//double high
            textSetting.setDoubleWidth(SettingEnum.Disable);//double width
            textSetting.setItalic(SettingEnum.Disable);//Italics
            escCmd.append(escCmd.getTextCmd(textSetting , String.valueOf(invoiceInOf.get("currentDate"))));
            escCmd.append(escCmd.getLFCRCmd());

            //start-shift
            textSetting.setAlign(CommonEnum.ALIGN_MIDDLE);//Alignment - left, center, right
            textSetting.setBold(SettingEnum.Disable);//bold
            textSetting.setUnderline(SettingEnum.Disable);//underscore
            textSetting.setIsAntiWhite(SettingEnum.Disable);//Anti-White
            textSetting.setDoubleHeight(SettingEnum.Disable);//double high
            textSetting.setDoubleWidth(SettingEnum.Disable);//double width
            textSetting.setItalic(SettingEnum.Disable);//Italics
            escCmd.append(escCmd.getTextCmd(textSetting , String.valueOf(invoiceInOf.get("startShift"))));
            escCmd.append(escCmd.getLFCRCmd());

            //end-shift
            textSetting.setAlign(CommonEnum.ALIGN_MIDDLE);//Alignment - left, center, right
            textSetting.setBold(SettingEnum.Disable);//bold
            textSetting.setUnderline(SettingEnum.Disable);//underscore
            textSetting.setIsAntiWhite(SettingEnum.Disable);//Anti-White
            textSetting.setDoubleHeight(SettingEnum.Disable);//double high
            textSetting.setDoubleWidth(SettingEnum.Disable);//double width
            textSetting.setItalic(SettingEnum.Disable);//Italics
            escCmd.append(escCmd.getTextCmd(textSetting , String.valueOf(invoiceInOf.get("endShift"))));
            escCmd.append(escCmd.getLFCRCmd());

            // Divider line
            String line = "--------------------------------";
            textSetting.setDoubleWidth(SettingEnum.Disable);//double width
            textSetting.setBold(SettingEnum.Enable);
            escCmd.append(escCmd.getTextCmd(textSetting, line));
            escCmd.append(escCmd.getLFCRCmd());

            // tag
            textSetting.setAlign(CommonEnum.ALIGN_MIDDLE);//Alignment - left, center, right
            textSetting.setBold(SettingEnum.Disable);//bold
            textSetting.setUnderline(SettingEnum.Disable);//underscore
            textSetting.setIsAntiWhite(SettingEnum.Disable);//Anti-White
            textSetting.setDoubleHeight(SettingEnum.Disable);//double high
            textSetting.setDoubleWidth(SettingEnum.Disable);//double width
            textSetting.setItalic(SettingEnum.Disable);//Italics
            escCmd.append(escCmd.getTextCmd(textSetting, String.valueOf(invoiceInOf.get("totalNetSales"))));
            escCmd.append(escCmd.getLFCRCmd());

//           // Company VAT
            textSetting.setAlign(CommonEnum.ALIGN_MIDDLE);//Alignment - left, center, right
            textSetting.setBold(SettingEnum.Disable);//bolds
            textSetting.setUnderline(SettingEnum.Disable);//underscore
            textSetting.setIsAntiWhite(SettingEnum.Disable);//Anti-White
            textSetting.setDoubleHeight(SettingEnum.Disable);//double high
            textSetting.setDoubleWidth(SettingEnum.Disable);//double width
            textSetting.setItalic(SettingEnum.Disable);//Italics
            escCmd.append(escCmd.getTextCmd(textSetting, String.valueOf(invoiceInOf.get("totalTax"))));
            escCmd.append(escCmd.getLFCRCmd());

            // Total Sales
            textSetting.setAlign(CommonEnum.ALIGN_MIDDLE);//Alignment - left, center, right
            textSetting.setBold(SettingEnum.Disable);//bolds
            textSetting.setUnderline(SettingEnum.Disable);//underscore
            textSetting.setIsAntiWhite(SettingEnum.Disable);//Anti-White
            textSetting.setDoubleHeight(SettingEnum.Disable);//double high
            textSetting.setDoubleWidth(SettingEnum.Disable);//double width
            textSetting.setItalic(SettingEnum.Disable);//Italics
            escCmd.append(escCmd.getTextCmd(textSetting, String.valueOf(invoiceInOf.get("totalSales"))));
            escCmd.append(escCmd.getLFCRCmd());

            // Cash
            textSetting.setAlign(CommonEnum.ALIGN_MIDDLE);//Alignment - left, center, right
            textSetting.setBold(SettingEnum.Disable);//bolds
            textSetting.setUnderline(SettingEnum.Disable);//underscore
            textSetting.setIsAntiWhite(SettingEnum.Disable);//Anti-White
            textSetting.setDoubleHeight(SettingEnum.Disable);//double high
            textSetting.setDoubleWidth(SettingEnum.Disable);//double width
            textSetting.setItalic(SettingEnum.Disable);//Italics
            escCmd.append(escCmd.getTextCmd(textSetting, String.valueOf(invoiceInOf.get("cash"))));
            escCmd.append(escCmd.getLFCRCmd());

            // Card
            textSetting.setAlign(CommonEnum.ALIGN_MIDDLE);//Alignment - left, center, right
            textSetting.setBold(SettingEnum.Disable);//bolds
            textSetting.setUnderline(SettingEnum.Disable);//underscore
            textSetting.setIsAntiWhite(SettingEnum.Disable);//Anti-White
            textSetting.setDoubleHeight(SettingEnum.Disable);//double high
            textSetting.setDoubleWidth(SettingEnum.Disable);//double width
            textSetting.setItalic(SettingEnum.Disable);//Italics
            escCmd.append(escCmd.getTextCmd(textSetting, String.valueOf(invoiceInOf.get("card"))));
            escCmd.append(escCmd.getLFCRCmd());

            // Total discount
            textSetting.setAlign(CommonEnum.ALIGN_MIDDLE);//Alignment - left, center, right
            textSetting.setBold(SettingEnum.Disable);//bolds
            textSetting.setUnderline(SettingEnum.Disable);//underscore
            textSetting.setIsAntiWhite(SettingEnum.Disable);//Anti-White
            textSetting.setDoubleHeight(SettingEnum.Disable);//double high
            textSetting.setDoubleWidth(SettingEnum.Disable);//double width
            textSetting.setItalic(SettingEnum.Disable);//Italics
            escCmd.append(escCmd.getTextCmd(textSetting, String.valueOf(invoiceInOf.get("totalDiscount"))));
            escCmd.append(escCmd.getLFCRCmd());

            // Total refunds
            textSetting.setAlign(CommonEnum.ALIGN_MIDDLE);//Alignment - left, center, right
            textSetting.setBold(SettingEnum.Disable);//bolds
            textSetting.setUnderline(SettingEnum.Disable);//underscore
            textSetting.setIsAntiWhite(SettingEnum.Disable);//Anti-White
            textSetting.setDoubleHeight(SettingEnum.Disable);//double high
            textSetting.setDoubleWidth(SettingEnum.Disable);//double width
            textSetting.setItalic(SettingEnum.Disable);//Italics
            escCmd.append(escCmd.getTextCmd(textSetting, String.valueOf(invoiceInOf.get("totalRefunds"))));
            escCmd.append(escCmd.getLFCRCmd());

            // Divider line
            textSetting.setAlign(CommonEnum.ALIGN_MIDDLE);//Alignment - left, center, right
            textSetting.setDoubleWidth(SettingEnum.Disable);//double width
            textSetting.setBold(SettingEnum.Enable);
            escCmd.append(escCmd.getTextCmd(textSetting, line));
            escCmd.append(escCmd.getLFCRCmd());
            escCmd.append(escCmd.getLFCRCmd());

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
                    Log.v("PrinterService", "onPrinterStatus: " + msg);
                    if (!msg.isEmpty())
                        ToastUtil.show(PrinterService.this, "print status：" + msg);

                }
            });

            /**************************************************************************************/

        } else {
            Log.d(TAG, "escPrint: no printer found");
        }

    }

    private void DisconnectByATDISC() {//断开指令，定制客户测试用
        CmdFactory cmdFactory = new EscFactory();
        Cmd cmd = cmdFactory.create();
        String stcCmds = "AT+DISC\r\n";
        byte[] bytes = stcCmds.getBytes();
        cmd.append(bytes);
        rtPrinter.writeMsgAsync(cmd.getAppendCmds());
    }

    @Override
    public void printerObserverCallback(PrinterInterface printerInterface, int state) {
        runOnUiThread(new Runnable() {
            @Override
            public void run() {
                switch (state) {
                    case CommonEnum.CONNECT_STATE_SUCCESS:
                        rtPrinter.setPrinterInterface(printerInterface);
                        //ToastUtil.show(PrinterService.this, "Printer Connected!");
//                        textPrint();
                        break;
                    case CommonEnum.CONNECT_STATE_INTERRUPTED:
                        if (printerInterface != null && printerInterface.getConfigObject() != null) {
                            ToastUtil.show(PrinterService.this, "Printer Disconnected!");
                        }
                        break;
                    default:
                        break;
                }
            }
        });
    }

    @Override
    public void printerReadMsgCallback(PrinterInterface printerInterface, byte[] bytes) {
        Log.v("PrinterService", Arrays.toString(bytes));
        runOnUiThread(new Runnable() {
            @Override
            public void run() {
                PrinterStatusBean StatusBean = PrinterStatusPareseUtils.parsePrinterStatusResult(bytes);
                Log.v("PrinterService", StatusBean.toString());
                if (StatusBean.printStatusCmd == PrintStatusCmd.cmd_PrintFinish) {
                    if (StatusBean.blPrintSucc) {
                        //  Log.e("mydebug","print ok");
                        ToastUtil.show(PrinterService.this, "print ok");
                        printerInterface.disConnect();
                    } else {
                        ToastUtil.show(PrinterService.this, PrinterStatusPareseUtils.getPrinterStatusStr(StatusBean));

                    }


                } else if (StatusBean.printStatusCmd == PrintStatusCmd.cmd_Normal) {
                    ToastUtil.show(PrinterService.this, "print status：" + PrinterStatusPareseUtils.getPrinterStatusStr(StatusBean));

                } else if (StatusBean.printStatusCmd == PrintStatusCmd.cmd_Print_RPP02N) {
                    String msg = FuncUtils.PrinterStatusToStr(StatusBean);
                    if (!msg.isEmpty())
                        ToastUtil.show(PrinterService.this, "print status：" + msg);
                }
            }
        });
    }
}

