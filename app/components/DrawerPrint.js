import React, { useEffect, useState, useRef } from "react";
import { View, Text, I18nManager, NativeModules, StyleSheet, Image } from "react-native";
import { getData } from "../sqliteHelper";
import { DrawerSetupTable } from "../sqliteTables/DrawerSetup";
import ViewShot, { captureRef } from 'react-native-view-shot';
import AsyncStorage from '@react-native-async-storage/async-storage';

import sizeHelper from "../helpers/sizeHelper";
import AppColor from "../constant/AppColor";




const DrawerPrint = ({ StringsList, TerminalConfiguration }) => {


    const [drawerArray, setDrawerArray] = useState([])
    const viewShotRef = useRef(null);
    const [printerMacAddress, setPrinterMacAddress] = useState(null)

    const { PrinterNativeModule } = NativeModules;

    let amountDetails = [
        { id: 'StartDate', title: StringsList._47, value: '0' },
        { id: 'initialCash', title: StringsList._48, value: '0' },
        { id: 'DepositCash', title: StringsList._50, value: '0' },
        { id: 'CashRefund', title: StringsList._49, value: '0' },
        { id: 'CashSales', title: StringsList._52, value: '0' },
        { id: 'withDraw', title: StringsList._51, value: '0' },
        { id: 'estimatedAmountinDrawer', title: StringsList._53, value: '0' },
        {
            id: 'creditSales',
            title: StringsList._54,
            value: '0',
        },
        {
            id: 'creditRefunds',
            title: StringsList._55 + ' ' + StringsList._56,
            value: '0',
        },
        { id: 'cardSale', title: StringsList._57, value: '0' },
        { id: 'cardReturn', title: StringsList._58, value: '0' },
    ];


    useEffect(() => {
        getData(DrawerSetupTable, cb => {
            console.log("DrawerSetupTable", cb)
            setDrawerArray(cb[0]);
        });

    }, []);


    const onImage = () => {
        captureRef(viewShotRef.current, {
            format: 'png',
            quality: 1.0,
            height: sizeHelper.height,
            width: sizeHelper.width
        }).then(
            async urii => {
                console.log("uriiuriiuriiurii", urii)
                let ConnectedBluetoothInfo = await AsyncStorage.getItem('ConnectedBluetoothInfo');
                let printAdress = ConnectedBluetoothInfo?.split("|")

                let invoiceInfoObj = [{
                    printerMacAddress: printAdress[1],
                    printerName: printAdress[0],
                    ar: I18nManager.isRTL ? "ar" : "en",

                    //  invoiceType: I18nManager.isRTL ? invoiceTypeA : invoiceTypeE,

                }]


                if (printAdress[1]) {
                    console.log("invoice info object", printAdress[1])
                    PrinterNativeModule.printing(JSON.stringify(invoiceInfoObj), urii, "[]")
                }
                //     // let base64data = await RNFS.readFile(urii, 'base64').then();

                //     // console.log(base64data);
                //     // createInvoiceStyle(base64data)
                //     // console.log('qrRef2, snapshot qrRef2', base64data)
            },
            error => console.error('Oops, snapshot failed', error),
        );
    }




    return (

        <ViewShot
            style={{
                width: "90%",
                paddingVertical: sizeHelper.calHp(20),
                paddingHorizontal: sizeHelper.calHp(30),
                backgroundColor: AppColor.white,
                paddingBottom: sizeHelper.calHp(100)
            }}
            ref={viewShotRef}
            onCapture={onImage}

            // ref={ viewShotRef}
            // onCapture={ onCapture}

            captureMode="mount">

            {!!TerminalConfiguration?.CompanyLogo &&
                <Image
                    source={{ uri: TerminalConfiguration?.CompanyLogoType + ',' + TerminalConfiguration?.CompanyLogo }}
                    style={{
                        //   backgroundColor: "green",
                        height: sizeHelper.calHp(150),
                        width: sizeHelper.calWp(155),
                        resizeMode: 'contain',
                        alignSelf: 'center',
                        alignItems: 'center',
                    }}
                />

            }

            {!!TerminalConfiguration?.Heading1 &&
                <Text style={[styles.invoiceHeaderText, { marginBottom: 3, fontSize: sizeHelper.calHp(25), alignSelf: "center" }]}>
                    {TerminalConfiguration.Heading1}
                </Text>
            }
            {!!TerminalConfiguration?.Heading2 &&
                <Text style={[styles.invoiceHeaderText, { marginBottom: 3, fontSize: sizeHelper.calHp(25), alignSelf: "center" }]}>
                    {TerminalConfiguration.Heading2}
                </Text>
            }
            {!!TerminalConfiguration?.Heading3 &&
                <Text style={[styles.invoiceHeaderText, { marginBottom: 3, fontSize: sizeHelper.calHp(25), alignSelf: "center" }]}>
                    {TerminalConfiguration.Heading3}
                </Text>
            }
            {!!TerminalConfiguration?.Heading4 &&
                <Text style={[styles.invoiceHeaderText, { marginBottom: 3, fontSize: sizeHelper.calHp(25), alignSelf: "center" }]}>
                    {TerminalConfiguration.Heading4}
                </Text>
            }
            {!!TerminalConfiguration?.CompanyName &&
                <Text style={[styles.invoiceHeaderText, { marginBottom: 10, fontSize: sizeHelper.calHp(35), alignSelf: "center" }]}>
                    {TerminalConfiguration.CompanyName}
                </Text>
            }
            <Text style={[styles.invoiceHeaderText, { marginBottom: 10, fontSize: sizeHelper.calHp(45), alignSelf: "center" }]}>
                {StringsList._183}
            </Text>
            <View style={styles.divider} />

            {amountDetails.map((item, index) => {
                return (
                    <View
                        key={item.title + item.value}
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginTop: sizeHelper.calHp(10),
                        }}>
                        <Text style={{
                            marginTop: sizeHelper.calHp(5),
                            fontSize: sizeHelper.calHp(30),
                            color: AppColor.black,
                            fontFamily: 'Proxima Nova Bold',
                        }}>{item.title}</Text>
                        <View
                        // style={{justifyContent: 'flex-end', alignItems: 'flex-end'}}
                        >
                            <Text style={{
                                marginTop: sizeHelper.calHp(5),
                                fontSize: sizeHelper.calHp(30),
                                color: AppColor.black,
                                fontFamily: 'Proxima Nova Bold',
                            }}>
                                {item.id === 'StartDate'
                                    ? drawerArray[item.id]
                                    : Number(drawerArray[item.id]).toFixed(TerminalConfiguration.DecimalsInAmount)}
                            </Text>
                        </View>
                    </View>
                );
            })}
            <View style={styles.divider} />
            <View

                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: sizeHelper.calHp(10),
                }}>
                <Text style={{
                    marginTop: sizeHelper.calHp(5),
                    fontSize: sizeHelper.calHp(45),
                    color: AppColor.black,
                    fontFamily: 'Proxima Nova Bold',
                }}>{StringsList._165}</Text>
                <View
                // style={{justifyContent: 'flex-end', alignItems: 'flex-end'}}
                >
                    <Text style={{
                        marginTop: sizeHelper.calHp(5),
                        fontSize: sizeHelper.calHp(45),
                        color: AppColor.black,
                        fontFamily: 'Proxima Nova Bold',
                    }}>

                        {Number(Number(drawerArray["CashSales"]) + Number(drawerArray["creditSales"]) + Number(drawerArray["cardSale"])).toFixed(TerminalConfiguration.DecimalsInAmount)}
                    </Text>
                </View>
            </View>
        </ViewShot>

    )


}


const styles = StyleSheet.create({
    invoiceHeaderText: {
        fontSize: sizeHelper.calHp(30),
        color: AppColor.black,
        // fontFamily: 'Proxima Nova Bold',
        fontWeight: "bold"
    },
    divider: {
        width: '100%',
        backgroundColor: AppColor.black,
        height: sizeHelper.calHp(2),
        marginTop: sizeHelper.calHp(15),
        marginBottom: sizeHelper.calHp(10)

    },

})

export default DrawerPrint;