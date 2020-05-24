import * as React from 'react';
import {Text, View, StyleSheet, AsyncStorage} from 'react-native';
import * as Permissions from 'expo-permissions';
import { Button } from 'react-native-paper';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { BarCodeScanner } from 'expo-barcode-scanner';
import axios from 'react-native-axios';
const token = '';

const columns = {
    firstName: 'First Name: ',
    lastName: 'Last Name: ',
    email: 'Email: ',
    dateOfBirth: 'Date Of Birth: ',
    school: 'School: ',
    status: 'Status: '
};

export default class BarcodeScannerExample extends React.Component {
    state = {
        hasCameraPermission: null,
        scanned: false,
        profile: {}
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

    formatDate = (date) => {
        const newDate = date.substring(0, 10);
        return newDate;
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
                        <Grid>
                            <Row style={{ margin: 20 }} size={70}>
                                <Col style={{ alignItems: 'center' }}>
                                    {Object.keys(this.state.profile).map((key) => {
                                        return(
                                                <Grid>
                                                    <Col>
                                                        <Text style={styles.leftCol}>
                                                            {columns[key]}
                                                        </Text>
                                                    </Col>
                                                    <Col>
                                                        <Text style={styles.text}>
                                                            {key === 'dateOfBirth' ? this.formatDate(this.state.profile[key]) : this.state.profile[key]}
                                                        </Text>
                                                    </Col>
                                                </Grid>

                                        )
                                    })}
                                    <Row></Row>
                                </Col>
                            </Row>
                            <Row style={{ width: '100%' }} size={30}>
                                <Col>
                                    <Button
                                        mode="contained" style={styles.btn} color="#E9190F"
                                        title={'Scan Again'}
                                        onPress={() => this.setState({ scanned: false, profile: {} })}
                                    >
                                        Scan Again
                                    </Button>
                                </Col>
                                <Col>
                                    <Button
                                        mode="contained" style={styles.btn} color="#3ad53a"
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

        console.log('data: ', data);

        axios.get(`https://hawkhack.io/api/a/profiles/${data}`, { headers: {Authorization: token} })
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

const styles = StyleSheet.create({
    text: {
        fontSize: 20,
    },
    leftCol:{
        fontWeight: "bold",
        fontSize: 26
    },
    btn: {
        margin: 5,
        padding: 25
    },

});
