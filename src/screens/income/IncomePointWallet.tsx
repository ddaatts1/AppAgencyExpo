
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
    import TransactionType from './TransactionType';
    import formatPriceVND, { formatMoneyTransfer} from '../group/formatMoney';

const IncomePointWallet = () => {
        const {fetchIncomeWallet,incomeWalletData,isFetchingIncomeWallet} = useIncome();
        const {futureLang}  =  useFutureLang();
    const transactionData = {
        type: 'order',
    };


        useEffect(()=>{

            fetchData();
        },[]);

        const fetchData = ()=>{

            const data = {
                service: futureLang ? SERVICE_FTL : SERVICE_KIDS,
            };

            fetchIncomeWallet(data);
        };

        useEffect(()=>{

            if(incomeWalletData){
                console.log("incomeWalletData: "+ JSON.stringify(incomeWalletData))
            }
        },[incomeWalletData])


        return (
            <ScrollView style={styles.main}>
                <View style={styles.container}>
                    <View style={{flexDirection:'row', alignSelf: 'center', marginTop: 24}}>
                        <CommonDashboardIncome
                            iconSVG={<SVG.icon_point_wallet style={{width: 60, height: 60}} />}
                            iconSVGBackground={<SVG.icon_background_point_wallet style={{width: 95, height: 95}} />}
                            color={'#D762CB'}

                        title={'Tổng ví điểm'}
                            isFullWidth={true}
                            content={formatPriceVND(incomeWalletData?.totalPoint)} />
                    </View>
                   <View style={styles.containerBalanceAccount}>
                        {/*<CommonTitleAccountBalance setStatus={setStatus} amount={`${incomeWalletData?.data.balance} đ`}/>*/}
                        <View style={{paddingTop: 16,minHeight:300}}>
                            {incomeWalletData?.data?.map((d: any, index: any) => (
                                <React.Fragment key={index}>
                                    <View style={styles.accountDate}>
                                        <Text style={styles.textAccountDate}>{formatDate(d?.createdAt)}</Text>
                                    </View>
                                    <CommonTransaction
                                        status={1}
                                        exchangeId={d?.exchangeId}
                                        type={d?.type_transaction}
                                        value={formatMoneyTransfer(d?.type==2? (-1*d?.value):(d?.value))}
                                        statusText={'Đã duyệt'}

                                    />

                                </React.Fragment>
                            ))}


                        </View>
                    </View>



                </View>
            </ScrollView>
        );
    };

    export default IncomePointWallet;

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
