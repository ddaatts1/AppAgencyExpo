import React from 'react';
import {Text, TouchableOpacity, StyleSheet, View} from 'react-native';
import {COLORS, ROUTES, SVG} from '../../constants';

const SupportManagement = ({ navigation }: { navigation: any }) => {

    const listMenu = [
        {
            text: 'Chat với kĩ thuật',
            route: ROUTES.SUPPORT_CHAT,
            background: '#D762CB',
        },
        {
            text: 'SĐT Hỗ trợ',
            route: ROUTES.SUPPORT_PHONE_NUMBER,
            background: '#41CC60',
        },
        {
            text: 'Câu hỏi thường gặp',
            route: ROUTES.SUPPORT_QUESTION,
            background: '#E05641',
        },
        {
            text: 'Góp ý với sản phẩm',
            route: ROUTES.SUPPORT_FEEDBACK,
            background: '#F99725',
        },
        {
            text: 'Hướng dẫn',
            route: ROUTES.SUPPORT_INSTRUCT,
            background: '#3BBF39',
        },
        {
            text: 'Cộng đồng',
            route: ROUTES.SUPPORT_COMMUNITY,
            background: '#0FCCB5',
        },
    ];

    const menuItem = (text: string, index: number, route: string, background: string) => (
        <TouchableOpacity key={index}
            onPress={() => navigation.navigate(route)}
            // name={ROUTES.SETTINGS_NAVIGATOR}
            //component={CustomerNavigator}
            style={[styles.button, {backgroundColor: background}]}
            activeOpacity={0.8}>
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
                {route === ROUTES.SUPPORT_COMMUNITY ? <SVG.Icon_Group/> : ''}
                {route === ROUTES.SUPPORT_INSTRUCT ? <SVG.Icon_Guide/> : ''}
                {route === ROUTES.SUPPORT_FEEDBACK ? <SVG.Icon_Feedback/> : ''}
                {route === ROUTES.SUPPORT_QUESTION ? <SVG.Icon_Questions/> : ''}
                {route === ROUTES.SUPPORT_PHONE_NUMBER ? <SVG.Icon_Phone_Support/> : ''}
                {route === ROUTES.SUPPORT_CHAT ? <SVG.Icon_Tech/> : ''}
            </View>
            <Text style={styles.buttonText}>{text}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.view}>
            {
                listMenu.map((item, index) => menuItem(listMenu[index].text, index, listMenu[index].route, listMenu[index].background))
            }
            </View>
        </View>

    );
};

export default SupportManagement;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: '#fff',

    },
    view: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingTop: 24,
        marginLeft: 16,
        marginBottom: 300,
    },
    button: {
        backgroundColor: COLORS.primary,
        // shadow: rgba(215, 98, 203, 0.20),
        paddingTop: 12,
        paddingBottom: 12,
        paddingRight: 19,
        paddingLeft: 19,
        borderRadius: 16,
        fontSize: 18,
        marginRight: 8,
        marginBottom: 8,
        width: '45%',
    },
    buttonText: {
        color: '#fff',
        fontWeight: '500',
        textAlign: 'center',
        fontFamily: 'Roboto',
        fontSize: 14,
        fontStyle: 'normal',
        marginTop: 7.5,
    },
});

