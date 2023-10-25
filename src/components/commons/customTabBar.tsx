import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import React, { useEffect, useState } from 'react';

const CustomTabBar = ({ state, descriptors, navigation, display }: any) => {

    const handleTabPress = (routeIndex: any) => {
        const { key, name } = state.routes[routeIndex];
        const event = navigation.emit({
            type: 'tabPress',
            target: key,
            canPreventDefault: true,
        });

        if (!event.defaultPrevented) {
            navigation.navigate(name);
        }
    };

    return (
        <View style={styles.tabBarShadow}>
            <View style={[styles.tabBarStyle, display && { display: "none" }]}>
                {/* <View style={styles.tabBarStyle}> */}

                {state.routes.map((route: any, index: any) => {
                    const { options } = descriptors[route.key];
                    const label = options.title !== undefined ? options.title : route.name;
                    const isFocused = state.index === index;

                    return (
                        <TouchableWithoutFeedback
                            key={route.key}
                            onPress={() => handleTabPress(index)}
                        >
                            <View key={route.key} style={{ flex: 1, alignItems: 'center', paddingTop: 10 }}>
                                {options.tabBarIcon && (
                                    <View>{options.tabBarIcon({ focused: isFocused })}</View>
                                )}
                                <Text style={{
                                    color: isFocused ? '#0288D1' : '#525252',
                                    textAlign: 'center',
                                    paddingHorizontal: 18,
                                    paddingBottom: 10
                                }}
                                >
                                    {options.tabBarLabel}
                                </Text>
                            </View>
                        </TouchableWithoutFeedback>
                    );
                })}
            </View>
        </View >
    );
};

export default CustomTabBar;

const styles = StyleSheet.create({
    tabBarShadow: {
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: {
            width: 5,
            height: 5,
        },
        shadowOpacity: 0.5,
        shadowRadius: 2.22,
        elevation: 5,
    },
    tabBarStyle: {

        flexDirection: 'row',
        backgroundColor: '#fff',
        overflow: 'hidden',
    },
});
