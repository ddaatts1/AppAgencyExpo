import {StyleSheet, Text, View} from "react-native";
import React from "react";

const BoxShadow = (props: any) => (
    <View style={styles.groupTextShadow}>
        <Text style={styles.titleGroupShadow}>
            {props.title}:
        </Text>
        <Text style={[styles.contentGroupShadow, {fontSize: props.isBlack ? 14 : 18}, {color: props.isBlack ? '#323232' : '#0288D1'}]}>
            {props.content}
        </Text>
    </View>
);

export default BoxShadow;

const styles = StyleSheet.create({
    titleGroupShadow: {
        color: '#323232',
        fontSize: 14,
    },
    contentGroupShadow: {
        color: '#0288D1',
        fontSize: 18,
        fontWeight: '500'
    },
    groupTextShadow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 8
    }
});