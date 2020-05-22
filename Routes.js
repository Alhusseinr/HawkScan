import React from "react";
import { Router, Scene } from "react-native-router-flux";
import Scan from './components/CameraScan';
import Login from "./components/Login";
import UserInfo from "./components/UserInfo";
import { Text } from 'react-native'

const Title = () => {
    return (<Text style={{fontFamily: 'Didot-Italic'}}>Login</Text>)
}

const Routes = () => (
    <Router>
        <Scene key="root">
            <Scene key="QRScanner" component={Scan} title="Scanner" />
            <Scene key="Login" component={Login} title="Login" initial={true} />
            <Scene key="UserInfo" component={UserInfo} title="User Info" />
        </Scene>
    </Router>
);

export default Routes;
