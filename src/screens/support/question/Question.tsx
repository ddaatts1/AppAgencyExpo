import React, { useState } from 'react';
import {Text, View, StyleSheet, TextInput, ScrollView, TouchableWithoutFeedback} from 'react-native';
import dataQuestion from '../../../../ultidata/dataQuestion';
import { SVG } from '../../../constants';

const Question = () => {
    const [content, setContent] = React.useState(false);
    return (
        <View style={styles.container}>
            <ScrollView>
            <View style={{ width: '100%', marginTop: 24, marginLeft: 16, marginBottom: 250, position: 'relative'}}>
            {
                dataQuestion.map((item:any, index: any) => {
                    return (
                        <View key={index}>
                            <View  style={{width: '93%', flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', marginTop: 8, padding: 8, borderRadius: 16 }}>
                            <View style={{width: '95%', flexDirection: 'row', alignItems: 'center'}}>
                                <View style={{borderRadius: 53, padding: 9, backgroundColor: '#EDBD40'}}>
                                    <SVG.Icon_Question_App/>
                                </View>
                                <View style={styles.textTitle}>
                                    <Text>
                                        {item.title}
                                    </Text>
                                </View>
                            </View>
                            <TouchableWithoutFeedback style={{width: '5%'}} onPress={() => setContent(!content)}>
                                <View>
                                    {
                                        (index.isActive && content)
                                        ? <SVG.Icon_dropdown_search_open color="#525252"/> : <SVG.Icon_dropdown_search_close color="#525252"/>
                                    }

                                </View>
                            </TouchableWithoutFeedback>
                            </View>
                            {
                                content ?
                                <TextInput
                                    style={{ width: '93%', backgroundColor: '#fff', textAlignVertical: 'top' }}
                                    underlineColorAndroid="transparent"
                                    placeholder="Type something"
                                    placeholderTextColor="grey"
                                    numberOfLines={10}
                                    multiline={true}
                                    editable={false}
                                />
                                :
                                null
                            }

                        </View>
                    );
                })
            }
            </View>
            </ScrollView>
        </View>
    );

};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: '#EEFAFF',
    },
    textTitle: {
        fontFamily: 'Roboto',
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '500',
        color: '#323232',
        marginLeft: 12,
    },
});

export default Question;
