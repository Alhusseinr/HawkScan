import * as React from "react";
import { Image, StyleSheet, View } from "react-native";
import { Button } from 'react-native-elements';
import FormTextInput from "./FormTextInput";
import {Actions} from "react-native-router-flux";

class LoginScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: ""
        }
    }

    handleEmailChange = (email) => {
        this.setState({email: email});
    };

    handlePasswordChange = (password) => {
        this.setState({password: password});
    };

    handleLoginPress = () => {
        Actions.QRScanner();
    };

    render() {
        return(
            <View style={styles.container}>
                <Image />
                <View style={styles.form}>
                    <FormTextInput
                        value={this.state.email}
                        onChangeText={this.handleEmailChange}
                        placeholder="Email"
                    />
                    <FormTextInput
                        value={this.state.password}
                        onChangeText={this.handlePasswordChange}
                        placeholder="Password"
                    />
                    <Button title="LOGIN" onPress={this.handleLoginPress} />
                </View>
            </View>
        )
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
    button: {
        padding: 20
    },
    logo: {
        flex: 1,
        width: '100%',
        alignSelf: "center"
    }
});

export default LoginScreen;
