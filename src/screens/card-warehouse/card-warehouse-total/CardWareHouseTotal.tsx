import React, {useEffect, useState} from 'react';

import {Text, SafeAreaView, View, StyleSheet, ScrollView} from 'react-native';


import ItemCard from '../../../components/card-warehouse/itemCard';
import LinearGradient from 'react-native-linear-gradient';
import {TouchableOpacity} from 'react-native';
import {ROUTES} from '../../../constants';
import CircularProgress from 'react-native-circular-progress-indicator';
import {useFutureLang} from "../../context/StartUpProvider";
import useCard from "../useCard";
import {SERVICE_FTL, SERVICE_KIDS} from "../../../constants/service";
import LoadingReact from "../../../components/commons/loading";

const CardWareHouseTotal = ({navigation}: any) => {
    //const navigation = useNavigation<StackNavigationProp<ParamListBase>>()

    const {futureLang} = useFutureLang()
    const {
        fetchingListTrial,
        lisTrialData,
        fetchStudentCard,
        studentCardData,
        fetchListCardInfo,
        listcardInfo
    } = useCard()

    const colorPair =[
        {value1: "#0288D1", value2: "#87C8E5"},
        {value1: "#28A12D", value2: "#A2E9A5"},
        {value1: "#F28118", value2: "#F8CFA9"},
        {value1: "#02B8D1", value2: "#C0E4E9"},
        {value1: "#E06CC7", value2: "#FED8F6"},
        {value1: "#9D3CCB", value2: "#E2BDF3"},
        {value1: "#FCDB2C", value2: "#FFF8B8"},
        {value1: "#D74949", value2: "#E8B8B8"},

    ]

    const [listTrialMappingId, setListTrialMappingId] = useState([])
    const [matchingMappingIdsList, setMatchingMappingIdsList] = useState([]);
    const [remainingDataCard, setRemainingDataCard] = useState([]);
    const [countCard, setCountcard] = useState(0)
    const [countTrialCard, setCountTrialCard] = useState(0)
    const [isLoading, setIsloading] = useState(true)

    useEffect(() => {

        const data = {
            service: futureLang ? SERVICE_FTL : SERVICE_KIDS
        }

        const fetchData = () => {
            fetchStudentCard("", 0, 0, 0, 1, data)
            fetchingListTrial(data)
        }

        fetchData()
    }, [])


    useEffect(() => {

        if (lisTrialData.length > 0) {
            const mappingIds: number[] = lisTrialData.map(item => item.mappingId);
            setListTrialMappingId(mappingIds)
        }
    }, [lisTrialData])

    useEffect(() => {


        if (studentCardData) {
            const matchingMappingIds = studentCardData?.data.dataCard.filter(item => listTrialMappingId.includes(item.mappingId));
            const remainingCardInfo = studentCardData?.data.dataCard.filter(item => !listTrialMappingId.includes(item.mappingId));

            const countCard = remainingCardInfo.reduce((total, item) => total + item.total_card_cb, 0);
            const countTrialCard = matchingMappingIds.reduce((total, item) => total + item.total_card_cb, 0);

            setCountcard(countCard)
            setCountTrialCard(countTrialCard)

            setMatchingMappingIdsList(matchingMappingIds);
            setRemainingDataCard(remainingCardInfo);
            setIsloading(false)

        }
    }, [listcardInfo, listTrialMappingId, studentCardData]);


    return (
        <ScrollView>
            {isLoading && <LoadingReact/>}
            <LinearGradient
                colors={['#EEFAFF', '#EEFAFF']}
                start={{y: 0.0, x: 0.0}}
                end={{y: 1.0, x: 0.0}}
                style={{height: "100%", paddingTop: 36,}}
            >
                <View style={styles.container}>

                    <Text style={{color: '#323232', fontSize: 18, paddingVertical: 16, fontWeight: 'bold',width:'100%'}}>Tổng số thẻ
                        trả phí còn lại: <Text style={{fontWeight: 'bold', color: '#0288D1',}}>{countCard}</Text></Text>

                    {remainingDataCard.length > 0 && remainingDataCard.map((data, index) => (
                        <ItemCard  key={index} color={"#0288D1"}>
                            <TouchableOpacity onPress={() => navigation.navigate(ROUTES.CARD_WAREHOUSE_NAVIGATOR, {
                                itemtype: 1,
                                id: `${data.mappingId}`,
                                name: `${data.name}`

                            })}>


                                <View style={{alignItems: "center",paddingBottom: 12}}>
                                    <Text style={{color: '#0288D1', fontSize: 14, fontWeight: 'bold', alignContent:'center'}}>{data.name}</Text>

                                </View>
                                <CircularProgress
                                    inActiveStrokeColor={colorPair[index % colorPair.length].value1}
                                    activeStrokeColor={colorPair[index % colorPair.length].value2}
                                    title={'Số thẻ đã bán'}
                                    subtitle={data.total_card_db ==0? "0": data.total_card_db}
                                    value={(data.total_card_db/(data.total_card_db+ data.total_card_cb))* 100 }
                                    radius={76}
                                    duration={2000}
                                    subtitleStyle={{fontWeight:"bold", fontSize:35}}
                                    titleFontSize={15}
                                    progressValueColor={'#323232'}
                                    titleColor={'#323232'}
                                    showProgressValue={false}
                                    activeStrokeWidth={18}
                                    inActiveStrokeWidth={18}
                                    strokeLinecap={"square"}

                                />


                                <View style={{alignItems: "center", paddingTop: 12}}>
                                    <Text style={styles.styleText12}>Số thẻ chưa bán : <Text
                                        style={{fontWeight: "bold"}}>{data.total_card_cb }</Text></Text>
                                    {/*<Text style={styles.styleText12}>Còn Lại: <Text*/}
                                    {/*    style={{fontWeight: "bold"}}>{data.total_card_cb}</Text></Text>*/}

                                </View>

                            </TouchableOpacity>
                        </ItemCard>
                    ))}


                </View>
                <View style={styles.container}>

                    <Text style={{color: '#323232', fontSize: 18, paddingVertical: 16, fontWeight: 'bold',width:'100%'}}>Tổng số thẻ
                        học thử còn lại: <Text
                            style={{fontWeight: 'bold', color: '#0288D1',}}>{countTrialCard}</Text></Text>
                    {matchingMappingIdsList.length > 0 && matchingMappingIdsList.map((data, index) => (
                        <ItemCard key={index} color={"#0288D1"}>
                            <TouchableOpacity onPress={() => navigation.navigate(ROUTES.CARD_WAREHOUSE_NAVIGATOR, {
                                itemtype: 2,
                                id: `${data.mappingId}`,
                                name: `${data.name}`,
                                header:'Danh sách thẻ học thử'

                            })}>

                                <View style={{alignItems: "center",paddingBottom: 12}}>
                                    <Text style={{color: '#0288D1', fontSize: 14, fontWeight: 'bold', alignContent:'center'}}>{data.name}</Text>

                                </View>
                                {/*<Text style={{color: '#0288D1', fontSize: 14, fontWeight: 'bold'}}>{data.name}</Text>*/}
                                <CircularProgress
                                    inActiveStrokeColor={  colorPair[colorPair.length - index % colorPair.length-1].value1}
                                    activeStrokeColor={ colorPair[colorPair.length - index % colorPair.length-1].value2}
                                    title={'Số thẻ đã bán'}
                                    subtitle={data.total_card_db ==0? "0": data.total_card_db}
                                    value={(data.total_card_db/(data.total_card_db+ data.total_card_cb))* 100 }
                                    radius={76}
                                    duration={2000}
                                    subtitleStyle={{fontWeight:"bold", fontSize:35}}
                                    titleFontSize={15}
                                    progressValueColor={'#323232'}
                                    titleColor={'#323232'}
                                    showProgressValue={false}
                                    activeStrokeWidth={18}
                                    inActiveStrokeWidth={18}

                                    strokeLinecap={"square"}
                                />
                                <View style={{alignItems: "center", paddingTop: 12}}>
                                    <Text style={styles.styleText12}>Số thẻ chưa bán : <Text
                                        style={{fontWeight: "bold"}}>{data.total_card_cb }</Text></Text>

                                </View>

                            </TouchableOpacity>
                        </ItemCard>
                    ))}


                </View>

            </LinearGradient>

        </ScrollView>
    );
};

export default CardWareHouseTotal;
const styles = StyleSheet.create({
    styleText12: {
        fontSize: 12, color: "#323232"
    },

    container: {
        flex: 1, flexDirection: 'row', flexWrap: 'wrap',
        paddingHorizontal: 12,
    },
    content: {

        paddingLeft: 12,
        paddingRight: 12,
        backgroundColor: '#14B0FC',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,

    },


});
