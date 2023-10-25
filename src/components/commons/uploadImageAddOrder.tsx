import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { SVG } from "../../constants";
import Toast from "react-native-simple-toast";

const UploadImageAddOrder = (props: any) => {
    const [selectedImages, setSelectedImages] = useState([]);
    const { customStyles, placeHolder, imageLimit: propImageLimit } = props;
    const imageLimit = propImageLimit || 5;
    const [imageLimitReached, setImageLimitReached] = useState(false);
    const [noImagesSelected, setNoImagesSelected] = useState(true);

    const setSelectedImageBase64 = props.setSelectedImageBase64;

    // const selectImages = async () => {
    //     if (selectedImages.length >= imageLimit) {
    //         setImageLimitReached(true);
    //         return;
    //     }
    //
    //     try {
    //         const images = await ImagePicker.openPicker({
    //             multiple: true,
    //             mediaType: 'photo',
    //             includeBase64: true
    //         });
    //
    //         if (images.length === 0) {
    //             setNoImagesSelected(true);
    //             return;
    //         }
    //
    //         const imageURIs = images.map((image) => image.path);
    //
    //         setSelectedImageBase64((prevImages) => [...prevImages, ...images]);
    //         setSelectedImages((prevImages) => [...prevImages, ...imageURIs]);
    //         setNoImagesSelected(false);
    //     } catch (error) {
    //         console.log('Error selecting images:', error);
    //     }
    // };


    //
    const selectImages = async () => {
        try {
            const images = await ImagePicker.openPicker({
                multiple: true,
                mediaType: 'photo',
                includeBase64: true
            });

            if (images.length === 0) {
                setNoImagesSelected(true);
                return;
            }

            const validImages = images.filter(image => {
                // Check if the image format is JPEG, PNG, or HEIC
                const allowedFormats = ['image/jpeg', 'image/png', 'image/heic'];
                if (!allowedFormats.includes(image.mime)) {
                    Toast.show('Vui lòng tải ảnh đúng định dạng JPEG, PNG hoặc HEIC');
                    return false;
                }

                // Check if the image size is within the limit (5MB)
                const maxSizeInBytes = 5 * 1024 * 1024; // 5MB in bytes
                if (image.size > maxSizeInBytes) {
                    Toast.show('Ảnh tải lên có dung lượng vượt quá 5MB, vui lòng thử lại');
                    return false;
                }

                return true;
            });

            if (validImages.length === 0) {
                setImageLimitReached(false);
                return;
            }

            const imageURIs = validImages.map((image) => image.path);

            setSelectedImageBase64((prevImages) => [...prevImages, ...validImages]);
            setSelectedImages((prevImages) => [...prevImages, ...imageURIs]);
            setNoImagesSelected(false);
        } catch (error) {
            console.log('Error selecting images:', error);
        }
    };

    //

    const removeImage = (index) => {
        setSelectedImages((prevImages) => {
            const updatedImages = [...prevImages];
            updatedImages.splice(index, 1);
            return updatedImages;
        });
        setSelectedImageBase64((prevImages) => {
            const updatedImages = [...prevImages];
            updatedImages.splice(index, 1);
            return updatedImages;
        });
        setImageLimitReached(false);

    };

    return (
        <View style={customStyles == undefined ? styles.containerUpload : customStyles}>
            <Text style={styles.textImage}>{props.textImage}{props.textImage && <Text style={{ color: 'red' }}>*</Text>}</Text>
            <View style={styles.borderDashed}>
                <TouchableOpacity style={styles.textImageUpload} onPress={selectImages}>
                    <View style={{ alignItems: 'center' }}>
                        <SVG.IconUploadFile />
                    </View>
                </TouchableOpacity>
                <Text style={{ fontWeight: "normal", color: 'grey', fontSize: 12 }}>{placeHolder} </Text>

                {selectedImages.map((uri, index) => (
                    <View key={index} style={{ flexDirection: 'row', alignItems: 'center' ,backgroundColor:'#ffffff',width:'80%',marginBottom:10,borderRadius:10,padding:5,justifyContent:"space-between"}}>
                        <Image source={{ uri: uri }} style={{ width: 50, height: 50, marginRight: 10,borderRadius:10 }} />
                        <View style={{marginRight:10}}>
                            <TouchableOpacity onPress={() => removeImage(index)}>
                                <Text style={{  fontSize: 20,color:'#000000' }}>X</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}

                {imageLimitReached && <Text style={{ color: 'red' }}>Bạn chỉ có thể chọn tối đa {imageLimit} ảnh.</Text>}
                {noImagesSelected && <Text style={{ color: 'red' }}>{props.textImage && `Vui lòng tải ${props.textImage.toString().toLocaleLowerCase()}`}</Text>}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    containerUpload: { paddingTop: 24, paddingBottom: 12, width: '100%' },
    textImage: {
        fontSize: 12,
        color: '#323232',
        alignSelf: 'center',
        paddingBottom: 8,
    },
    borderDashed: {
        paddingVertical: 8,
        borderStyle: 'dashed',
        borderColor: '#0288D1',
        borderWidth: 1,
        borderRadius: 8,
        alignItems: 'center',
        backgroundColor:'#EEFAFF'
    },
    textImageUpload: { fontSize: 14, fontWeight: 'bold', color: '#323232', paddingTop: 6, width: '100%', textAlign: "center" },
});

export default UploadImageAddOrder;
