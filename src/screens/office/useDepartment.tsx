import React, { useState } from 'react';
import DepartmentsService from '../../services/departments.service';

export default function useDepartment() {
    const {
        DepartmentsAddOrder,
        DepartmentsDismiss,
        DepartmentsSearch,
        DepartmentsDetail,
        DepartmentsDetailSales,
        DepartmentsList,
        DepartmentsListPersonal,
        DepartmentsSales,
        PersonalList,
        PersonalRequest,
    } = DepartmentsService();

    const [isAddingOrder, setIsAddingOrder] = useState(false);
    const [addOrderData, setAddOrderData] = useState(null);

    const [isDismissingDepartment, setIsDismissingDepartment] = useState(false);
    const [dismissDepartmentData, setDismissDepartmentData] = useState(null);

    const [isSearchingDepartments, setIsSearchingDepartments] = useState(false);
    const [searchedDepartmentsData, setSearchedDepartmentsData] = useState(null);

    const [isFetchingDepartmentDetail, setIsFetchingDepartmentDetail] = useState(false);
    const [departmentDetailData, setDepartmentDetailData] = useState(null);

    const [isFetchingDepartmentSalesDetail, setIsFetchingDepartmentSalesDetail] = useState(false);
    const [departmentSalesDetailData, setDepartmentSalesDetailData] = useState(null);

    const [isFetchingDepartmentList, setIsFetchingDepartmentList] = useState(false);
    const [departmentListData, setDepartmentListData] = useState(null);

    const [isFetchingPersonalList, setIsFetchingPersonalList] = useState(false);
    const [personalListData, setPersonalListData] = useState(null);

    const [isFetchingDepartmentPersonalList, setIsFetchingDepartmentPersonalList] = useState(false);
    const [departmentPersonalListData, setDepartmentPersonalListData] = useState(null);

    const [isRequestingPersonal, setIsRequestingPersonal] = useState(false);
    const [requestPersonalData, setRequestPersonalData] = useState(null);

    const [isFetchingDepartmentSales,setIsFetchingDepartmentSales] = useState(false)
    const [departmentSalesData,setDepartmentSalesData] = useState(null)

    const addDepartmentOrder = async (orderInfo) => {
        try {
            setIsAddingOrder(true);
            const response = await DepartmentsAddOrder(orderInfo);
            setAddOrderData(response);
        } catch (error) {
            setAddOrderData(error)
            // console.error('Error adding department order:', error);
        } finally {
            setIsAddingOrder(false);
        }
    };

    const dismissDepartment = async (dismissInfo) => {
        try {
            setIsDismissingDepartment(true);
            const response = await DepartmentsDismiss(dismissInfo);
            setDismissDepartmentData(response);
        } catch (error) {
            console.error('Error dismissing department:', error);
        } finally {
            setIsDismissingDepartment(false);
        }
    };

    const  fetchDepartmentPersonalList= async (searchParams:any)=>{
        try {
            setIsFetchingDepartmentPersonalList(true);
            const response = await DepartmentsListPersonal(searchParams);
            setDepartmentPersonalListData(response);
        } catch (error) {
            console.error('Error fetching  departments personnel list:', error);
        } finally {
            setIsFetchingDepartmentPersonalList(false);
        }
    }

    const searchDepartments = async (searchParams) => {
        try {
            setIsSearchingDepartments(true);
            const response = await DepartmentsSearch(searchParams);
            setSearchedDepartmentsData(response);
        } catch (error) {
            setSearchedDepartmentsData(error)
            console.error('Error searching departments:', error);
        } finally {
            setIsSearchingDepartments(false);
        }
    };

    const fetchDepartmentDetail = async (params: any) => {
        try {
            setIsFetchingDepartmentDetail(true);
            const response = await DepartmentsDetail(params);
            setDepartmentDetailData(response);
        } catch (error) {
            console.error('Error fetching department detail:', error);
        } finally {
            setIsFetchingDepartmentDetail(false);
        }
    };

    const fetchDepartmentSalesDetail = async (salesParams) => {
        try {
            setIsFetchingDepartmentSalesDetail(true);
            const response = await DepartmentsDetailSales(salesParams);
            setDepartmentSalesDetailData(response);
        } catch (error) {
            console.error('Error fetching department sales detail:', error);
        } finally {
            setIsFetchingDepartmentSalesDetail(false);
        }
    };

    const fetchDepartmentList = async (listParams:any) => {
        try {
            setIsFetchingDepartmentList(true);
            const response = await DepartmentsList(listParams);
            setDepartmentListData(response);
        } catch (error) {
            console.error('Error fetching department list:', error);
        } finally {
            setIsFetchingDepartmentList(false);
        }
    };

    const fetchPersonalList = async (body:any) => {
        try {
            setIsFetchingPersonalList(true);
            const response = await PersonalList(body);
            setPersonalListData(response);
        } catch (error) {
            console.error('Error fetching personal list:', error);
        } finally {
            setIsFetchingPersonalList(false);
        }
    };

    const requestPersonal = async (requestParams: any) => {
        try {
            setIsRequestingPersonal(true);
            const response = await PersonalRequest(requestParams);
            setRequestPersonalData(response);
        } catch (error) {
            setRequestPersonalData(error)

            console.error('Error requesting personal:', error);
        } finally {
            setIsRequestingPersonal(false);
        }
    };

 const   fetchDepartmentSales=async (params: any)=>{
     try {
         setIsFetchingDepartmentSales(true);
         const response = await DepartmentsSales(params);
         setDepartmentSalesData(response);
     } catch (error) {
         setDepartmentSalesData(error);

         console.error('Error requesting personal:', error);
     } finally {
         setIsFetchingDepartmentSales(false);
     }
    }

    return {
        isAddingOrder,
        addOrderData,
        addDepartmentOrder,
        isDismissingDepartment,
        dismissDepartmentData,
        dismissDepartment,
        isSearchingDepartments,
        searchedDepartmentsData,
        searchDepartments,
        isFetchingDepartmentDetail,
        departmentDetailData,
        fetchDepartmentDetail,
        isFetchingDepartmentSalesDetail,
        departmentSalesDetailData,
        fetchDepartmentSalesDetail,
        isFetchingDepartmentList,
        departmentListData,
        fetchDepartmentList,
        isFetchingPersonalList,
        personalListData,
        fetchPersonalList,
        isRequestingPersonal,
        requestPersonalData,
        requestPersonal,
        isFetchingDepartmentSales,
        fetchDepartmentSales,
        departmentSalesData,
        fetchDepartmentPersonalList,
        departmentPersonalListData,
        isFetchingDepartmentPersonalList
    };
}
