import {ActivityIndicator, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SVG} from '../../../constants';
import BoxIcon from '../../../components/commons/commonBoxIcon';
import CardContentItem from '../../../components/commons/commonCardContentItem';
import {Field, Formik} from 'formik';
import CustomInput from '../../../components/commons/customInput';
import CustomSearchDropdown from '../../../components/commons/customSearchDropdown';
import CustomInputForNote from '../../../components/commons/commonInputForNote';
import CommonButton from '../../../components/commons/commonButton';
import useAgency from '../useAgency';
import {AgencyLevel} from '../../../constants/agencyLevel';
import Toast from 'react-native-simple-toast';
import formatPriceVND from '../formatMoney';
import LoadingReact from "../../../components/commons/loading";

const GroupListDetails = ({navigation, route}: { navigation: any, route: any }) => {

    const id = route?.params?.id;
    const [isLoading, setIsLoading] = useState(false);

    const {
        getAgencyDetails,
        getAgencyDetailsData,
        getAgencyDetailsLoading,
        agencyUpdateData,
        updateAgency
    } = useAgency();

    useEffect(() => {
        // console.log("==============> id:"+ id)

        const fetchData = async () => {
            await getAgencyDetails(id);
        };

        fetchData();
    }, []);

    useEffect(() => {

        if (getAgencyDetailsData) {
            setEditedFullname(getAgencyDetailsData?.fullname || '');
            setEditedPhoneNumber(getAgencyDetailsData?.telephone || '');
            setEditedEmail(getAgencyDetailsData?.email || '');
        }
        console.log('getAgencyDetailsData: ' + JSON.stringify(getAgencyDetailsData));
    }, [getAgencyDetailsData]);

    const [isEditing, setIsEditing] = useState(false);
    const [editedFullname, setEditedFullname] = useState('');
    const [editedPhoneNumber, setEditedPhoneNumber] = useState('');
    const [editedEmail, setEditedEmail] = useState('');
    const handleEditClick = () => {
        setIsEditing(!isEditing);
    };
    const handleSaveClick = async () => {
        setIsLoading(true);
        const data = {
            fullname: editedFullname,
            telephone: editedPhoneNumber,
            email: editedEmail,
        };

        // console.log("data update  "+ JSON.stringify(data))
        await updateAgency(data, id);
        setIsEditing(false);
        setIsLoading(false);
    };


    const update = async (values: any) => {
        setIsLoading(true);

        const data = {
            note: values.note,
        };

        // console.log("data update  "+ JSON.stringify(data))
        await updateAgency(data, id);
        setIsLoading(false);


    };

    useEffect(() => {

        if (agencyUpdateData) {
            if (agencyUpdateData.status == 200) {
                Toast.show('Cập nhật thành công! ');
            } else {
                Toast.show('Cập nhật không thành công! ');
            }
        }
    }, [agencyUpdateData]);
    return (
        <ScrollView>
            {getAgencyDetailsLoading ? <LoadingReact/> :
                <View style={{flex: 1, paddingVertical: 24, backgroundColor: '#EEFAFF', paddingHorizontal: 16}}>
                    <BoxIcon
                        child={<SVG.IconCirclePersonal/>}
                        title={'Họ và tên'}
                        content={
                            isEditing ? (
                                <TextInput
                                    style={styles.contentGroupShadow}
                                    value={editedFullname}
                                    onChangeText={setEditedFullname}
                                />
                            ) : (
                                <Text style={styles.contentGroupShadow}>{editedFullname}</Text>
                            )
                        }
                        // icon={
                        //     <TouchableOpacity onPress={ handleEditClick}>
                        //         <SVG.IconGroupEdit />
                        //     </TouchableOpacity>
                        // }
                    />
                    <BoxIcon
                        child={<SVG.IconCirclePhoneNumber/>}
                        title={'Số điện thoại'}
                        content={
                            isEditing ? (
                                <TextInput
                                    style={styles.contentGroupShadow}
                                    value={editedPhoneNumber}
                                    onChangeText={setEditedPhoneNumber}
                                />
                            ) : (
                                <Text style={styles.contentGroupShadow}>{editedPhoneNumber}</Text>
                            )
                        }
                        // icon={
                        //     <TouchableOpacity onPress={ handleEditClick}>
                        //         <SVG.IconGroupEdit />
                        //     </TouchableOpacity>
                        // }
                    />

                    <BoxIcon
                        child={<SVG.IconCircleEmail/>}
                        title={'Email'}
                        content={
                            isEditing ? (
                                <TextInput
                                    style={styles.contentGroupShadow}
                                    value={editedEmail}
                                    onChangeText={setEditedEmail}
                                />
                            ) : (
                                <Text style={styles.contentGroupShadow}>{editedEmail}</Text>
                            )
                        }
                        // icon={
                        //     <TouchableOpacity onPress={ handleEditClick}>
                        //         <SVG.IconGroupEdit />
                        //     </TouchableOpacity>
                        // }
                    />
                    <BoxIcon
                        child={<SVG.IconCircleCalendar/>}
                        title={'Ngày đăng ký'}
                        content={<Text style={styles.contentGroupShadow}>{getAgencyDetailsData?.createdAt}</Text>}
                    />
                    <BoxIcon
                        child={<SVG.IconCircleChart/>}
                        title={'Cấp bậc'}
                        content={<Text
                            style={styles.contentGroupShadow}>{AgencyLevel[getAgencyDetailsData?.agencyType]}</Text>}
                    />
                    <BoxIcon
                        child={<SVG.IconCircleLocation/>}
                        title={'Tỉnh / Thành phố'}
                        content={<Text style={styles.contentGroupShadow}>{getAgencyDetailsData?.province?.name}</Text>}
                    />
                    <BoxIcon
                        child={<SVG.IconCircleLocation/>}
                        title={'Quận / Huyện'}
                        content={<Text style={styles.contentGroupShadow}>{getAgencyDetailsData?.district?.name}</Text>}
                    />
                    <BoxIcon
                        child={<SVG.IconCircleGroup/>}
                        title={'Số đại sứ trực tiếp'}
                        content={<Text style={styles.contentGroupShadow}>{getAgencyDetailsData?.managed}</Text>}
                    />
                    <BoxIcon
                        child={<SVG.IconCircleSales/>}
                        title={'Tổng doanh số trực tiếp'}
                        content={<Text
                            style={styles.contentGroupShadow}>{formatPriceVND(getAgencyDetailsData?.total_group_sale)}</Text>}
                    />
                    <BoxIcon
                        child={<SVG.IconCircleCartSold/>}
                        title={'Tổng thu nhập'}
                        content={<Text
                            style={styles.contentGroupShadow}>{formatPriceVND(getAgencyDetailsData?.total_income)}</Text>}
                    />

                    <BoxIcon
                        child={<SVG.IconCircleSales/>}
                        title={'Doanh số trực tiếp tháng trước'}
                        content={<Text
                            style={styles.contentGroupShadow}>{formatPriceVND(getAgencyDetailsData?.group_sale_last_month)}</Text>}
                    />
                    <BoxIcon
                        child={<SVG.IconCircleCartSold/>}
                        title={'Doanh số trực tiếp tháng này'}
                        content={<Text
                            style={styles.contentGroupShadow}>{formatPriceVND(getAgencyDetailsData?.group_sale_month)}</Text>}
                    />

                    <BoxIcon
                        child={<SVG.IconCircleCartSold/>}
                        title={'Thu nhập tháng trước'}
                        content={<Text
                            style={styles.contentGroupShadow}>{formatPriceVND(getAgencyDetailsData?.group_sale_month)}</Text>}
                    />
                    <BoxIcon
                        child={<SVG.IconCircleSalary/>}
                        title={'Thu nhập tháng này'}
                        content={<Text
                            style={styles.contentGroupShadow}>{formatPriceVND(getAgencyDetailsData?.monthly_income)}</Text>}
                    />
                    <BoxIcon
                        child={<SVG.IconCircleSalary/>}
                        title={'Tổng doanh số bán lẻ'}
                        content={<Text
                            style={styles.contentGroupShadow}>{formatPriceVND(getAgencyDetailsData?.total_retail_sale)}</Text>}
                    />
                    <BoxIcon
                        child={<SVG.IconCircleCartSold/>}
                        title={'Thẻ đã bán'}
                        content={<View style={{paddingVertical: 4}}>
                            {getAgencyDetailsData?.card_sold.map((card: any, index: any) => (
                                <CardContentItem key={index} title={card.name} content={card.count}/>

                            ))}
                        </View>}
                    />
                    <BoxIcon
                        child={<SVG.IconCircleCartRemaining/>}
                        title={'Thẻ còn lại'}
                        content={<View style={{paddingVertical: 4}}>
                            {getAgencyDetailsData?.card_inven.map((card: any, index: any) => (
                                <CardContentItem key={index} title={card.name} content={card.count}/>

                            ))}
                        </View>}
                    />
                    <Formik
                        initialValues={{}}
                        onSubmit={values => {
                            update(values);
                        }}
                    >
                        {({handleSubmit, isValid, values}) => (
                            <>
                                <Field
                                    //iconLeft={<SVG.Icon_phone style={{color: '#0288D1'}} />}
                                    isValid={true}
                                    component={CustomInputForNote}
                                    isWhite={true}
                                    name="note"
                                    placeholder={getAgencyDetailsData?.note}
                                    title="Ghi chú"
                                />

                                <View style={{marginTop: 40}}>
                                    <TouchableOpacity
                                        onPress={() => handleSubmit()}
                                        style={{
                                            backgroundColor: isLoading ? 'lightgray' : '#0288D1',
                                            padding: 10,
                                            height: 50,
                                            borderRadius: 12,
                                            textAlign: 'center',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}
                                        disabled={isLoading}
                                    >
                                        {isLoading ? <Loading/> : <Text style={{color: 'white'}}>Cập nhật</Text>}
                                    </TouchableOpacity>
                                </View>
                            </>
                        )}
                    </Formik>
                </View>
            }
        </ScrollView>
    );
};

export default GroupListDetails;


const Loading = ({type, color}: any) => (
    <View
        style={{
            height: 20,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
        <ActivityIndicator size="large" color="#0288D1" style={{height: 120}}/>
    </View>
);
const styles = StyleSheet.create({
    titleGroupShadow: {
        color: '#0288D1',
        fontSize: 14,
        fontWeight: 400,
    },
    contentGroupShadow: {
        color: '#323232',
        fontSize: 14,
        fontWeight: '500',
        marginTop: 8,
    },
    groupTextShadow: {
        flexDirection: 'row',
        //paddingBottom: 8
    },
    groupShadow: {
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 12,
        //...StyleSheet.absoluteFillObject,
        shadowColor: '#0288D1',
        shadowOpacity: 1,
        shadowRadius: 10,
        elevation: 5,
        padding: 7,
    },
});
