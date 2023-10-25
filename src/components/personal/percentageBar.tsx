import React, { useState } from 'react';

import { Text, View } from 'react-native';

const PercentageBar = (props: any) => {
    const [getPercentage, setPercentage] = useState(((props.numerator / props.denominator) * 100).toString() + "%");
    const [getheight, setHeight] = useState(props.height);
    const [numerator, SetNumerator] = useState(props.numerator);
    const [denominator, SetDenominator] = useState(props.denominator);
    const [type, SetType] = useState(props.type);


    return (
        <View style={{ paddingTop: 12 }}>
            <View style={{ justifyContent: 'center' }}>
                <Text style={{ textAlign: 'center', color: "#525252" }}>{numerator}/{denominator} {type ? type : ''}</Text>
                <View
                    style={{

                        width: '100%',
                        height: getheight,
                        marginVertical: 10,
                        borderRadius: 10,
                        backgroundColor: props.backgroundColor,

                    }}
                />
                <View
                    style={{
                        width: getPercentage ? getPercentage : 0,
                        height: getheight,
                        marginVertical: 10,
                        borderBottomLeftRadius: 10,
                        borderTopLeftRadius: 10,
                        backgroundColor: props.completedColor,
                        position: 'absolute',
                        bottom: 20
                    }}
                />

                <View
                    style={{
                        width: getPercentage ? getPercentage : 0,
                        height: getheight,
                        bottom: 10
                    }}>

                </View>
            </View>
        </View>
    );
};
export default PercentageBar;