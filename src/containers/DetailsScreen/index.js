import React, { Component } from "react";
import { View, Text } from 'react-native';

class Detail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item: props.route.params.item,
        };
    }

    render() {
        const { navigation } = this.props;
        const { item } = this.state;
        console.log(this.props)
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', margin: 16 }}>
                <Text>{JSON.stringify(item)}</Text>
            </View>
        );
    }
}


export default Detail;