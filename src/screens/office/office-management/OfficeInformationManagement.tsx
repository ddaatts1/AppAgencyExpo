import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

const OfficeInformationManagement = ({ navigation }: { navigation: any }) => {
    return (
        <View style={styles.view}>
            <Text>OfficeInformation</Text>
        </View>
    );
};

export default OfficeInformationManagement;
const styles = StyleSheet.create({
    view: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    }
});
