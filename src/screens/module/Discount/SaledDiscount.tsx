import React, { useState } from 'react';

import { Text, View } from 'react-native';

const SaledDiscount = (props: any) => {
    const [getPercentage, setPercentage] = useState(((props.numerator / props.denominator) * 100).toString() + '%');
    const [getheight, setHeight] = useState(props.height);
    const [numerator, SetNumerator] = useState(props.numerator);
    const [denominator, SetDenominator] = useState(props.denominator);
    const [type, SetType] = useState(props.type);


    return (
        <View>
            <View style={{ justifyContent: 'center' }}>

                <View
                    style={{
                        width: '100%',
                        height: getheight,
                        // marginVertical: 10,
                        //borderRadius: 10,
                        backgroundColor: props.backgroundColor,

                    }}
                 />
                <View
                    style={{
                        width: getPercentage ? getPercentage : 0,
                        height: getheight,
                        // marginVertical: 10,
                        // borderBottomLeftRadius: 10,
                        // borderTopLeftRadius: 10,
                        backgroundColor: props.completedColor,
                        position: 'absolute',
                        bottom: 20,

                    }}
                 />
                <View
                    style={{
                        width: '100%',
                        height: getheight,
                        // marginVertical: 10,
                        // borderBottomLeftRadius: 10,
                        // borderTopLeftRadius: 10,
                        position: 'absolute',
                        bottom: 20,
                        alignItems: 'center', justifyContent: 'center',

                    }}
                >
                    <Text style={{ color: '#FFFFFF' }}>ĐÃ BÁN 5</Text>
                </View>
                <View
                    style={{
                        width: getPercentage ? getPercentage : 0,
                        height: getheight,
                        bottom: 10,
                    }} />
            </View>
        </View>
    );
};
export default SaledDiscount;
