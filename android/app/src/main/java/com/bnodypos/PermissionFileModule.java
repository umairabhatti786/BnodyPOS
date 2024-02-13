package com.bnodypos;

import static android.provider.MediaStore.*;

import android.content.ContentResolver;
import android.content.ContentValues;
import android.content.Context;
import android.net.Uri;
import android.os.Build;
import android.os.Environment;
import android.util.Log;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.documentfile.provider.DocumentFile;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.util.Objects;

public class PermissionFileModule extends ReactContextBaseJavaModule {
    private final ReactApplicationContext mContext;

    public PermissionFileModule(@NonNull ReactApplicationContext reactContext) {
        super(reactContext);
        mContext = reactContext;
    }

    @NonNull
    @Override
    public String getName() {
        return "PermissionFile";
    }

    @ReactMethod
    public void createFolderAbove29(String json, Callback success) {
        try {
            ContentValues values = new ContentValues();
            values.put(MediaColumns.DISPLAY_NAME, "Invoices");       //file name
            values.put(MediaColumns.MIME_TYPE, "text/plain");        //file extension, will automatically add to file
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
                values.put(MediaColumns.RELATIVE_PATH, Environment.DIRECTORY_DOCUMENTS + "/Bnody POS/");     //end "/" is not mandatory
            }

            Uri uri = mContext.getContentResolver().insert(Files.getContentUri("external"), values);

            if (uri != null) {
                try (OutputStream outputStream = mContext.getContentResolver().openOutputStream(uri)) {
                    if (outputStream != null) {
                        outputStream.write(json.getBytes());
                        outputStream.close();
                        success.invoke("true");
                        Toast.makeText(mContext, "File created successfully", Toast.LENGTH_SHORT).show();
                        return;
                    }
                }
            }

            Toast.makeText(mContext, "Fail to create file", Toast.LENGTH_SHORT).show();
        } catch (IOException e) {
            Toast.makeText(mContext, "Fail to create file", Toast.LENGTH_SHORT).show();
        }
    }

    @ReactMethod
    public void overWriteAbove29(String json, Callback error, Callback success) {
        createFolderAbove29(json, success);
    }

    @ReactMethod
    public void createFolderAPI29(String json, Callback success) {
        try {
            ContentValues values = new ContentValues();
            values.put(MediaColumns.DISPLAY_NAME, "Invoices");       //file name
            values.put(MediaColumns.MIME_TYPE, "text/plain");        //file extension, will automatically add to file
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
                values.put(MediaColumns.RELATIVE_PATH, Environment.DIRECTORY_DOWNLOADS + "/Bnody POS/");     //end "/" is not mandatory
            }

            Uri uri = mContext.getContentResolver().insert(Files.getContentUri("external"), values);

            if (uri != null) {
                try (OutputStream outputStream = mContext.getContentResolver().openOutputStream(uri)) {
                    if (outputStream != null) {
                        outputStream.write(json.getBytes());
                        outputStream.close();
                        success.invoke("true");
                        Toast.makeText(mContext, "File created successfully", Toast.LENGTH_SHORT).show();
                        return;
                    }
                }
            }

            Toast.makeText(mContext, "Fail to create file", Toast.LENGTH_SHORT).show();
        } catch (IOException e) {
            Toast.makeText(mContext, "Fail to create file", Toast.LENGTH_SHORT).show();
        }
    }

    @ReactMethod
    public void overWriteAPI29(String json, Callback error, Callback success) {
        createFolderAPI29(json, success);
    }

    @ReactMethod
    public void deleteFile(String fURI) {
        DocumentFile fromTreeUri = DocumentFile.fromTreeUri(mContext, Uri.parse(fURI));
        if (fromTreeUri != null) {
            DocumentFile[] documentFiles = fromTreeUri.listFiles();
            if (documentFiles != null) {
                for (DocumentFile documentFile : documentFiles) {
                    String uriString = documentFile.getUri().toString();
                    if (uriString.contains("Invoices")) {
                        try {
                            documentFile.delete();
                            Toast.makeText(mContext, "File deleted successfully", Toast.LENGTH_SHORT).show();
                        } catch (Exception exn) {
                            Toast.makeText(mContext, "Fail to delete file", Toast.LENGTH_SHORT).show();
                            exn.printStackTrace();
                        }
                    }
                }
            }
        }
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public String getInvoices(String fURI) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
            DocumentFile fromTreeUri = DocumentFile.fromTreeUri(mContext, Uri.parse(fURI));
            if (fromTreeUri != null) {
                DocumentFile[] documentFiles = fromTreeUri.listFiles();
                if (documentFiles != null) {
                    for (DocumentFile documentFile : documentFiles) {
                        String uriString = documentFile.getUri().toString();
                        if (uriString.contains("Invoices")) {
                            try (InputStream inputStream = mContext.getContentResolver().openInputStream(documentFile.getUri());
                                 BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream))) {
                                StringBuilder stringBuilder = new StringBuilder();
                                String line;
                                while ((line = reader.readLine()) != null) {
                                    stringBuilder.append(line);
                                }
                                Log.d("TAG", "onActivityRead: " + stringBuilder.toString());
                                return stringBuilder.toString();
                            } catch (FileNotFoundException e) {
                                e.printStackTrace();
                            } catch (IOException e) {
                                e.printStackTrace();
                            }
                        }
                    }
                }
            }
        }
        return "";
    }
}
