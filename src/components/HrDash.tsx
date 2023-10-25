import { StyleSheet, View } from 'react-native';
import React from 'react';

const HrDash = () => {
    return (
        <View style={styles.hrDash} />
    );
};

const styles = StyleSheet.create({
    hrDash: {
        width: '100%',
        borderBottomColor: '#F3F3F3',
        borderBottomWidth: 4,
        borderStyle: 'dashed',
    },
});
export default HrDash;
