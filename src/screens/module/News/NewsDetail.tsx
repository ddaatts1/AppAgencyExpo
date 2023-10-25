import {
    StyleSheet,
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity, Dimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ROUTES, SVG} from '../../../constants';
import useNews from './useNews';
import LoadingReact from '../../../components/commons/loading';
import {useIsFocused} from '@react-navigation/native';
import RelatedNews from './components/RelatedNews';
import AutoHeightWebView from "react-native-autoheight-webview";


const NewsDetail = ({navigation, route}: any) => {
    // const {Category} = dataNews();
    const [newsImage, setNewsImage] = useState(null);

    const slug = route?.params?.slug
    const screenWidth = Dimensions.get('window').width;

    const [dataToShow,setDataToShow] =useState("")

    const {
        news,
        isLoadingNews,
        dataNews,
        dataCategory,
        CategoryList,
        newsDetail,
        dataNewsDetail,
        isLoadingNewsDetail
    } = useNews();
    const focus = useIsFocused();
    useEffect(() => {
        const fetchData = async () => {
            try {
                news();
            } catch (error) {
            }
        };
        fetchData();
    }, [focus]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                CategoryList();
            } catch (error) {
            }
        };
        fetchData();
    }, [focus]);


    useEffect(() => {

        const fetchNewDetail = async () => {
            newsDetail(slug)
        }
        fetchNewDetail()
    }, [slug])


    useEffect(() => {
        if (dataNewsDetail) {
            console.log("dataNewsDetail: "+ JSON.stringify(dataNewsDetail))
            const modifiedContent = dataNewsDetail.content.replace(
                /src=\"\/\//g,
                'src="https://'
            );

            console.log("modifiedContent: "+ JSON.stringify(modifiedContent))
            setDataToShow(modifiedContent)

            if (dataNewsDetail.image) {
                navigation.setOptions({
                    headerBackground: () => (
                        <Image style={styles.headerBox} source={{uri: dataNewsDetail.image}}/>
                    )
                });

            }

        }
    }, [dataNewsDetail])


    const customJs = `
    <script>
      document.addEventListener('DOMContentLoaded', function() {
        var style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = 'body { font-size: 30px; }';
        document.head.appendChild(style);
      });
    </script>
  `;


    // const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
    return (
        <View style={styles.container}>
            {isLoadingNewsDetail ? <LoadingReact/> : <ScrollView>
                <View style={styles.box1}>
                    <View style={styles.dateTime}>
                        <SVG.IconMonth/>
                        <Text style={styles.text}>{formatDateNewDetail(dataNewsDetail?.datePost)} </Text>
                        {/*<Text style={styles.text}></Text>*/}
                    </View>
                    <View style={styles.contentNews}>
                        <View style={{marginBottom: 16}}>
                            <Text style={styles.headerTitle}>{dataNewsDetail?.title}</Text>
                        </View>
                        <View style={{marginBottom: 16}}>
                            <Text style={styles.title}>{dataNewsDetail?.description}</Text>
                        </View>

                        <AutoHeightWebView
                            style={{
                                width: Dimensions.get('window').width - 15,
                                marginTop: 20,
                                flex: 1
                            }}
                            customStyle={`
                                          p {
                                            font-size: 25px;
                                    
                                          }
                                        `}
                            // onSizeUpdated={size => console.log("size: "+size.height)}
                            files={[{
                                href: 'cssfileaddress',
                                type: 'text/css',
                                rel: 'stylesheet'
                            }]}
                            source={{html: dataToShow}}
                            scalesPageToFit={true}
                            // viewportContent={'width=device-width, user-scalable=no'}

                        />
                    </View>
                    <View style={styles.hr}/>
                    <View style={{width: '100%', marginTop: 16}}>
                        <View style={{width: '100%'}}>
                            <Text style={styles.headerTitle}>
                                Tin tức nổi bật
                            </Text>
                        </View>
                        {/* {Recommend.map((item: any, index: any) => {
                                return (
                                    <TouchableOpacity key={index} onPress={() => navigation.navigate(ROUTES.NEWSDETAIL)}>
                                        <View style={styles.recommend}>
                                            <View style={{width: '40%', marginRight: 8}}>
                                                <Image style={styles.image} source={item.image} />
                                            </View>
                                            <View style={{width: '60%'}}>
                                                <Text style={styles.titleNews}>{item.title}</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                );
                            })} */}

                        {isLoadingNews ? (
                            <View style={{width: '100%', marginTop: 20}}>
                                <RelatedNews navigation={navigation} dataNews={dataNews}/>
                            </View>
                        ) : <LoadingReact/>}

                        {/* <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}> */}
                        {/*    <Category  navigation={navigation} dataCategory={dataCategory}/>*/}


                        {/* {
                                Category.map((item, index) => {
                                    return (
                                        <TouchableOpacity key={index}>
                                            <View style={styles.category} >
                                                <Text style={styles.titleNews}>{item.title}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    );
                                })
                            } */}

                        {/* </ScrollView> */}
                    </View>
                </View>
            </ScrollView>
            }
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: '#fff',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        zIndex: 999,
    },
    box1: {
        width: '95%',
        flexDirection: 'column',
        marginTop: 150,
        marginBottom: 16,
        marginLeft: 10,
        paddingTop: 7,
        elevation: 0.2,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        color: '#0288D1',
    },
    dateTime: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    date: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 50,
    },
    time: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        borderRadius: 8,
        resizeMode: 'cover',
    },
    text: {
        fontSize: 14,
        fontWeight: '400',
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        color: '#525252',
    },
    title: {
        fontSize: 14,
        fontWeight: '700',
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        color: '#323232',
    },
    box2: {
        marginLeft: 10,
    },
    footer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 200,
        marginBottom: 40,
    },
    contentNews: {
        width: '100%',
        marginBottom: 42,
        marginTop: 16,
    },
    hr: {
        width: '100%',
        borderBottomColor: '#0288D1',
        borderBottomWidth: 2,
    },
    recommend: {
        width: '100%',
        flexDirection: 'row',
        marginBottom: 16,
    },
    category: {
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#0288D1',
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: 8,
        paddingRight: 42,
        paddingLeft: 40,
        marginRight: 10,
        paddingTop: 30,
        paddingBottom: 30,
    },
    titleNews: {
        fontSize: 16,
        fontWeight: '500',
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        color: '#181818',
    }, headerBox: {
        height: 200,
        width: '100%',
        position: 'relative',
        zIndex: 1,
        resizeMode: 'cover',
    }


});

export default NewsDetail;


export const formatDateNewDetail = (dateTimeStr: any) => {
    if (!dateTimeStr) {
        return "-"
    }
    const dateTime = new Date(dateTimeStr);

    const hours = dateTime.getHours().toString().padStart(2, '0');
    const minutes = dateTime.getMinutes().toString().padStart(2, '0');
    const day = dateTime.getDate().toString().padStart(2, '0');
    const month = (dateTime.getMonth() + 1).toString().padStart(2, '0');
    const year = dateTime.getFullYear();

    return `${hours}:${minutes} - ${day}/${month}/${year}`;
};
