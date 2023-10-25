import ModalPoup from "./modalPoup";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {SVG} from "../../constants";
import React from "react";

const CommonMessageModal = (props:any) => {
    return (
        <View style={{ flex: 1 }}>
            <ModalPoup visible={props.isIntroModel} closeIcon={true}>
                <TouchableOpacity onPress={() => props.setIntroModel(false)}>
                    <View style={{alignSelf: 'flex-end'}}>
                        <SVG.Icon_close style={{width: 24, height: 24}}></SVG.Icon_close>
                    </View>
                </TouchableOpacity>
                {props.image}
                <View style={styles.containerModal}>
                    <Text style={[styles.message, props.image != null ? {marginTop: 0} : null]}>
                        {props.message}
                    </Text>
                    <TouchableOpacity onPress={() => props.setIntroModel(false)}>
                        <View style={styles.loginBtn}>
                            <Text style={styles.buttonText}>
                                {props.buttonText}
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>

            </ModalPoup>
        </View>
    );
}

export default CommonMessageModal;

const styles = StyleSheet.create({
    loginBtn: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        width: '60%',
        height: 50,
        backgroundColor: '#0288D1',
        borderRadius: 12,
    },
    message: {
        marginTop: 45,
        marginBottom: 52,
        fontSize: 16,
        textAlign: 'center',
        color: '#323232',
    },
    containerModal: {
        marginTop: 20,
        marginBottom: 10,
        marginHorizontal: 10
    },
    buttonText: { color: '#FFFFFF', fontSize: 16, paddingLeft: 10, fontWeight: 500, textAlign: 'center' },
});