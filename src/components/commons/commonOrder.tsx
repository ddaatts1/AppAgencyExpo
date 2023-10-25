import {StyleSheet, Text, View} from "react-native";
import React from "react";

const CommonOrder = (props: any) => (
    <View style={{padding: 8, flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={styles.transactionContainer}>
            <Text style={styles.textTransaction}>Đối tác: {props.partner}</Text>
            <Text style={styles.textTransaction}>Đơn hàng: {props.orderId}</Text>
            <Text style={styles.textTypeTransaction}>Loại giao dịch: {props.transactionType}</Text>
        </View>
        <View style={styles.statusContainer}>
            <Text style={[styles.textAmount, {color: props.type == 1 ? '#009C10' : '#323232'}]}>{props.type == 1 ? '+' : '-'} {props.value}</Text>
            <Text style={styles.textStatus}>{props.statusText}</Text>
        </View>
    </View>
);

export default CommonOrder;

const styles = StyleSheet.create({
    transactionContainer: {flexDirection: 'column',},
    textTransaction: {fontSize: 12, fontWeight: '500', color: '#181818'},
    textTypeTransaction: {fontSize: 12, fontWeight: '400', color: '#323232'},
    textAmount: {fontSize: 14, fontWeight: '500', color: '#009C10'},
    statusContainer: {flexDirection: 'column',},
    textStatus: {
        alignSelf: 'center',
        fontSize: 12,
        fontWeight: '400',
        color: '#0288D1',
        marginTop: 4,
        paddingHorizontal: 6,
        backgroundColor: '#EEFAFF',
        borderRadius: 16,
    },
});
