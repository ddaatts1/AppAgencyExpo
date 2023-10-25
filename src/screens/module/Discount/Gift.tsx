import React from 'react';
import {StyleSheet, Text, View} from 'react-native';


const Gift = () => {
    return (
        <View style={styles.container}>
            <View style={styles.box}>
                <Text style={styles.headerTitle}>01 Áo FutureLang</Text>
                <Text style={styles.description}>Màu trắng, Size M</Text>
            </View>
            <View style={styles.box}>
                <Text style={styles.headerTitle}>01 Balo FutureLang</Text>
                <Text style={styles.description}>Màu trắng, Size M</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '95%',
        backgroundColor: '#EEFAFF',
        borderRadius: 8,
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 10,
        paddingRight: 10,
    },
    box: {
        backgroundColor: '#fff',
        padding: 6,
        borderRadius: 12,
        marginBottom: 7,
    },
    headerTitle: {
        fontSize: 16,
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: '500',
        color: '#323232',
    },
    description: {
        fontSize: 12,
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: '400',
        color: '#323232',
    },
});

export default Gift;
