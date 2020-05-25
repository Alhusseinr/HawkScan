import * as React from "react";
import {
    Keyboard, StyleSheet,
    Text, View, KeyboardAvoidingView,
    TouchableWithoutFeedback, Platform,
    AsyncStorage
} from "react-native";
import { Actions } from "react-native-router-flux";
import { TextInput, Button, HelperText } from 'react-native-paper';
import axios from 'react-native-axios';

const theme = {
    colors: { primary: '#E9190F', underlayColor: 'transparent'}
};

class LoginScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            errors: {},
            token: null
        }
    }

    handleEmailChange = (email) => {
        this.setState({ email: email });
    };

    handlePasswordChange = (password) => {
        this.setState({ password: password });
    };

    handleLogin = () => {
        const { email, password } = this.state;
        const errors = this.isEmpty(email, password);
        this.setState({ errors });

        if (Object.keys(errors).length === 0) {
            axios.post('https://hawkhack.io/api/u/login', { email, password })
                .then(response => {
                    console.log(response);
                    if(response.status === 200) {
                        if(this.state.token === null) {
                            this.setState({ token: response.data.token });
                            Actions.QRScanner();
                        } else if (this.state.token) {
                            alert('An account is already logged in, please try again');
                            this.setState({ token: null });
                        }
                    } else if(response.status === 400) {
                        alert('Something went wrong, please try again');
                    }
                }).catch(e => {
                    console.log(e);
                    throw e;
                });
        }
    };

    setTokenValue(token) {
        console.log('here in setting token');
        AsyncStorage.setItem('different name', 'Hard coded token', () => {}).then(r => {console.log(r)}).catch(e => console.log(e));
    }

    isEmpty = (email, password) => {
        const errors = {};
        if(!email) errors.email = "Email can't be blank";
        if(!password) errors.password = "Password can't be blank";
        return errors;
    };

    render() {
        return(
            <KeyboardAvoidingView
                behavior={Platform.OS == "ios" ? "padding": "height" }
                style={styles.outsideContainer}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.container}>
                        <Text style={styles.logo}>HawkHack</Text>
                        <View style={styles.form}>
                                <TextInput
                                    value={this.state.email}
                                    onChangeText={this.handleEmailChange}
                                    label="Email"
                                    compact={true}
                                    selectionColor="red"
                                    mode="outlined"
                                    theme={theme}
                                />
                                {this.state.errors.email ?
                                    <HelperText type="error">
                                        {this.state.errors.email}
                                    </HelperText>
                                    :
                                    <Text></Text>
                                }

                            <TextInput
                                value={this.state.password}
                                onChangeText={this.handlePasswordChange}
                                label="Password"
                                style={{ marginTop: 15 }}
                                mode="outlined"
                                theme={theme}
                                secureTextEntry={true}
                            />
                            {this.state.errors.password ?
                                <HelperText type="error">
                                    {this.state.errors.password}
                                </HelperText>
                                :
                                <Text></Text>
                            }
                            <Button title="LOGIN" onPress={this.handleLogin} mode="contained" style={{ marginTop: 15, padding: 5 }} color="#E9190F" >
                                Login
                            </Button>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: "center",
        justifyContent: 'space-between',
    },
    form: {
        flex: 1,
        justifyContent: "center",
        width: "80%"
    },
    outsideContainer: {
        flex: 1,
    },
    inner: {
        padding: 24,
        flex: 1,
        justifyContent: "space-around"
    },
    header: {
        fontSize: 36,
        marginBottom: 48
    },
    textInput: {
        height: 40,
        borderColor: "#000000",
        borderBottomWidth: 1,
        marginBottom: 36
    },
    btnContainer: {
        backgroundColor: "white",
        marginTop: 12
    },
    logo: {
        fontSize: 52,
        width: '80%',
        marginTop: 75,
        textAlign: 'center',
        fontFamily: 'Didot-Italic'
    }
});

export default LoginScreen;
