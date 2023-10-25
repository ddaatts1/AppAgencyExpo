import {StyleSheet, Text, View} from "react-native";
import React from "react";
import TransactionType from "../../screens/income/TransactionType";

const CommonTransaction = (props: any) => (
    <View style={{padding: 8}}>
        <View style={styles.transactionContainer}>
            <View style={styles.transactionInforContainer}>
                {props.telephone && <Text style={styles.textTransaction}>Đối tác: {props.telephone}</Text>}
                {props.transactionCode&&<Text style={styles.textTransaction}>Đơn hàng : {props.transactionCode}</Text> }
                {props.exchangeId && <Text style={[styles.textTransaction]}>Giao dịch : {props.exchangeId}</Text> }
                <Text style={{fontSize: 12,color:'#000000'}}>Loại giao dịch: {TransactionType({ val: { type:props.type } })} </Text>
            </View>
            <Text style={[styles.textAmount, {color:  '#009C10'}]}> {props.value}</Text>
        </View>
        <View style={styles.statusContainer}>
            <Text style={props.status == 0 ? styles.textStatus0:props.status == 2 ? styles.textStatus2:styles.textStatus1 }>{props.statusText}</Text>
        </View>
    </View>
);

export default CommonTransaction;

const styles = StyleSheet.create({
    transactionInforContainer: {flexDirection: 'column', justifyContent: 'space-between',width:'70%'},

    transactionContainer: {flexDirection: 'row', justifyContent: 'space-between',},
    textTransaction: {fontSize: 12, fontWeight: '500', color: '#181818'},
    textAmount: {fontSize: 14, fontWeight: 500, color: '#009C10'},
    statusContainer: {flexDirection: 'row', justifyContent: 'flex-end'},
    textStatus1: {
        fontSize: 12,
        fontWeight: '400',
        color: '#0288D1',
        marginTop: 4,
        paddingHorizontal: 6,
        backgroundColor: '#EEFAFF',
        borderRadius: 6,
    },
    textStatus0: {
        fontSize: 12,
        fontWeight: '400',
        color: '#d79c27',
        marginTop: 4,
        paddingHorizontal: 6,
        backgroundColor: '#f6e0a2',
        borderRadius: 6
    },
    textStatus2: {
        fontSize: 12,
        fontWeight: '400',
        color: '#d21028',
        marginTop: 4,
        paddingHorizontal: 6,
        backgroundColor: '#FFF2F0',
        borderRadius: 6
    },
});
