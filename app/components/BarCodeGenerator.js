import React from 'react';
import { Text, View, Dimensions } from 'react-native';
//import Barcode from '@kichiyaki/react-native-barcode-generator';

const BarCodeGenerator = () => {
    return (
        <View>
            <Text style={{ fontSize: 72, textAlign: 'center', marginBottom: 30 }}>
                Examples
            </Text>
            {/* <Barcode
                format="codabar"
                value="906793-1"
                text="new"
                style={{ marginBottom: 40 }}
                maxWidth={Dimensions.get('window').width / 2}
            /> */}

        </View>
    );
};

export default BarCodeGenerator;