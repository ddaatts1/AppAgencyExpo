import React from "react";
import { StyleSheet, Text, View } from "react-native";

const CommonItemMission = (props: any) => {
    return (
        <View style={borderCheck(props.isNoBorder).container}>
            {props.svg}
            <View style={styles.textContainer}>
                <Text style={styles.textStyle}>{props.text}</Text>
            </View>
        </View>
    );
};

export default CommonItemMission;

const borderCheck = (isNoBorder :boolean) => StyleSheet.create({
    container: {
        flexDirection: 'row', 
        width: '100%', 
        paddingVertical: 8,
        borderBottom: 'none',
        borderBottomColor: isNoBorder ? 'transparent' : '#EEEEEE', 
        borderBottomWidth: isNoBorder ? 0 : 1
    },

});

const styles = StyleSheet.create({
    container: {flexDirection: 'row', width: '100%', paddingVertical: 8, borderBottomColor: '#EEEEEE', borderBottomWidth: 1},
    textStyle: {fontSize: 14, fontWeight: '500', color: '#323232'},
    textContainer: {paddingLeft: 6, justifyContent: 'center'},
});