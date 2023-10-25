import {StyleSheet, Text, View} from "react-native";
import React from "react";
import {SVG} from "../../constants";

const BoxIcon = (props: any) => (
    <View style={styles.groupShadow}>
        <View style={styles.groupTextShadow}>
            <View>
                {props.child}
            </View>
            <View style={{flexDirection: 'column', marginLeft: 40, width: '65%',}}>
                <Text style={styles.titleGroupShadow}>
                    {props.title}
                </Text>
                {props.content}
            </View>
            <View style={{alignSelf: 'center', paddingLeft: 14}}>
                {props.icon}
            </View>
        </View>
    </View>
);

export default BoxIcon;

const styles = StyleSheet.create({
    titleGroupShadow: {
        color: '#0288D1',
        fontSize: 14,
        fontWeight: 400
    },
    contentGroupShadow: {
        color: '#323232',
        fontSize: 14,
        fontWeight: '500',
        marginTop: 8
    },
    groupTextShadow: {
        flexDirection: 'row',
        //paddingBottom: 8
    },
    groupShadow: {
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 12,
        //...StyleSheet.absoluteFillObject,
        shadowColor: '#0288D1',
        shadowOpacity: 1,
        shadowRadius: 10,
        elevation: 5,
        padding: 7,
        marginTop: 10
    },
});