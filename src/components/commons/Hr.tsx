import { StyleSheet, View } from 'react-native';
import React from 'react';

const Hr = () => {
    return (
        <View style={styles.hr} />
    );
};

const styles = StyleSheet.create({
    hr: {
        width: '100%',
        borderBottomColor: '#F3F3F3',
        borderBottomWidth: 4,
        // marginTop: 16,
        // marginBottom: 16,
    },
});
export default Hr;
