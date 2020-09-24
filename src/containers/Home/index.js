import React, { Component } from "react";
import { TouchableOpacity, View, Text, ActivityIndicator, FlatList } from 'react-native';
import _ from "loadsh";
import axios from 'axios';
import styles from "./styles";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isTimmerStarted: false,
            currentPage: 0,
            postData: [],
            loader: true,
            flatListData: [],
            totalDataInList: 0
        };
    }

    getPosts = () => {
        const { isTimmerStarted } = this.state;
        if (!isTimmerStarted) {
            const { currentPage, postData } = this.state;
            axios.get(`https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${currentPage}`).then(result => {

                this.setState({
                    isTimmerStarted: true,
                    loader: false,
                    currentPage: currentPage + 1,
                    postData: [...postData, ...result.data.hits],
                    flatListData: [...postData, ...result.data.hits],
                    totalDataInList: result.data.hits.length
                }, () => this.getPosts());

            });

        } else {
            setInterval(() => {
                const { currentPage, postData } = this.state;
                if (currentPage < 50) {
                    axios.get(`https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${currentPage}`).then(result => {

                        this.setState({ currentPage: currentPage + 1, postData: [...postData, ...result.data.hits] })
                    })
                }

            }, 10000)
        }


    }

    loadMore = () => {
        const { postData, totalDataInList, flatListData } = this.state;
        const data = [...postData];
        const newData = data.slice(totalDataInList, totalDataInList + 20);

        if (postData.length > flatListData.length) {
            this.setState({ flatListData: [...flatListData, ...data], totalDataInList: totalDataInList + 20 });
        }

    }

    componentDidMount() {
        this.getPosts();
    }

    render() {
        const { navigation } = this.props;
        const { loader, flatListData, totalDataInList, postData } = this.state;
        if (loader) {
            return (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator size="large" color="red" />
                </View >
            )
        }

        return (
            <View style={{ margin: 16 }}>
                <FlatList
                    ListHeaderComponent={() => <Text style={{ fontSize: 16, fontWeight: 'bold', margin: 10 }}>Available Result: ({postData.length}) </Text>}
                    data={flatListData}
                    renderItem={({ item }) => {

                        const { title, url, author, created_at } = item;
                        const date = new Date(created_at);
                        const fullDate = date.getMonth() + '/' + date.getFullYear();
                        return (
                            <TouchableOpacity onPress={() => navigation.navigate('Details', { item })} style={{ margin: 10, borderBottomColor: 'gray', borderBottomWidth: 2, paddingBottom: 10 }}>
                                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{title}</Text>
                                <Text style={{ fontSize: 14, marginBottom: 5 }}>by {author} on {fullDate}</Text>
                                <Text style={{ fontSize: 10, }}>{url}</Text>
                            </TouchableOpacity>
                        )
                    }}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item) => item.objectID}
                    onEndReached={this.loadMore}
                />
            </View>
        );
    }
}



export default Home