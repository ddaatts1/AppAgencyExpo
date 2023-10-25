import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { STYLES, SVG } from "../../constants";

const ErrorText = ({ children, textName }: any) => {


    return (
        <View style={styles.viewErrorText}>


            <Text style={styles.errorText}>
                <SVG.Icon_group /> {textName}
            </Text>

        </View>
    );
};
export default ErrorText;
const styles = StyleSheet.create({

    errorText: {
        fontSize: 14,
        paddingLeft: 10,
        paddingRight: 10,
        top: 0,
        borderRadius: 15,
        color: 'red',
        textAlignVertical: "center",
        backgroundColor: '#FFF2F0',

    },

    viewErrorText: {
        paddingTop: 5,
        alignItems: 'center',
        justifyContent: "center",




    },
});


