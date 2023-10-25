import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, TextInput, TouchableOpacity, ScrollView} from 'react-native';
import { ROUTES, SVG } from '../../../constants';
import { ImageLibraryOptions, MediaType, launchImageLibrary } from 'react-native-image-picker';
import ModalPoup from '../../../components/commons/modalPoup';
import { StackNavigationProp } from '@react-navigation/stack';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import UploadImageAddOrder from "../../../components/commons/uploadImageAddOrder";
import {StorageHelper} from "../../../services/api/auth";
import LoadingReact from "../../../components/commons/loading";
import useSupport from "../useSupport";
import Toast from "react-native-simple-toast";

const Feedback = () => {
    const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
    const [dataImageBefore, setDataImageBefore] = useState<any>(null);
    const [imageBeforeCard, setImageBeforeCard] = useState<any>(null);
    const [showImage, setShowImage] = useState(false);
    const [sendSuccess, setSendSuccess] = useState(false);
    const [selectedImageBase64,setSelectedImageBase64]: any = useState([])

    const [text, setText] = useState('');

    const handleTextChange = (newText:any) => {
        setText(newText);
    };
    const {feedbackData,isFeedback,Feedback} = useSupport()

    const [user, setUser]:any = useState(null);
    const [token,setToken]: any = useState(null)
    const [isLoading, setIsLoading] =useState(false)
    useEffect(() => {
        const fetchUser = async () => {
            try {
                setIsLoading(true)
                const userData = await StorageHelper.getUser();
                const tokenData = await StorageHelper.getToken();
                setToken(tokenData)
                setUser(userData);
            } catch (error) {
                console.error('Error fetching user:', error);
            }finally {
                setIsLoading(false)
            }
        };
        fetchUser();
    }, []);


    // useEffect(()=>{
    //
    //     if(user){
    //         console.log("user: "+ JSON.stringify(user))
    //     }
    //     if(token){
    //         console.log("token: "+ JSON.stringify(token))
    //     }
    // },[user,token])


    const options: ImageLibraryOptions = {
        selectionLimit: 1,
        mediaType: 'photo' as MediaType,
        includeBase64: false,
      };
    const onButtonImageLibrary = React.useCallback((index: any) => {
        if (index === 1) {
          launchImageLibrary(options, (response) => {
            if (response.assets) {

              const imageAssetsArray = response.assets[0].uri;
              setDataImageBefore({ uri: response.assets[0].uri, name: response.assets[0].fileName, type: response.assets[0].type });
              setImageBeforeCard(imageAssetsArray);
            }
          });
        }
        setShowImage(true);
      }, []);
    const openSelectAVata = async (type: number) => {
        onButtonImageLibrary(type);
      };

    function send() {
        const  data = {
            token : token+'s',
            content: text,
            image: selectedImageBase64[0] && `data:${selectedImageBase64[0].mime};base64,${selectedImageBase64[0].data}`
        }

        Feedback(data)
    }


    useEffect(()=>{
        if(feedbackData){
            if(feedbackData?.status == 200){
                setSendSuccess(true)
            }else {
                Toast.show(feedbackData?.message||"  Lỗi",2)
            }
        }
    },[feedbackData])

    return (
        <View style={styles.container}>
            <ScrollView>
                {isLoading? <LoadingReact/> :             <View style={styles.box}>
                    <View style={{width: '93%', marginBottom: 24, backgroundColor: '#fff', padding: 12, borderRadius: 8}}>
                        <View style={styles.info}>
                            <Text style={styles.titleInfo}>Họ tên:</Text>
                            <Text style={styles.infoDetail}>{user?.fullname}</Text>
                        </View>
                        <View style={styles.info}>
                            <Text style={styles.titleInfo}>Số điện thoại:</Text>
                            <Text style={styles.infoDetail}>{user?.telephone}</Text>
                        </View>
                    </View>
                    <View>
                        <View>
                            <Text style={styles.textTitle}>Nội dung góp ý</Text>
                        </View>
                        <View>
                            <TextInput
                                numberOfLines={8}
                                multiline={true}
                                style={styles.textInput}
                                onChangeText={handleTextChange}
                                value={text}
                                textAlignVertical="top"
                            />
                        </View>
                    </View>
                    {/*<View style={{flexDirection: 'row',*/}
                    {/*    justifyContent: 'center', marginTop: 24}}>*/}
                    {/*        <View style={{alignItems: 'center', borderStyle: 'dashed', borderColor: '#0288D1', borderWidth: 1, paddingRight: 19, paddingLeft: 19}}>*/}
                    {/*        <TouchableOpacity*/}
                    {/*        onPress={() => openSelectAVata(1)}*/}
                    {/*        style={styles.image}>*/}
                    {/*        <SVG.Icon_upload/>*/}

                    {/*        <Text*/}
                    {/*            style={{*/}
                    {/*            color: '#323232',*/}
                    {/*            fontSize: 16,*/}
                    {/*            paddingLeft: 10,*/}
                    {/*            }}>*/}
                    {/*            Tải ảnh đính kèm (nếu có)*/}
                    {/*        </Text>*/}
                    {/*        </TouchableOpacity>*/}
                    {/*        </View>*/}
                    {/*</View>*/}
                    <View style={styles.groupUpload}>
                        <View style={{width: 300 }}>
                            <UploadImageAddOrder placeHolder={"Tải ảnh đính kèm (nếu có)"} setSelectedImageBase64={setSelectedImageBase64}/>

                        </View>


                    </View>
                    <View style={{width: '100%', marginBottom: 250}}>
                        <TouchableOpacity disabled={isFeedback} onPress={() => send()}>
                            <View style={{marginTop: 40, backgroundColor: '#0288D1', width: '93%', paddingTop: 14, paddingBottom: 14, paddingRight: 32, paddingLeft: 32, borderRadius: 12}}>
                                <Text style={styles.textBtn}>Gửi thông tin</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                }
            <ModalPoup visible={sendSuccess}>
                <View style={{marginBottom: 44}}>
                    <View style={{justifyContent: 'center', alignItems: 'center', marginBottom: 24}}>
                        <SVG.Icon_Success_Star/>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 16, textAlign: 'center', fontWeight: '400', color: '#03AA00', fontFamily: 'Roboto', fontStyle: 'normal' }}>Gửi đi thành công </Text>
                    </View>
                </View>
                <TouchableOpacity
                    onPress={() => setSendSuccess(false)}
                    style={{width: '100%', justifyContent: 'center', alignItems: 'center'}}
                >
                    <View style={styles.loginBtn}>
                        <Text style={{ color: '#FFF', fontSize: 16, paddingLeft: 10, fontWeight: '500', textAlign: 'center' }}>OK</Text>
                    </View>
                </TouchableOpacity>

            </ModalPoup>
            </ScrollView>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: '#EEFAFF',
    },
    box: {
        width: '100%',
        marginTop: 24,
        marginLeft: 16,
    },
    textBtn: {
        fontFamily: 'Roboto',
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '500',
        color: '#fff',
        textAlign: 'center',
    },
    info: {
        flexDirection: 'row',
    },
    image: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    textTitle: {
        fontFamily: 'Roboto',
        fontSize: 18,
        fontStyle: 'normal',
        fontWeight: '600',
        color: '#323232',
        marginBottom: 8,
    },
    infoDetail: {
        width: '40%',
        fontFamily: 'Roboto',
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '500',
        color: '#323232',
        textAlign: 'right',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginLeft: 20,
    },
    titleInfo: {
        width: '40%',
        fontFamily: 'Roboto',
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '400',
        color: '#323232',
    },
    loginBtn: {
        width: '80%',
        paddingTop: 14,
        paddingBottom: 14,
        paddingRight: 32,
        paddingLeft: 32,
        borderRadius: 12,
        marginBottom: 16,
        backgroundColor: '#0288D1',
    },     groupUpload: {flexDirection: 'row',
        justifyContent: 'center',
        width:'90%',
    },textInput: {
        color:'#000000',
        width: '93%',
        backgroundColor: '#fff',
        borderRadius: 16,

    },


});

export default Feedback;
