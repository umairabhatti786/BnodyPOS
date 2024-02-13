/**
 * Created by januslo on 2018/12/27.
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { replace } from 'formik';
import React, { useState, useEffect } from 'react';
import {
    ActivityIndicator,
    Platform,
    StyleSheet,
    Text,
    View,
    Button,
    ScrollView,
    DeviceEventEmitter,
    NativeEventEmitter,
    Switch,
    TouchableOpacity,
    Dimensions,
    ToastAndroid,
    NativeModules,

} from 'react-native';
// import {
//     BluetoothEscposPrinter,
//     BluetoothManager,
//     BluetoothTscPrinter,

// } from 'react-native-bluetooth-escpos-printer';
// import EscPosPrinter, {
//     getPrinterSeriesByName,
//     IPrinter,
//     pairingBluetoothPrinter
// } from 'react-native-esc-pos-printer';
// import RNPrint from 'react-native-print';
// import RNPosPrinter from 'react-native-pos-printer';




import { createIconSetFromFontello } from 'react-native-vector-icons';
import CustomButton from '../components/CustomButton';
import AppColor from '../constant/AppColor';
import sizeHelper from '../helpers/sizeHelper';

import { getData } from '../sqliteHelper';
//  import EscPos from "./escpos";
//  import Tsc from "./tsc";

var { height, width } = Dimensions.get('window');


const PrinterTesting = (props) => {



    const [devices, setDevices] = useState()
    const [pairedDs, setpairedDs] = useState([])
    const [foundDs, setfoundDs] = useState([])
    const [bleOpend, setbleOpend] = useState()
    const [loading, setloading] = useState()
    const [boundAddress, setboundAddress] = useState()
    const [debugMsg, setdebugMsg] = useState()
    const [name, setname] = useState()
    const [printerStatus, setPrinterStatus] = useState("Not Connected")
    const columnWidths = [12, 6, 6, 8];

    const { PrinterNativeModule } = NativeModules;
    useEffect(async () => {


    }, [])

    const _renderRow = (rows) => {
        console.log("row.........", rows)
        let items = [];
        for (let i in rows) {
            let row = rows[i];
            if (row.identifier) {
                items.push(
                    <TouchableOpacity

                        key={new Date().getTime() + i}
                        style={styles.wtf}
                        onPress={async () => {
                            setloading(true)
                            if (printerStatus === "Not Connected") {
                                await EscPosPrinter.init({
                                    target: "00:00:05:01:E0:46",
                                    seriesName: getPrinterSeriesByName(row.name),
                                    // language: 'EPOS2_LANG_EN',
                                });
                                EscPosPrinter.getPrinterCharsPerLine(getPrinterSeriesByName(row.name))
                                    .then((result) => {
                                        console.log("PRINTER_PAGE_SIZ.E", result)
                                        AsyncStorage.setItem("PRINTER_PAGE_SIZE", String(result.fontA))
                                    }) // { fontA: 48 }
                                    .catch((e) => console.log('error:', e.message));
                                const status = await EscPosPrinter.startMonitorPrinter();

                                console.log('Printer status:', status);
                            } else {
                                alert("Another Device Connected")
                            }

                            // BluetoothManager.connect(row.address).then(
                            //   s => {
                            //     setloading(false)
                            //     setboundAddress(row.address)
                            //     setname(row.name || 'UNKNOWN')

                            //   },
                            //   e => {
                            //     setloading(false)
                            //     alert(e);
                            //   },
                            //  );
                        }
                        }>
                        <Text style={styles.name}>{row.name || 'UNKNOWN'}</Text>
                        <Text style={styles.address}>{row.identifier}</Text>
                    </TouchableOpacity >,
                );
            }
        }
        return items;
    }
    const _scan = async () => {

        setloading(true)

        EscPosPrinter.discover()
            .then(async printers => {
                console.log('_scan...done!', printers);
                setloading(false)
                setfoundDs(printers)
                if (printers.length === 0) {
                    // setPrinter(printers[0]);
                    // await EscPosPrinter.init({
                    //   target: printers[0].target,
                    //   seriesName: getPrinterSeriesByName(printers[0].name),
                    //   language: 'EPOS2_LANG_EN',
                    // });


                    // const status = await EscPosPrinter.getPrinterCharsPerLine(
                    //   getPrinterSeriesByName(printers[0].name),
                    // );
                    // console.log('print', status);

                    alert("No Device Found , Try Again")
                } else {

                }
            })
            .catch(console.log);
    }

    return (
        <View></View>
        // <ScrollView style={styles.container}>
        //   <Text>{debugMsg}</Text>
        //   {/* <Text>{JSON.stringify( state, null, 3)}</Text> */}
        //   <Text style={styles.title}>
        //     Blutooth Opended:{bleOpend ? 'true' : 'false'}{' '}
        //     <Text>Open BLE Before Scanning</Text>{' '}
        //   </Text>
        //   <View>
        //     <Switch
        //       value={bleOpend}
        //       onValueChange={v => {
        //         setloading(false)
        //         if (!v) {
        //           BluetoothManager.disableBluetooth().then(
        //             () => {
        //               setloading(false)
        //               setbleOpend(false)
        //               setfoundDs([])
        //               setpairedDs([])

        //             },
        //             err => {
        //               alert(err);
        //             },
        //           );
        //         } else {
        //           BluetoothManager.enableBluetooth().then(
        //             r => {
        //               var paired = [];
        //               if (r && r.length > 0) {
        //                 for (var i = 0; i < r.length; i++) {
        //                   try {
        //                     paired.push(JSON.parse(r[i]));
        //                   } catch (e) {
        //                     //ignore
        //                   }
        //                 }
        //               }
        //               setloading(false)
        //               setbleOpend(true)

        //               setpairedDs(paired)

        //             },
        //             err => {
        //               setloading(false)
        //               alert(err);
        //             },
        //           );
        //         }
        //       }}
        //     />
        //     <Button
        //       disabled={loading || !bleOpend}
        //       onPress={() => {
        //         _scan();
        //       }}
        //       title="Scan"
        //     />
        //   </View>
        //   <Text style={styles.title}>
        //     Connection:
        //     <Text style={{ color: 'blue' }}>
        //       {printerStatus}
        //     </Text>
        //   </Text>
        //   <Text style={styles.title}>Found(tap to connect):</Text>
        //   {loading ? <ActivityIndicator animating={true} /> : null}
        //   <View style={{ flex: 1, flexDirection: 'column' }}>
        //     {_renderRow(foundDs)}
        //   </View>
        //   <View style={{ flex: 1, alignSelf: "center", marginTop: sizeHelper.calHp(25) }}>
        //     <CustomButton
        //       containerStyle={{
        //         height: sizeHelper.calWp(46),
        //         width: sizeHelper.calWp(166.66)
        //       }}
        //       title={"Test Printer"}
        //       onPressButton={async () => {

        //         // await BluetoothTscPrinter.printLable(options)
        //         // BluetoothEscposPrinter.printLable(options)

        //         const printing = new EscPosPrinter.printing();
        //         const status = await printing
        //           .initialize()
        //           .align('center')
        //           .size(2, 1)
        //           .text('welcome to Bnody')
        //           .smooth(true)
        //           .newline(1)
        //           .text('Mobile POS')
        //           .smooth(false)


        //           .newline(2)
        //           .align('center')



        //           .cut()
        //           .send();

        //         console.log('printing', status);


        //         // BluetoothTscPrinter.PrinterTesting()
        //         // console.log("BluetoothTscPrinter", BluetoothTscPrinter)
        //         //  BluetoothTscPrinter.printLable(options)
        //       }}
        //       isDisabled={printerStatus === "Not Connected"}
        //       backgroundColor={AppColor.blue2}
        //     />
        //   </View>

        // </ScrollView>
    )
}




const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },

    title: {
        width: width,
        backgroundColor: '#eee',
        color: '#232323',
        paddingLeft: 8,
        paddingVertical: 4,
        textAlign: 'left',
    },
    wtf: {
        marginHorizontal: sizeHelper.calWp(20),
        height: sizeHelper.calHp(50),
        marginVertical: 2,
        flex: 1,
        paddingHorizontal: sizeHelper.calWp(10),
        flexDirection: 'row',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: AppColor.blue2,
        justifyContent: 'space-between',
        alignItems: 'center',
        elevation: 40
    },
    name: {
        flex: 1,
        textAlign: 'left',
    },
    address: {
        flex: 1,
        textAlign: 'right',
    },
});

export default PrinterTesting