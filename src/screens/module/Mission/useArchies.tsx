import { useState } from 'react';
import ArchivesService from "../../../services/archives.service";
import data from "../../../../ultidata/data";

export default function useArchives() {
    const {
        ArchivesDetail,
        ArchivesRequired,
        ArchivesTick,
        communities
    } = ArchivesService();

    const [isFetchingArchivesDetail, setIsFetchingArchivesDetail] = useState(false);
    const [archivesDetailData, setArchivesDetailData] = useState(null);

    const [isFetchingRequiredArchives, setIsFetchingRequiredArchives] = useState(false);
    const [requiredArchivesData, setRequiredArchivesData] = useState(null);

    const [isTickingArchives, setIsTickingArchives] = useState(false);
    const [tickedArchivesData, setTickedArchivesData] = useState(null);

    const [communitiesData,setCommunitiesData] = useState(null)
    const [isLoadingCommunities,setIsLoadingCommunities] = useState(false)

    const fetchArchivesDetail = async (id) => {
        try {
            setIsFetchingArchivesDetail(true);
            const response = await ArchivesDetail(id);
            setArchivesDetailData(response);
        } catch (error) {
            console.error('Error fetching archives detail:', error);
        } finally {
            setIsFetchingArchivesDetail(false);
        }
    };

    const fetchRequiredArchives = async () => {
        try {
            setIsFetchingRequiredArchives(true);
            const response = await ArchivesRequired();
            setRequiredArchivesData(response);
        } catch (error) {
            console.error('Error fetching required archives:', error);
        } finally {
            setIsFetchingRequiredArchives(false);
        }
    };

    const tickArchives = async (data) => {
        try {
            setIsTickingArchives(true);
            const response = await ArchivesTick(data);
            setTickedArchivesData(response);
        } catch (error) {
            console.error('Error ticking archives:', error);
        } finally {
            setIsTickingArchives(false);
        }
    };

    const getCommunities = async (data:any)=>{
        try {
            setIsLoadingCommunities(true)

            const result =await communities(data)

            setCommunitiesData(result)
        }catch (e){
            setCommunitiesData(e)
        }finally {
            setIsLoadingCommunities(false)
        }
    }

    return {
        isFetchingArchivesDetail,
        archivesDetailData,
        fetchArchivesDetail,
        isFetchingRequiredArchives,
        requiredArchivesData,
        fetchRequiredArchives,
        isTickingArchives,
        tickedArchivesData,
        tickArchives,
        getCommunities,
        isLoadingCommunities,
        communitiesData
    };
}
