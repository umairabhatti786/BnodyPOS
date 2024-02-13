package com.bnodypos;

public class BitModel {
    public String bitUri, Objct;
    private static final BitModel ourInstance = new BitModel();
    public static BitModel getInstance() {
        return ourInstance;
    }
    private BitModel() { }

    public String getBitVariable() {
        return bitUri;
    }

    public void setBitVariable(String someVariable) {
        this.bitUri = someVariable;
    }

    public String getObjVariable() {
        return Objct;
    }

    public void setObjVariable(String someVariable) {
        this.Objct = someVariable;
    }
}

