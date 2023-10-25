import React from 'react';
import { Text, TouchableOpacity, View, StyleSheet, Image } from 'react-native';
import childrenDrop from '../../screens/home/chidrenDrop';




const Dropdown = (props: any) => {
    // const {
    //     field: { },
    // } = props;

    // const text = props.Text;
    // const touchableOpacity = props.TouchableOpacity;

    return (
        <View style={{paddingTop: 12}}>
            <Dropdown renderItem={childrenDrop}/>
        </View>
    );
};

const styles = StyleSheet.create({
    button: {

    },
});

export default Dropdown;
