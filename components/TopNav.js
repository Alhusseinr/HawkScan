import React, { Component } from "react";
import { Appbar } from "react-native-paper";
import {AsyncStorage} from "react-native";
import {Actions} from "react-native-router-flux";

export default class TopNav extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: this.props.title,
            subtitle: this.props.subtitle
        }
    }

    _removeToken = async () => {
        try{
            await AsyncStorage.removeItem('token');
        } catch (e) {
            console.log(e);
        }
    };

    goBack = () => {
        this._removeToken();
        Actions.Login();
    };

    render() {
        return (
            <Appbar.Header style={{ backgroundColor: '#E9190F' }}>
                <Appbar.Content
                    title={this.state.title}
                    subtitle={this.state.subtitle}
                />
                {this.state.title === 'Login' ?
                    <Appbar.Action disabled={true} icon='label' onPress={() => this.goBack()}/>  : <Appbar.Action icon='label' onPress={() => this.goBack()}/> }
            </Appbar.Header>
        );
    }
}

