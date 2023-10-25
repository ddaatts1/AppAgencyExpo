import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React from "react";

const CommonButton = (props: any) => {
    const handleSubmit = props.handleSubmit;
    const text = props.text;
    const width = props.width;
    return (
        <TouchableOpacity
            onPress={handleSubmit}
            style={widthBtn(width).commonBtn}>
            <View style={{ flexDirection: "row", }}>
                <Text style={styles.textBtn}>{text}</Text>
            </View>
        </TouchableOpacity>
    );
}

export default CommonButton;

const widthBtn = (width :string) => StyleSheet.create({
    commonBtn: {
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        width: width != null ? width : '100%',
        height: 50,
        backgroundColor: '#0288D1',
        borderRadius: 12,
    },

});

const styles = StyleSheet.create({
    textBtn: { color: '#FFFFFF', fontSize: 16, fontWeight: 500 }
});