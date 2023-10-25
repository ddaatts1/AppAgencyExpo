import { StyleSheet, Text, View } from "react-native";
import { SVG } from "../../constants";
import React from "react";

const CommonDashboardOffice = (props: any) => {
    return (
        <View style={colorStyle(props.color, props.isLeft, props.isRight, props.isForIncome).containerDashboard}>

            <View style={{ flexDirection: 'column' }}>
                {props.iconSVG}
                <Text style={styles.title}>
                    {props.title}
                </Text>
                <Text style={styles.content}>
                    {props.content}
                </Text>
            </View>
            <View style={[styles.iconBackground, {position:'absolute',right:0, zIndex: -1 }]}>
                {props.iconSVGBackground}
            </View>
        </View>
    );
};

export default CommonDashboardOffice;

const colorStyle = (color: string, isLeft: boolean = false, isRight: boolean = false, isForIncome: boolean = false) => StyleSheet.create({
    containerDashboard: {
        minWidth:98,
        minHeight:98,
        backgroundColor: color,
        paddingLeft: 10,
        paddingTop: 9,
        marginVertical: 4,
        marginLeft: isLeft ? 0 : 4,
        marginRight: isRight ? 0 : 4,
        width: isForIncome ? '49%' : '48%',
        flexDirection: 'row',
        borderRadius: 16,
    },
});

const styles = StyleSheet.create({
    title: { fontSize: 14, fontWeight: '400', color: '#fff', paddingTop: 10 },
    content: { fontSize: 14, fontWeight: '500', color: '#fff' },
    iconBackground: { flexDirection: 'row' }
});
