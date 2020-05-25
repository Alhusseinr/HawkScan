import React from "react";
import { Router, Scene } from "react-native-router-flux";
import Scan from './components/CameraScan';
import Login from "./components/Login";
import UserInfo from "./components/UserInfo";
import TopNav from "./components/TopNav";

const Routes = () => (
    <>
        <Router navigationBarStyle={{ backgroundColor: '#E9190F' }}>
            <Scene key="root">
                <Scene key="QRScanner" component={Scan} title="Scanner" hideNavBar={true} />
                <Scene key="Login" component={Login} title="Login" initial={true} hideNavBar={true} />
                <Scene key="UserInfo" component={UserInfo} title="User Info" hideNavBar={true} />
            </Scene>
        </Router>
    </>

);

export default Routes;
