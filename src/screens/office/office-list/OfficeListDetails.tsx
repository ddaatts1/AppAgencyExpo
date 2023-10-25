import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {SVG} from "../../../constants";
import BoxIcon from "../../../components/commons/commonBoxIcon";
import CardContentItem from "../../../components/commons/commonCardContentItem";
import {Field, Formik} from "formik";
import CustomInput from "../../../components/commons/customInput";
import CustomSearchDropdown from "../../../components/commons/customSearchDropdown";
import CustomInputForNote from "../../../components/commons/commonInputForNote";
import CommonButton from "../../../components/commons/commonButton";

const OfficeListDetails = ({ navigation }: { navigation: any }) => {

    return (
        <ScrollView>
            <View style={{flex: 1, paddingVertical: 24, backgroundColor: '#EEFAFF', paddingHorizontal: 16}}>
                <BoxIcon
                    child={<SVG.IconOfficeCode></SVG.IconOfficeCode>}
                    title={'Họ và tên'}
                    content={<Text style={styles.contentGroupShadow}>Nguyễn Văn A</Text>}
                    //icon={<SVG.IconGroupEdit></SVG.IconGroupEdit>}
                />
                <BoxIcon
                    child={<SVG.IconOfficeName></SVG.IconOfficeName>}
                    title={'Họ và tên'}
                    content={<Text style={styles.contentGroupShadow}>Nguyễn Văn A</Text>}
                    //icon={<SVG.IconGroupEdit></SVG.IconGroupEdit>}
                />
                <BoxIcon
                    child={<SVG.IconOfficeCity></SVG.IconOfficeCity>}
                    title={'Họ và tên'}
                    content={<Text style={styles.contentGroupShadow}>Nguyễn Văn A</Text>}
                    //icon={<SVG.IconGroupEdit></SVG.IconGroupEdit>}
                />
                <BoxIcon
                    child={<SVG.IconOfficeDistrict></SVG.IconOfficeDistrict>}
                    title={'Họ và tên'}
                    content={<Text style={styles.contentGroupShadow}>Nguyễn Văn A</Text>}
                />
                <BoxIcon
                    child={<SVG.IconOfficeEmail></SVG.IconOfficeEmail>}
                    title={'Họ và tên'}
                    content={<Text style={styles.contentGroupShadow}>Nguyễn Văn A</Text>}
                />
                <BoxIcon
                    child={<SVG.IconOfficePhone></SVG.IconOfficePhone>}
                    title={'Họ và tên'}
                    content={<Text style={styles.contentGroupShadow}>Nguyễn Văn A</Text>}
                />
                <BoxIcon
                    child={<SVG.IconCircleChart></SVG.IconCircleChart>}
                    title={'Họ và tên'}
                    content={<Text style={styles.contentGroupShadow}>Nguyễn Văn A</Text>}
                />
                <BoxIcon
                    child={<SVG.IconOfficeDate></SVG.IconOfficeDate>}
                    title={'Họ và tên'}
                    content={<Text style={styles.contentGroupShadow}>Nguyễn Văn A</Text>}
                />
                <Formik
                    validationSchema={{}}
                    initialValues={{}}
                    onSubmit={values => {}}
                >
                    {({ handleSubmit, isValid, values, }) => (
                        <>
                            <Field
                                //iconLeft={<SVG.Icon_phone style={{color: '#0288D1'}} />}
                                isValid={true}
                                component={CustomInputForNote}
                                isWhite={true}
                                name="note"
                                title="Ghi chú"
                            />

                            <View style={{marginTop: 40}}>
                                <CommonButton handleSubmit={() => null} text={'Cập nhật'} />
                            </View>
                        </>
                    )}
                </Formik>
            </View>
        </ScrollView>
    );
};

export default OfficeListDetails;
const styles = StyleSheet.create({
    titleGroupShadow: {
        color: '#0288D1',
        fontSize: 14,
        fontWeight: 400
    },
    contentGroupShadow: {
        color: '#323232',
        fontSize: 14,
        fontWeight: '500',
        marginTop: 8
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
