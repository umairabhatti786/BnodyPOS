package com.bnodyrestaurantpos; // replace com.your-app-name with your app’s name

import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.provider.MediaStore;

import com.bnodyrestaurantpos.activity.InvoiceStyle;
import com.bnodyrestaurantpos.activity.MainActivity;
import com.bnodyrestaurantpos.activity.PinTempletActivity;
import com.bnodyrestaurantpos.activity.PrinterService;
import com.bnodyrestaurantpos.utils.ToastUtil;
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
