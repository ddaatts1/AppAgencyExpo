


import React, { useState } from 'react';
import CustomerService from "../../services/customer.service";

export default function useCustomer() {
    const {
        CustomerUpdate,
        CustomerTrials,
        CustomerRegister,
        CustomerPremium,
        ImportTrialStudy,
        CustomerExists,
        CustomerDetail,
        CustomerActiveCardCode,
    } = CustomerService();

    const [isLoadingCustomerData, setIsLoadingCustomerData] = useState(false);
    const [customerData, setCustomerData] = useState<any | null>(null);

    const [isFetchingTrials, setIsFetchingTrials] = useState(false);
    const [trialsData, setTrialsData] = useState<any | null>(null);

    const [isRegisteringCustomer, setIsRegisteringCustomer] = useState(false);
    const [registerCustomerData, setRegisterCustomerData] = useState<any | null>(null);

    const [isUpdatingCustomer, setIsUpdatingCustomer] = useState(false);
    const [updateCustomerData, setUpdateCustomerData] = useState<any | null>(null);

    const [isFetchingPremiumInfo, setIsFetchingPremiumInfo] = useState(false);
    const [premiumInfo, setPremiumInfo] = useState<any | null>(null);

    const [isImportingTrialStudy, setIsImportingTrialStudy] = useState(false);
    const [importTrialStudyData, setImportTrialStudyData] = useState<any | null>(null);

    const [isCheckingCustomerExists, setIsCheckingCustomerExists] = useState(false);
    const [customerExistsData, setCustomerExistsData] = useState<any | null>(null);

    const [isActivatingCardCode, setIsActivatingCardCode] = useState(false);
    const [activateCardCodeData, setActivateCardCodeData] = useState<any | null>(null);

    const fetchCustomerDetail = async (data: any) => {
        try {
            setIsLoadingCustomerData(true);
            const response = await CustomerDetail( data );
            if (response.status === 200) {
                setCustomerData(response.data);
            }
        } catch (error) {
            console.error('Error fetching customer data:', error);
        } finally {
            setIsLoadingCustomerData(false);
        }
    };

    const fetchCustomerTrials = async (data:any,params: any) => {
        try {
            setIsFetchingTrials(true);
            const response = await CustomerTrials(data,params );
            setTrialsData(response);
        } catch (error) {
            console.error('Error fetching customer trials:', error);
        } finally {
            setIsFetchingTrials(false);
        }
    };

    const registerCustomer = async (customerInfo: any) => {
        try {
            setIsRegisteringCustomer(true);
            const response = await CustomerRegister(customerInfo);
            setRegisterCustomerData(response);

        } catch (error) {
            setRegisterCustomerData(error)
            console.error('Error registering customer:', error);
        } finally {
            setIsRegisteringCustomer(false);
        }
    };

    const updateCustomer = async (customerInfo: any) => {
        try {
            setIsUpdatingCustomer(true);
            const response = await CustomerUpdate(customerInfo);
            setUpdateCustomerData(response);

        } catch (error) {
            setCustomerData(error)
            console.error('Error updating customer data:', error);
        } finally {
            setIsUpdatingCustomer(false);
        }
    };

    const fetchPremiumInfo = async (data:any,params: any) => {
        try {
            setIsFetchingPremiumInfo(true);
            const response = await CustomerPremium( data,params);
            setPremiumInfo(response);
        } catch (error) {
            console.error('Error fetching premium info:', error);
        } finally {
            setIsFetchingPremiumInfo(false);
        }
    };

    const importTrialStudy = async (studyData: any) => {
        try {
            setIsImportingTrialStudy(true);
            const response = await ImportTrialStudy(studyData);
            if (response.status === 200) {
                setImportTrialStudyData(response.data);
            }
        } catch (error) {
            console.error('Error importing trial study:', error);
        } finally {
            setIsImportingTrialStudy(false);
        }
    };

    const checkCustomerExists = async (customerInfo: any) => {
        try {
            setIsCheckingCustomerExists(true);
            const response = await CustomerExists(customerInfo);
            console.log("response: "+ JSON.stringify(response))
            if (response.status === 200) {
                setCustomerExistsData(response);
            }
        } catch (error) {
            setCustomerExistsData(error)
            console.error('Error checking if customer exists:', error);
        } finally {
            setIsCheckingCustomerExists(false);
        }
    };

    const activateCardCode = async (cardCodeData: any) => {
        try {
            setIsActivatingCardCode(true);
            const response = await CustomerActiveCardCode(cardCodeData);

            setActivateCardCodeData(response);

        } catch (error) {
            setActivateCardCodeData(error)
            console.error('Error activating card code for customer:', error);
        } finally {
            setIsActivatingCardCode(false);
        }
    };

    return {
        isLoadingCustomerData,
        customerData,
        fetchCustomerDetail,
        isFetchingTrials,
        trialsData,
        fetchCustomerTrials,
        isRegisteringCustomer,
        registerCustomerData,
        registerCustomer,
        isUpdatingCustomer,
        updateCustomerData,
        updateCustomer,
        isFetchingPremiumInfo,
        premiumInfo,
        fetchPremiumInfo,
        isImportingTrialStudy,
        importTrialStudyData,
        importTrialStudy,
        isCheckingCustomerExists,
        customerExistsData,
        checkCustomerExists,
        isActivatingCardCode,
        activateCardCodeData,
        activateCardCode,
    };
}
