import { StyleSheet, View, Image, StatusBar } from 'react-native';
import React from 'react';
import Slider from './SliderHome';


const Headers = () => {
    return (
        <View style={styles.header}>
            <StatusBar />
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        position: 'relative',
        top: 30,
    },

});

export default Headers;
