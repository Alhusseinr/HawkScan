import * as React from "react";
import {
    Keyboard, StyleSheet,
    Text, View, KeyboardAvoidingView,
    TouchableWithoutFeedback, Platform,
} from "react-native";
import { Actions } from "react-native-router-flux";
import { TextInput, Button, HelperText } from 'react-native-paper';

const theme = {
    colors: { primary: '#E9190F', underlayColor: 'transparent'}
};

class LoginScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            errors: {}
        }
    }

    handleEmailChange = (email) => {
        this.setState({email: email});
    };

    handlePasswordChange = (password) => {
        this.setState({password: password});
    };

    handleLogin = () => {
        const { email, password } = this.state;
        const errors = this.isEmpty(email, password);
        this.setState({ errors });

        if (Object.keys(errors).length === 0) {
            Actions.QRScanner();
        }
    };

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
