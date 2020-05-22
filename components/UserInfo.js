import React, { Component } from "react";
import {Text} from "react-native";

class UserInfo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: props.email
        }
    }

    render() {
        return(
            <Text>{this.state.email}</Text>
        )
    }

}

export default UserInfo;

