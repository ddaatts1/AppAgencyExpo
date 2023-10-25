import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
  } from 'react-native';
  import React from 'react';
import { ROUTES } from '../../../../constants';

const Category = ({navigation, dataCategory}: any) => {
    return (
        <View style={styles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                horizontal={true}
            >
                <View style={{ width: '50%' }}>
                    {dataCategory?.map((item: any, index: any) => {
                        return (
                            <TouchableOpacity key={index}>
                                <View style={styles.category}>
                                    <Text style={styles.titleNews}>{item.cat_name}</Text>
                                </View>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </ScrollView>
        </View>

    );
};


const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: '#fff',
    },
    box: {
        width: '95%',
        marginLeft: 9,
        marginRight: 9,
        marginBottom: 300,
        marginTop: 24,
    },
    box1: {
        width: '100%',
        flexDirection: 'row',
        marginBottom: 16,
    },
    tab: {
        width: '95%',
        marginTop: 50,
        marginLeft: 9,
        marginRight: 9,
        backgroundColor: '#fff',
        borderRadius: 53,
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 10,
    },
    button1: {
        width: '50%',
        borderRadius: 55,
    },
    text: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '700',
    },
    image: {
        // width: '40%',
        // borderRadius: 8,
        resizeMode: 'cover',
        width: 160,
        height: 120,
        borderRadius: 8,
        marginRight: 10,
    },
    headerText: {
        fontFamily: 'Roboto',
        fontSize: 18,
        fontStyle: 'normal',
        fontWeight: '600',
        color: '#0288D1',
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: '500',
        fontStyle: 'normal',
        fontFamily: 'Roboto',
        color: '#181818',
    },
    category: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#0288D1',
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: 8,
        paddingRight: 42,
        paddingLeft: 40,
        marginRight: 10,
        paddingTop: 30,
        paddingBottom: 30,
    },
    titleNews: {
        fontSize: 16,
        fontWeight: '500',
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        color: '#181818',
    },
});
export default Category;
