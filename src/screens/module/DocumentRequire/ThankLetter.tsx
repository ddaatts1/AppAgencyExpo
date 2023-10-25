import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Image,
    useWindowDimensions,
    Dimensions
} from 'react-native';
import React, {useEffect, useState} from 'react';
import { SVG } from '../../../constants';
import routes from '../../../constants/routes';
import { StackNavigationProp } from '@react-navigation/stack';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import ModalPoup from '../../../components/commons/modalPoup';
import useArchives from "../Mission/useArchies";
import HTML from 'react-native-render-html';
import WebView from "react-native-webview";

const ThankLetter = ({route}:any) => {
    const [show, setShow] = useState(true);
    const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
    const { width } = useWindowDimensions();
    const {archivesDetailData,fetchArchivesDetail,isFetchingArchivesDetail,tickedArchivesData,tickArchives,isTickingArchives} = useArchives()
    const id = route?.params?.id
    const [dataToShow,setDataToShow] =useState("")


    useEffect(()=>{

        const fetchData =async ()=>{
            fetchArchivesDetail(id)
        }

        fetchData()
    },[])



    useEffect(()=>{
        if(archivesDetailData){
            console.log("archivesDetailData: "+ JSON.stringify(archivesDetailData))
            const modifiedContent = archivesDetailData?.data?.content?.replace(
                /src=\"\/\//g,
                'src="https://'
            );

            console.log("modifiedContent: "+ JSON.stringify(modifiedContent))
            setDataToShow(modifiedContent)

        }



    },[archivesDetailData])

    async  function submit() {

        const data = {
            id: id
        }

        await tickArchives(data)

        navigation.navigate(routes.HOME)
    }

    const customHTMLElementModels = {
        iframe: {
            contentModel: "none",
            render: (htmlNode, element) => {
                return <iframe src={htmlNode.props.src} />;
            },
        },
    };
    const screenWidth = Dimensions.get('window').width;

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.box}>
                    <View style={styles.document}>
                        {/*<SVG.Thank color="#0288D1"/>*/}
                        {archivesDetailData&&<Image style={{borderRadius:2,width:30,height:30}} source={{uri: archivesDetailData?.data?.image}}/> }

                        <Text style={styles.title}>{archivesDetailData?.data?.name}</Text>
                    </View>
                    <View style={{width: '93%'}}>
                        <Text style={styles.content}>
                            {archivesDetailData && (
                                <WebView
                                    source={{
                                        html: dataToShow,
                                    }}
                                    style={{ width: screenWidth, height: 300 }}
                                />
                            )}
                        </Text>
                        <TouchableOpacity
                            style={styles.confirm}
                            onPress={() => submit()}>
                            <Text style={styles.textStyle}>Xác nhận</Text>
                        </TouchableOpacity>
                    </View>
                    <ModalPoup visible={show}>
                        <View style={{width: '100%', marginBottom: 18, justifyContent: 'center', alignItems: 'center'}}>
                            <View style={{width: '60%', marginBottom: 63}}>
                                <Text style={{ fontSize: 16, textAlign: 'center', fontStyle: 'normal', fontWeight: '400', color: '#323232' }}>Vui lòng đọc hết và
                                    kéo xuống dưới để  xác nhận!
                                </Text>
                            </View>
                            <View style={styles.confirmBtn}>
                                <TouchableOpacity
                                    onPress={() =>setShow(false)}>
                                    <Text style={{ color: '#FFFFFF', fontSize: 16, paddingLeft: 10, fontWeight: '500', fontStyle: 'normal' }}>Đồng ý</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ModalPoup>
                </View>
            </ScrollView>
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: '#fff',
    },
    box: {
        width: '100%',
        marginLeft: 16,
    },
    document: {
        width: '93%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
        padding: 10,
        borderRadius: 16,
        backgroundColor: '#F5FCFF',
    },
    title: {
        fontSize: 16,
        color: '#0288D1',
        marginLeft: 10,
    },
    content: {
        fontSize: 14,
        fontWeight: '400',
        margin: 10,
    },
    confirm: {
        width: '90%',
        backgroundColor: '#2196F3',
        borderRadius: 12,
        marginLeft: 20,
        marginTop: 150,
        marginBottom: 30,
        padding: 10,
        textAlign: 'center',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 16,
    },
    loginBtn: {
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 14,
        paddingBottom: 14,
        paddingRight: 32,
        paddingLeft: 32,
        width: '50%',
        borderRadius: 12,
    },
    confirmBtn: {
        width: '60%',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0288D1',
        paddingTop: 14,
        paddingBottom: 14,
        paddingRight: 32,
        paddingLeft: 32,
        borderRadius: 12,
    },
});

export default ThankLetter;
