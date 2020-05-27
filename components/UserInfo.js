import React, { Component } from "react";
import {AsyncStorage, StyleSheet, Text} from "react-native";
import { Grid, Row, Col } from "react-native-easy-grid";
import { Button } from "react-native-paper";
import {Actions} from "react-native-router-flux";
import TopNav from "./TopNav";
import axios from "react-native-axios";

const columns = {
    firstName: 'First Name: ',
    lastName: 'Last Name: ',
    email: 'Email: ',
    dateOfBirth: 'Date Of Birth: ',
    school: 'School: ',
    status: 'Status: '
};

class UserInfo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            profile: this.props.profile,
            scanned: this.props.scanned,
            title: 'Hacker\'s Information',
            subtitle: 'Check hackers ID'
        }
    }

    componentWillMount() {
        this._verifyToken()
    }

    _verifyToken = async () => {
        try {
            const value = await AsyncStorage.getItem('token');
            if(value !== null){
                axios.get('https://hawkhack.io/api/a/profiles/', { Authorization: value })
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

    formatDate = (date) => {
        const newDate = date.substring(0, 10);
        return newDate;
    };

    render() {
        return(
            <>
                <TopNav title={this.state.title} subtitle={this.state.subtitle} />
                <Row>
                    <Grid>
                        <Row style={{ margin: 20 }} size={70}>
                            <Col style={{ alignItems: 'center' }}>
                                {Object.keys(this.state.profile).map((key) => {
                                    return(
                                        <Grid key={key}>
                                            <Col>
                                                <Text style={styles.leftCol}>
                                                    {columns[key]}
                                                </Text>
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
                                    onPress={() => {
                                        this.setState({ scanned: false, profile: {} });
                                        Actions.QRScanner({ scanned: this.state.scanned, profile: this.state.profile });
                                    }}
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
            </>
        )
    }
}

const styles = StyleSheet.create({
    text: {
        fontSize: 24,
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

export default UserInfo;

