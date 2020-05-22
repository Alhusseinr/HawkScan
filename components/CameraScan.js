import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import * as Permissions from 'expo-permissions';
import { Button } from 'react-native-paper';
import { Col, Row, Grid } from 'react-native-easy-grid';


import { BarCodeScanner } from 'expo-barcode-scanner';

export default class BarcodeScannerExample extends React.Component {
    state = {
        hasCameraPermission: null,
        scanned: false,
        email: ''
    };

    async componentDidMount() {
        this.getPermissionsAsync();
    }

    getPermissionsAsync = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
    };

    CheckIn = () => {
        alert(`${this.state.email} has been checked in`);
    };

    render() {
        const { hasCameraPermission, scanned } = this.state;

        if (hasCameraPermission === null) {
            return <Text>Requesting for camera permission</Text>;
        }
        if (hasCameraPermission === false) {
            return <Text>No access to camera</Text>;
        }
        return (
            <Grid>
                {scanned  ?
                    <Row>
                        <Grid style={{ width: '100%' }}>
                            <Row style={{ margin: 10 }} size={80}>
                                <Text><Text style={{ fontWeight: "bold" }}>User Email:</Text> {this.state.email}</Text>
                            </Row>
                            <Row style={{ width: '100%' }} size={20}>
                                <Col>
                                    <Button
                                        mode="contained" style={{ padding: 5, margin: 5 }} color="#E9190F"
                                        title={'Scan Again'}
                                        onPress={() => this.setState({ scanned: false })}
                                    >
                                        Scan Again
                                    </Button>
                                </Col>
                                <Col>
                                    <Button
                                        mode="contained" style={{ padding: 5, margin: 5 }} color="#3ad53a"
                                        title={'Check In'}
                                        onPress={() => this.CheckIn()}
                                    >
                                        Check In
                                    </Button>
                                </Col>
                            </Row>
                        </Grid>
                    </Row>
                    :
                    <BarCodeScanner
                        onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
                        style={StyleSheet.absoluteFillObject}
                    />
                }
            </Grid>
        );
    }

    handleBarCodeScanned = ({ data }) => {
        this.setState({ scanned: true, email: data });
    };
}
