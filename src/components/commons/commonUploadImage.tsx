import {Image, StyleSheet, Text, View} from "react-native";
import {SVG} from "../../constants";
import React from "react";

const CommonUploadImage = (props: any) => {
    console.log("image : "+ props.image)
    return (
        <View style={styles.containerUpload}>
            <Text style={styles.textImage}>{props.textImage}</Text>

            {/*{props.image == undefined ?        <View style={styles.borderDashed}>*/}
            {/*            <SVG.IconUploadFile></SVG.IconUploadFile>*/}
            {/*        <Text style={styles.textImageUpload}>Nhấn để tải ảnh lên</Text>*/}

            {/*</View>:      */}
                <View style={styles.borderDashed}>
                      <Image source = {{uri:props.image}}
                                     style = {{ width: 100, height: 100,borderRadius: 8, }}

                    />

            </View>

        </View>
    );
};


export default CommonUploadImage;

const styles = StyleSheet.create({
    containerUpload: {paddingTop: 24, paddingBottom: 12, width: '46%'},
    textImage: {fontSize: 14, fontWeight: 400, color: '#323232', alignSelf: 'center', paddingBottom: 8},
    borderDashed: {
        // paddingVertical: 8,
        borderStyle: 'dashed',
        borderColor: '#0288D1',
        borderWidth: 1,
        borderRadius: 8,
        alignItems: 'center',
        height:120,
        width: 150

    },
    textImageUpload: {fontSize: 14, fontWeight: 400, color: '#323232', paddingTop: 6},
});

