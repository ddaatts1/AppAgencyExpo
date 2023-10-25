import React, {useState} from 'react';
import CardService from "../../services/card.service";
import data from "../../../ultidata/data";
import {set} from "react-hook-form";


export default function useCard() {

    const {
        getStudentCard,
        expose,
        exportTrial,
        changeCardCode,
        exchangeHistory,
        createTrialCode,
        createTrial,
        getListTrial,
        getAllCard,
        getListCard,
        myAccount,
        getCardDetail
    } = CardService();

    const [isLoadingStudentCard, setIsLoadingStudentCard] = useState(false);
    const [studentCardData, setStudentCardData] = useState<any>(null);
    const [isExposing, setIsExposing] = useState(false);
    const [exposeData, setExposeData] = useState<any | null>(null);

    const [isExportingTrial, setIsExportingTrial] = useState(false);
    const [exportTrialData, setExportTrialData] = useState<any | null>(null);

    const [isChangingCardCode, setIsChangingCardCode] = useState(false);
    const [changeCardCodeData, setChangeCardCodeData] = useState<any | null>(null);

    const [isFetchingExchangeHistory, setIsFetchingExchangeHistory] = useState(false);
    const [exchangeHistoryData, setExchangeHistoryData] = useState<any | null>(null);

    const [isCreatingTrialCode, setIsCreatingTrialCode] = useState(false);
    const [createTrialCodeData, setCreateTrialCodeData] = useState<any | null>(null);

    const [isCreatingTrial, setIsCreatingTrial] = useState(false);
    const [createTrialData, setCreateTrialData] = useState<any | null>(null);

    const [lisTrialData, setListTrialData] = useState([])

    const [listCard, setListCard] = useState<any | null>(null);

    const [isFetchingListCardInfo, setIsFetchingListCardInfo] = useState(false)
    const [listcardInfo, setListCardInfo] = useState<any | null>(null);
    const [myAccountData, setMyAccountData] = useState<any | null>(null);

    const [isFetchingCardDetail, setIsFetchingCardDetail] = useState(false);
    const [fetchingCardDetailData, setFetchingCardDetailData] = useState<any | null>(null);


    const cardService = CardService();

    const fetchStudentCard = async (cardCode: string, used: any, cardId: number, page: number, limit: number, data: any) => {

        try {
            setIsLoadingStudentCard(true);
            const response = await cardService.getStudentCard(cardCode, used, cardId, page, limit, data);
            if (response.status === 200) {
                setStudentCardData(response);

            }
        } catch (error) {
            console.error('Error fetching student card:', error);
        } finally {
            setIsLoadingStudentCard(false);
        }
    };


    // Expose card data
    const exposeCard = async (data: any) => {
        setIsExposing(true);
        try {
            const result = await expose(data);
            if (result.status === 200) {
                setExposeData(result);
                // console.log("=============> expose result: "+ JSON
                //     .stringify(result))
            }
        } catch (error) {
            console.error('Error exposing card:', error);
        } finally {
            setIsExposing(false);
        }
    };

    // Export trial data
    const exportTrialDataAction = async (data: any, cardCode: string, used: number, cardId: number) => {
        setIsExportingTrial(true);
        try {
            const result = await exportTrial(data, cardCode, used, cardId);
            if (result.status === 200) {
                setExportTrialData(result);
            }
        } catch (error) {
            console.error('Error exporting trial data:', error);
        } finally {
            setIsExportingTrial(false);
        }
    };

    // Change card code data
    const changeCardCodeAction = async (data: any) => {
        setIsChangingCardCode(true);
        try {
            const result = await changeCardCode(data);
            setChangeCardCodeData(result);

            // console.log("result: "+ result)
        } catch (error) {
            console.error('Error changing card code:', error);
            setChangeCardCodeData(error);

        } finally {
            setIsChangingCardCode(false);

        }
    };

    // Fetch exchange history data
    const fetchExchangeHistory = async (data: any) => {
        setIsFetchingExchangeHistory(true);
        try {
            const result = await exchangeHistory(data);
            if (result.status === 200) {
                // console.log("result: "+ JSON.stringify(result))
                setExchangeHistoryData(result);
            }
        } catch (error) {
            console.error('Error fetching exchange history:', error);
        } finally {
            setIsFetchingExchangeHistory(false);
        }

    };

    // Create trial code data
    const createTrialCodeAction = async (data: any) => {
        setIsCreatingTrialCode(true);
        try {
            const result = await createTrialCode(data);
            if (result.status === 200) {
                setCreateTrialCodeData(result);
            }
        } catch (error) {
            // console.error('Error creating trial code:', error);
            setCreateTrialCodeData(error)
        } finally {
            setIsCreatingTrialCode(false);
        }
    };

    // Create trial data
    const createTrialAction = async (data: any) => {
        setIsCreatingTrial(true);
        try {
            const result = await createTrial(data);
            if (result.status === 200) {
                setCreateTrialData(result);
            }

        } catch (error) {
            // console.error('Error creating trial:', error);
            setCreateTrialData(error)
        } finally {
            setIsCreatingTrial(false);
        }
    };

    const fetchingListTrial = async (data: any) => {
        try {
            const result = await getListTrial(data)
            if (result.status === 200) {
                setListTrialData(result.data)
            }
        } catch (e) {

        }
    }

    const fetchAllCard = async () => {
        try {
            const result = await getAllCard()
            if (result.status === 200) {
                setListCard(result.data)
            }
        } catch (e) {

        }
    }

    const fetchListCardInfo = async (data: any) => {

        try {
            setIsFetchingListCardInfo(true)
            const result = await getListCard(data)
            if (result.status === 200) {
                setListCardInfo(result.data)
                return result.data
            }
            return []
        } catch (e) {
            console.log(e)
            return []

        } finally {
            setIsFetchingListCardInfo(false)
        }

    }
    const fetchMyAccount = async () => {

        try {

            const result = await myAccount()
            if (result.status === 200) {
                setMyAccountData(result.data)
            }
        } catch (e) {

        }

    }



    const fetchingCardDetail = async (data: any)=>{

        try {
            setIsFetchingCardDetail(true)
            const  result = await getCardDetail(data)
            setFetchingCardDetailData(result)
        }catch (e){
            setFetchingCardDetailData(e)
        }finally {
            setIsFetchingCardDetail(false)
        }

    }



    return {
        isLoadingStudentCard,
        studentCardData,
        fetchStudentCard,
        isExposing,
        exposeData,
        exposeCard,
        isExportingTrial,
        exportTrialDataAction,
        isChangingCardCode,
        changeCardCodeData,
        changeCardCodeAction,
        isFetchingExchangeHistory,
        exchangeHistoryData,
        fetchExchangeHistory,
        isCreatingTrialCode,
        createTrialCodeData,
        createTrialCodeAction,
        isCreatingTrial,
        createTrialData,
        createTrialAction,
        fetchingListTrial,
        lisTrialData,
        listCard,
        fetchAllCard,
        fetchListCardInfo,
        listcardInfo,
        fetchMyAccount,
        myAccountData,
        exportTrialData,
        isFetchingListCardInfo,
        fetchingCardDetail,
        isFetchingCardDetail,
        fetchingCardDetailData
    };
}
