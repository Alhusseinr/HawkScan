import * as React from 'react';
import {Text, View, StyleSheet, AsyncStorage} from 'react-native';
import * as Permissions from 'expo-permissions';
import { Grid } from 'react-native-easy-grid';
import { BarCodeScanner } from 'expo-barcode-scanner';
import axios from 'react-native-axios';
import TopNav from "./TopNav";
import {Actions} from "react-native-router-flux";

export default class BarcodeScannerExample extends React.Component {
    state = {
        hasCameraPermission: null,
        scanned: false,
        profile: {},
        title: 'Scanner',
        subtitle: 'Scan hackers QR code',
        token: this.props.token
    };

    async componentDidMount() {
        this.getPermissionsAsync();
    }

    _verifyToken = async () => {
        try {
            const value = await AsyncStorage.getItem('token');
            if(value !== null){
                axios.get('https://hawkhack.io/api/a/profiles/', { Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlNWVhZGRjMTNjZmYxMzM4OTY3N2IxMSIsImlhdCI6MTU5MDM4MDYxMCwiZXhwIjoxNTkwMzg0MjEwfQ.GuR6WvFgr10tlRpKxd0Q7mwA5VxZAIaxA_1xsEckdHw' })
                    .then(response => {
                        if (response.status === 400) {
                            Actions.Login();
                        }
                    })
                    .catch(e => console.log(e));
                console.log('token in scanner: ', value);
                return value
            }
        } catch (e) {
            console.log(e);
        }
    };

    getPermissionsAsync = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
    };

    CheckIn = () => {
        alert(`${this.state.profile.firstName + ' ' + this.state.profile.lastName} has been checked in`);
    };

    _retrieveToken = async (email) => {
        try {
            const value = await AsyncStorage.getItem('token');
            if(value !== null){
                axios.get(`https://hawkhack.io/api/a/profiles/${email}`, { headers: { Authorization: value } })
                    .then(response => {
                        this.setState({ scanned: true, profile: {
                                firstName: response.data.firstName,
                                lastName: response.data.lastName,
                                email: response.data.email,
                                dateOfBirth: response.data.dateOfBirth,
                                school: response.data.school,
                                status: response.data.status
                            }
                        });
                        console.log('profile: ', this.state.profile);
                    })
                    .catch(e => console.log(e));
                console.log('token in scanner: ', value);
                return value
            }
        } catch (e) {
            console.log(e);
        }
    };

    handleBarCodeScanned = ({ data }) => {
        this._retrieveToken(data);
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
}


