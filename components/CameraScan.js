import * as React from 'react';
import {Text, View, StyleSheet, AsyncStorage} from 'react-native';
import * as Permissions from 'expo-permissions';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { BarCodeScanner } from 'expo-barcode-scanner';
import axios from 'react-native-axios';
import TopNav from "./TopNav";
import UserInfo from "./UserInfo";
import {Actions} from "react-native-router-flux";
const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlNWVhZGRjMTNjZmYxMzM4OTY3N2IxMSIsImlhdCI6MTU5MDM2NDE4MiwiZXhwIjoxNTkwMzY3NzgyfQ.pQ9Y0vfksF_qVmTIZM7KIEEJN_1zlEyh-Oh2iUA_cAA';

export default class BarcodeScannerExample extends React.Component {
    state = {
        hasCameraPermission: null,
        scanned: false,
        profile: {},
        title: 'Scanner',
        subtitle: 'Scan hackers QR code'
    };

    async componentDidMount() {
        this.getPermissionsAsync();
    }

    getPermissionsAsync = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
    };

    CheckIn = () => {
        alert(`${this.state.profile.firstName + ' ' + this.state.profile.lastName} has been checked in`);
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
            <>
                <TopNav title={this.state.title} subtitle={this.state.subtitle} />
                <Grid>
                    {scanned  ?
                        Actions.UserInfo({
                            profile: this.state.profile,
                            scanned: this.state.scanned
                        })
                        :
                        <BarCodeScanner
                            onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
                            style={StyleSheet.absoluteFillObject}
                        />
                    }
                </Grid>
            </>
        );
    }

    handleBarCodeScanned = ({ data }) => {
        axios.get(`https://hawkhack.io/api/a/profiles/${data}`, { headers: { Authorization: token } })
            .then(response => {
                this.setState({ scanned: true, profile: {
                        firstName: response.data.firstName,
                        lastName: response.data.lastName,
                        email: response.data.email,
                        dateOfBirth: response.data.dateOfBirth,
                        school: response.data.school,
                        status: response.data.status
                    } });
                console.log('profile: ', this.state.profile);
            })
            .catch(e => console.log(e));
    };
}


