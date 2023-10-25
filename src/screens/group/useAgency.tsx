import AgencyService from "../../services/agency.services";
import {useState} from "react";


export default function useAgency(){

    const {agencyOffWork,agencyTeam,agencyList,agencyDetail,agencyCreate,agencyUpdate} = AgencyService()


    const [createNewAgencyLoading, setCreateNewAgencyLoading] = useState(false);
    const [createNewAgencyData, setCreateNewAgencyData] = useState<any | null>(null);

    const [markAgencyOffWorkLoading, setMarkAgencyOffWorkLoading] = useState(false);
    const [markAgencyOffWorkData, setMarkAgencyOffWorkData] = useState<any | null>(null);

    const [getAgencyTeamLoading, setGetAgencyTeamLoading] = useState(false);
    const [getAgencyTeamData, setGetAgencyTeamData] = useState<any | null>(null);

    const [getListOfAgenciesLoading, setGetListOfAgenciesLoading] = useState(false);
    const [getListOfAgenciesData, setGetListOfAgenciesData] = useState<any | null>(null);

    const [getAgencyDetailsLoading, setGetAgencyDetailsLoading] = useState(false);
    const [getAgencyDetailsData, setGetAgencyDetailsData] = useState<any | null>(null);

    const [agencyUpdateData,setAgencyUpdateData] = useState<any | null>(null);

    const createNewAgency = async (data: any) => {
        try {
            setCreateNewAgencyLoading(true);
            const result = await agencyCreate(data);
            setCreateNewAgencyData(result);
        } catch (e) {
            // console.log("createNewAgency error: " + JSON.stringify(e));
            setCreateNewAgencyData(e);
        } finally {
            setCreateNewAgencyLoading(false);
        }
    }

    const markAgencyOffWork = async (data: any) => {
        try {
            setMarkAgencyOffWorkLoading(true);
            const result = await agencyOffWork(data);
            setMarkAgencyOffWorkData(result);
            // console.log("markAgencyOffWork result: " + JSON.stringify(result));
        } catch (e) {
            // console.log("markAgencyOffWork error: " + e);
        } finally {
            setMarkAgencyOffWorkLoading(false);
        }
    }

    const getAgencyTeam = async (id: number, data: any) => {
        try {
            setGetAgencyTeamLoading(true)
            const result = await agencyTeam(id, data);
            setGetAgencyTeamData(result);
            // console.log("getAgencyTeam result: " + JSON.stringify(result));
        } catch (e) {
            // console.log("getAgencyTeam error: " + e);
        } finally {
            setGetAgencyTeamLoading(false)
        }
    }

    const getListOfAgencies = async (data: any) => {
        try {
            setGetListOfAgenciesLoading(true);
            const result = await agencyList(data);
            setGetListOfAgenciesData(result);
            // console.log("getListOfAgencies result: " + JSON.stringify(result));
        } catch (e) {
            // console.log("getListOfAgencies error: " + e);
        } finally {
            setGetListOfAgenciesLoading(false);
        }
    }

    const getAgencyDetails = async (id: number) => {
        try {
            setGetAgencyDetailsLoading(true);
            const result = await agencyDetail(id);
            setGetAgencyDetailsData(result.data);
            // console.log("getAgencyDetails result: " + JSON.stringify(result));
        } catch (e) {
            // console.log("getAgencyDetails error: " + e);
        } finally {
            setGetAgencyDetailsLoading(false);
        }
    }

    const updateAgency = async (data: any, id:any)=>{
        try {
            const result = await agencyUpdate(data,id);
            setAgencyUpdateData(result);
            // console.log("updateAgency result: " + JSON.stringify(result));
        } catch (e) {
            // console.log("updateAgency error: " + e);
            setAgencyUpdateData(e);
        } finally {
        }

    }

    return {
        createNewAgencyLoading,
        createNewAgencyData,
        markAgencyOffWorkLoading,
        markAgencyOffWorkData,
        getAgencyTeamLoading,
        getAgencyTeamData,
        getListOfAgenciesLoading,
        getListOfAgenciesData,
        getAgencyDetailsLoading,
        getAgencyDetailsData,
        createNewAgency,
        markAgencyOffWork,
        getAgencyTeam,
        getListOfAgencies,
        getAgencyDetails,
        updateAgency,
        agencyUpdateData,
    };
}
