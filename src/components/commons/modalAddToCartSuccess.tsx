import ModalPoup from "./modalPoup";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {ROUTES, SVG} from "../../constants";
import React, {useEffect, useState} from "react";
import {ParamListBase, useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";


const ModalAddToCartSuccess=(props:any)=>{
    const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
    const {addSuccess,setAddSuccess} = props
    useEffect(()=>{


        if (addSuccess) {
            const timeout = setTimeout(() => {
                setAddSuccess(false);
            }, 4000);

            return () => clearTimeout(timeout);
        }


    },[addSuccess])
    return(
        <ModalPoup visible={addSuccess}>

            <TouchableOpacity
                style={{  justifyContent: 'flex-end', alignItems: 'flex-end',right: 0 }}
                onPress={() => { setAddSuccess(false)}}
            >
                <SVG.Icon_close style={{ right: 0 }} />
            </TouchableOpacity>


            <View style={{width: '100%', flexDirection: 'row',marginBottom:20,justifyContent:"center"}}>
                <SVG.Check/>
            </View>
            <Text style={{ marginBottom: 20, fontSize: 16,fontWeight:"bold", textAlign: 'center', color: '#30bf08' }}>
                Sản phẩm đã được thêm vào giỏ hàng!
            </Text>
            <View style={{width: '100%', flexDirection: 'row',marginBottom:20,justifyContent:"center"}}>
                <TouchableOpacity
                    onPress={() => navigation.navigate(ROUTES.CART)}
                    style={[{backgroundColor: '#0288D1'}, styles.loginBtn]}>
                    <Text style={{ color: '#FFF', fontSize: 16, paddingLeft: 10, fontWeight: '500' }}>xem giỏ hàng</Text>
                </TouchableOpacity>
            </View>
        </ModalPoup>

    )
}


export default ModalAddToCartSuccess




const styles = StyleSheet.create({
    loginBtn: {
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 14,
        paddingBottom: 14,
        paddingRight: 32,
        paddingLeft: 32,
        width: '70%',
        borderRadius: 12,
    },
})
