import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {SVG} from "../../constants";
import React from "react";
import CustomDropdownDetailsCustomer from "./customDropDownDetailsCustomer";
import CustomDropdownDetailCustomer from "./CustomDropdownDetailCustomer";
import {Field, Formik} from "formik";
import {AgencyLevelArray} from "../../constants/AgencyLevelArray";
import BoxIcon from "./commonBoxIcon";
import CardContentItem from "./commonCardContentItem";
import CustomInputForNote from "./commonInputForNote";
import Dropdown from "./customDropdown";
import CustomDropDownIncome from "./CustomDropDownIncome";

const CommonTitleAccountBalance = (props: any) => {

    const {setStatus} = props
    return (

        <View style={styles.titleAccountBalance}>
            <Text style={styles.textAccountBalance}>Số dư khả dụng: {props.amount}</Text>
            <View style={styles.iconAccountBalance}>
                {/*<CustomDropdownDetailsCustomer/>*/}
                {/*<SVG.IconFilter width={20} height={20}/>*/}

                <CustomDropDownIncome
                    setStatus={setStatus}
                />
            </View>
        </View>
    );
}

export default CommonTitleAccountBalance;

const styles = StyleSheet.create({
    titleAccountBalance: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#EEEEEE',
        zIndex:99
    },
    textAccountBalance: {fontSize: 16, fontWeight: '500', color: '#323232'},
    iconAccountBalance: {justifyContent: 'center'},
});
