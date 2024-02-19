package com.bnodypos.activity;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.documentfile.provider.DocumentFile;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.ActivityNotFoundException;
import android.content.ContentValues;
import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.os.Environment;
import android.os.ParcelFileDescriptor;
import android.os.storage.StorageManager;
import android.provider.MediaStore;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.bnodypos.MainApplication;
import com.bnodypos.R;
import com.bnodypos.app.BaseActivity;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.modules.core.RCTNativeAppEventEmitter;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.util.Objects;

public class PinTempletActivity extends AppCompatActivity {

    Uri uri;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_pin_templet);
        openDirectory();

    }
    private void sendEvent(@NonNull ReactContext reactContext,
                           String eventName,
                           String params) {
        reactContext
                .getJSModule(RCTNativeAppEventEmitter.class)
                .emit(eventName, params);

    }

    public void goBack() {
        Activity activity = PinTempletActivity.this;
        if (activity != null) {
            activity.finish();
        }
    }

    public void openDirectory() {

        String path = Environment.getExternalStorageDirectory() + "/Documents/Bnody POS/Invoices";
        File file = new File(path);
        String startDir = "", secondDir, finalDirPath;

        if (file.exists()) {
            startDir = "Documents%2FBnody POS";
        }

        StorageManager sm = (StorageManager) getSystemService(Context.STORAGE_SERVICE);

        Intent intent = null;
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
                intent = sm.getPrimaryStorageVolume().createOpenDocumentTreeIntent();
            }
        }


        Uri uri = intent.getParcelableExtra("android.provider.extra.INITIAL_URI");

        String scheme = uri.toString();

        Log.d("TAG", "INITIAL_URI scheme: " + scheme);

        scheme = scheme.replace("/root/", "/root/");

        finalDirPath = scheme + "%3A" + startDir;

        uri = Uri.parse(finalDirPath);

        intent.putExtra("android.provider.extra.INITIAL_URI", uri);

        Log.d("TAG", "uri: " + uri.toString());

        try {
            startActivityForResult(intent, 6);
        } catch (ActivityNotFoundException ignored) {

        }
    }

    @SuppressLint("WrongConstant")
    public void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
        super.onActivityResult(requestCode, resultCode, data);

        if (resultCode == RESULT_OK) {
            if (data != null) {
                uri = data.getData();
                Log.d("TAG", "onActivityResult: " + uri.getPath());
                final int takeFlags = data.getFlags()
                        & (Intent.FLAG_GRANT_READ_URI_PERMISSION);
                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
                    getContentResolver().takePersistableUriPermission(uri, takeFlags);
                }


                        try {
                            MainApplication application = (MainApplication) getApplication();
                            ReactInstanceManager mReactInstanceManager = application.getReactNativeHost().getReactInstanceManager();
                            ReactApplicationContext context = (ReactApplicationContext) mReactInstanceManager.getCurrentReactContext();
                            sendEvent(context, "DeviceFound", String.valueOf(uri));
                            goBack();

                        } catch (Exception e) {
                            e.printStackTrace();
                        }


            }
        }
    }
}










