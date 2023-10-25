import React, {useEffect, useState} from 'react';
import {Text, SafeAreaView, View, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import CommonDashboardIncome from '../../components/commons/commonDashboardIncome';
import {SVG} from '../../constants';
import CommonDashboardOffice from '../../components/commons/commonDashboardOffice';
import CommonTitleAccountBalance from '../../components/commons/commonTitleAccountBalance';
import CommonTransaction from '../../components/commons/commonTransaction';
import useIncome from './useIncome';
import {useFutureLang} from '../context/StartUpProvider';
import {SERVICE_FTL, SERVICE_KIDS} from '../../constants/service';
import formatDate from '../../components/formatDate';
import LoadingReact from '../../components/commons/loading';
import formatPriceVND, { formatMoneyTransfer} from '../group/formatMoney';

const IncomeRoseWallet = () => {



    const {fetchIncomeRevenue,incomeRevenueData,isFetchingIncomeRevenue} = useIncome();
    const {futureLang}  =  useFutureLang();
    const [status,setStatus] = useState();
    const [dataBonus, setDataBonus] = useState();

    useEffect(()=>{

fetchData(0);
    },[]);

    const fetchData = (p:any)=>{

        const data = {
            service: futureLang ? SERVICE_FTL : SERVICE_KIDS,
            limit: limit,
            page: p,
        };

        fetchIncomeRevenue(data);
    };



    useEffect(() => {

        if (incomeRevenueData) {
            console.log("incomeRevenueData: "+ JSON.stringify(incomeRevenueData))
            setTotalPage(Math.ceil(incomeRevenueData?.data?.totalRecords / limit));

            if (status){
                setDataBonus(
                    incomeRevenueData?.data?.dataBonus
                        .filter((d: any) => d !== null && d.status == status)
                        .map((d: any) => d)
                );

            }
            else {
                setDataBonus(incomeRevenueData?.data?.dataBonus);
            }
        }
    }, [incomeRevenueData]);


    const [currentPage, setCurrentPage] = useState(1);
    const limit = 10;
    const [totalPage,setTotalPage] = useState(0);

    const goToPreviousPage = () => {
        const newPage = currentPage - 1;
        setCurrentPage(newPage);

            fetchData(newPage);
    };

    const goToNextPage = () => {
        const newPage = currentPage + 1;
        setCurrentPage(newPage);
        // Call your data fetching function with the new page
            fetchData(newPage);

    };

    useEffect(()=>{

        if (status){
            fetchIncomeRevenue({
                service: futureLang ? SERVICE_FTL : SERVICE_KIDS,
            });
        }

    },[status]);

    return (
        <ScrollView style={styles.main}>
            {isFetchingIncomeRevenue ? <LoadingReact/> :            <View style={styles.container}>
                <View style={{flexDirection:'row', alignSelf: 'center', marginTop: 24}}>
                    <CommonDashboardIncome
                        iconSVG={<SVG.IconIncomeCoinBlue style={{width: 60, height: 60}} />}
                        iconSVGBackground={<SVG.IconOfficeBackgroundCoin style={{width: 95, height: 95}} />}
                        color={'#29A7E0'}
                        title={'Tổng doanh số'}
                        isFullWidth={true}
                        content={formatPriceVND(incomeRevenueData?.data?.revenue)} />
                </View>
                <View style={{flexDirection:'row'}}>
                    <CommonDashboardOffice
                        iconSVG={<SVG.icon_wallet_yellow style={{width: 26, height: 26}} />}
                        iconSVGBackground={<SVG.Icon_background_wallet_yellow style={{width: 95, height: 95}} />}
                        color={'#F99725'}
                        title={'Hoa hồng chờ duyệt'}
                        isLeft={true}
                        isForIncome={true}
                        content={formatPriceVND(incomeRevenueData?.data?.pending)} />
                    <CommonDashboardOffice
                        iconSVG={<SVG.Icon_wallet_red style={{width: 26, height: 26}} />}
                        iconSVGBackground={<SVG.Icon_background_wallet_red style={{width: 10, height: 95}} />}
                        color={'#E05641'}
                        title={'Tổng số dư'}
                        isRight={true}
                        isForIncome={true}
                        content={formatPriceVND(incomeRevenueData?.data?.balance)} />
                </View>
                {isFetchingIncomeRevenue ? <LoadingReact/> : <View style={styles.containerBalanceAccount}>
                    <CommonTitleAccountBalance setStatus={setStatus} amount={`${formatPriceVND(incomeRevenueData?.data.balance)}`}/>
                    <View style={{paddingTop: 16,minHeight:300}}>

                        {dataBonus?.map((d:any, index:any) => (
                            <React.Fragment key={index}>
                                <View style={styles.accountDate}r>
                                    <Text style={styles.textAccountDate}>{formatDate(d?.createdAt)}</Text>
                                </View>
                                <CommonTransaction
                                    type={d?.type}
                                    telephone={d?.telephone}
                                    transactionCode={d?.orderId}
                                    status={d?.status}
                                    value={formatMoneyTransfer(d?.value)}
                                    statusText={d?.status === 1 ? 'Đã duyệt' :d?.status === 2 ? 'Đã hủy' : 'Chờ duyệt'}
                                />
                            </React.Fragment>
                        ))}

                        {/*<CommonTransaction transactionCode={'FoFS80OL3c1znsP3iu'} type={'2'} value={'503,300'} statusText={'Đã xử lý'}/>*/}
                    </View>
                </View>
                }

                {status == undefined &&                <View style={styles.paginationButtons}>
                    <TouchableOpacity onPress={goToPreviousPage} disabled={currentPage === 1}>
                        <Text style={styles.paginationButton}>Previous</Text>
                    </TouchableOpacity>
                    <Text>{currentPage}/{totalPage} </Text>
                    <TouchableOpacity onPress={goToNextPage} disabled={currentPage >= totalPage}>
                        <Text style={styles.paginationButton}>Next</Text>
                    </TouchableOpacity>
                </View> }

            </View>
            }
        </ScrollView>
    );
};

export default IncomeRoseWallet;

const styles = StyleSheet.create({
    main: {
        marginHorizontal: 16,
    },
    container: {
        width: '100%',
    },
    containerBalanceAccount: {backgroundColor: '#fff', borderRadius: 24, marginTop: 16},
    accountDate: {backgroundColor: '#EEFAFF', paddingHorizontal: 8,zIndex:0},
    textAccountDate: {fontSize: 12, color: '#0288D1', fontWeight: '500'},
    paginationButtons: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    paginationButton: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#0288D1',
    },
});
