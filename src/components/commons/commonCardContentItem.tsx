import {StyleSheet, Text, View} from "react-native";
import React from "react";

const CardContentItem = (props: any) => (
    <View style={{justifyContent: 'space-between',}}>
        <View style={styles.groupTextRightShadow}>
            <Text style={styles.titleGroupRightShadow}>
                {props.title}
            </Text>
            <Text style={styles.contentGroupRightShadow}>
                {props.content}
            </Text>
        </View>
    </View>
);

export default CardContentItem;

const styles = StyleSheet.create({
    titleGroupRightShadow: {
        color: '#525252',
        fontSize: 14,
        fontWeight: '400',
        paddingLeft: 10
    },
    contentGroupRightShadow: {
        color: '#323232',
        fontSize: 14,
        fontWeight: '500',
        paddingRight: 10
    },
    groupTextRightShadow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 4,
        borderBottomWidth: 1,
        borderBottomColor: '#EEEEEE'
    }
});