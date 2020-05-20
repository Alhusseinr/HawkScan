import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";

const RaisedButton = (props: any) => <Button raised {...props} style={{ marginTop: 50 }} />;

const list = [
    {
        title: 'Appointments',
        icon: 'av-timer'
    },
    {
        title: 'Trips',
        icon: 'flight-takeoff'
    },
];

const Listed = () => {
    return(
        <View>
            {
                list.map((list, i) => (
                    <>
                        <ListItem
                            key={i}
                            title={list.title}
                            leftIcon={{ name: list.icon }}
                            bottomDivider
                            chevron
                        />
                    </>
                ))
            }
        </View>
    )
};

const App = () => {
    return <RaisedButton title="yeah" />;
};

const Headers = () => {
    return(
        <Header
            leftComponent={{ icon: 'menu', color: '#fff' }}
            centerComponent={{ text: 'MY TITLE', style: { color: '#fff' } }}
            rightComponent={{ icon: 'home', color: '#fff' }}
        />
    )
};

export default () => {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);

    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    };

    if(hasPermission === null) {
        return <Text>Requesting for camera permission</Text>
    }
    if(hasPermission === false) {
        return <Text>No Access to camera</Text>
    }

    return(
        <View
            style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'flex-end'
            }}
        >
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={StyleSheet.propertyIsEnumerable}
            />

            {scanned && <Button title={'Tap to scan again'} onPress={() => setScanned(false)}/>}
        </View>
    );
}


