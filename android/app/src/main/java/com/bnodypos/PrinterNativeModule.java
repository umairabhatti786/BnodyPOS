package com.bnodypos; // replace com.your-app-name with your app’s name

import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.provider.MediaStore;

import com.bnodypos.activity.InvoiceStyle;
import com.bnodypos.activity.MainActivity;
import com.bnodypos.activity.PinTempletActivity;
import com.bnodypos.activity.PrinterService;
import com.bnodypos.utils.ToastUtil;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import org.json.JSONException;
import org.json.JSONObject;

public class PrinterNativeModule extends ReactContextBaseJavaModule {
    private Context mContext;

    public PrinterNativeModule(ReactApplicationContext context) {
        super(context);
        mContext = context;
    }

    @Override
    public String getName() {
        return "PrinterNativeModule";
    }

    @ReactMethod
    public void createPrinterNativeModule(String name) {
        initData();
    }

    @ReactMethod
    public void initData() {
        Intent i = new Intent(mContext, MainActivity.class);
        i.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        mContext.startActivity(i);
    }

    @ReactMethod
    public void readFolder() {
        Intent i = new Intent(mContext, PinTempletActivity.class);
        i.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        mContext.startActivity(i);
    }

    @ReactMethod
    public void printing(String obj, String uri, String arrays) {
        Intent i = new Intent(mContext, PrinterService.class);
        i.putExtra("Object", obj);
        i.putExtra("uri", uri);
        i.putExtra("arrays", arrays);
        ToastUtil.show(mContext, "Printing Invoice");
        mContext.startService(i);
    }
}
