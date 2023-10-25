import React, { useState } from 'react';

import { Text, View } from 'react-native';

const PercepercentageBarCourse = (props: any) => {

    const [getPercentage, setPercentage] = useState(((props.numerator / props.denominator) * 100).toString() + "%");
    const [getheight, setHeight] = useState(props.height);
    const [numerator, SetNumerator] = useState(props.numerator);
    const [denominator, SetDenominator] = useState(props.denominator);
    const [type, SetType] = useState(props.type);

    return (
        <View style={{ paddingTop: 12 }}>
            <View style={{ justifyContent: 'center' }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <Text style={{ color: "#000000", fontSize: 16 }}>Tiến trình: {props.numerator}%</Text>
                    <Text style={{ color: "#000000", fontSize: 16 }}>Tổng điểm: {props.courseScore}/10</Text>

                </View>
                <View
                    style={{
                        width: '100%',
                        height: getheight,
                        marginVertical: 10,
                        borderRadius: 10,
                        backgroundColor: props.backgroundColor,

                    }}
                >

                </View>
                <View
                    style={{
                        width: getPercentage ? getPercentage : 0,
                        height: getheight,
                        marginVertical: 10,
                        borderRadius: 10,
                        backgroundColor: props.completedColor,
                        position: 'absolute',
                        bottom: 10,

                    }}
                >

                </View>
                <View
                    style={{
                        width: "100%",
                        height: getheight,
                        marginVertical: 10,
                        borderRadius: 10,
                        position: 'absolute',
                        bottom: 10, alignItems: "center", justifyContent: "center",

                    }}
                >
                    {/* <Text style={{ color: "#FFFFFF" }}>30%</Text> */}
                </View>
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
    // return (
    //     <View style={{ paddingTop: 12 }}>
    //         <View style={{ justifyContent: 'center' }}>

    //             <View
    //                 style={{
    //                     width: '100%',
    //                     height: getheight,
    //                     marginVertical: 10,
    //                     borderRadius: 10,
    //                     backgroundColor: props.backgroundColor,

    //                 }}
    //             >

    //             </View>
    //             <View
    //                 style={{
    //                     width: getPercentage ? getPercentage : 0,
    //                     height: getheight,
    //                     marginVertical: 10,
    //                     borderBottomLeftRadius: 10,
    //                     borderTopLeftRadius: 10,
    //                     backgroundColor: props.completedColor,
    //                     position: 'absolute',
    //                     bottom: 20,

    //                 }}
    //             >

    //             </View>
    //             <View
    //                 style={{
    //                     width: "100%",
    //                     height: getheight,
    //                     marginVertical: 10,
    //                     borderBottomLeftRadius: 10,
    //                     borderTopLeftRadius: 10,
    //                     position: 'absolute',
    //                     bottom: 20, alignItems: "center", justifyContent: "center",

    //                 }}
    //             >
    //                 <Text style={{ color: "#FFFFFF" }}>30%</Text>
    //             </View>
    //             <View
    //                 style={{
    //                     width: getPercentage ? getPercentage : 0,
    //                     height: getheight,
    //                     bottom: 10
    //                 }}>

    //             </View>
    //         </View>
    //     </View>
    // );
};
export default PercepercentageBarCourse;