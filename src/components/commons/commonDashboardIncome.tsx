import {StyleSheet, Text, View} from "react-native";
import {SVG} from "../../constants";
import React from "react";

const CommonDashboardIncome = (props: any) => {
    return (
        <View style={colorStyle(props.color).containerDashboard}>
            <View style={{flexDirection: 'row', alignItems: 'center', paddingLeft: 9}}>
                {props.iconSVG}
                <View style={{flexDirection: 'column', paddingLeft: 21}}>
                    <Text style={styles.title}>
                        {props.title}
                    </Text>
                    <Text style={styles.content}>
                        {props.content}
                    </Text>
                </View>
            </View>
            <View style={styles.iconBackground}>
                {props.iconSVGBackground}
            </View>
        </View>
    );
};

export default CommonDashboardIncome;

const colorStyle = (color: string) => StyleSheet.create({
    containerDashboard: {
        backgroundColor: color,
        paddingLeft: 10,
        paddingTop: 9,
        margin: 4,
        width: '100%',
        flexDirection: 'row',
        borderRadius: 16,
        justifyContent: 'space-between',
    },
});

const styles = StyleSheet.create({
    title: {fontSize: 16, fontWeight: 400, color: '#fff'},
    content: {fontSize: 16, fontWeight: 500, color: '#fff'},
    iconBackground: {flexDirection: 'row', paddingRight: 5}
});
