import React, { Component } from 'react';
import { AppRegistry, View } from "react-native";
import Routes from './Routes';

if(__DEV__) {
    import('./ReactotronConfig').then(() => console.log('Reactotron Configured'))
}

export default class App extends Component {
    render() {
        return (
            <Routes />
        );
    }
}

AppRegistry.registerComponent('App', () => App);
