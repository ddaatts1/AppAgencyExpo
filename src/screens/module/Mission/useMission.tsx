import { useState } from 'react';
import UserMissionService from '../../../services/user/mission.services';

export default function useMission() {
    const {
        MissionMonth,
    } = UserMissionService();

    const [isFetchingMissionMonth, setIsFetchingMissionMonth] = useState(false);
    const [requiredMissionMonthData, setRequiredMissionMonthData] = useState(null);

    const fetchMissionMonth = async () => {
        try {
            setIsFetchingMissionMonth(true);
            const response = await MissionMonth();
            setRequiredMissionMonthData(response);
        } catch (error) {
            console.error('Error fetching mission month:', error);
        } finally {
            setIsFetchingMissionMonth(false);
        }
    };

    return {
        isFetchingMissionMonth,
        requiredMissionMonthData,
        fetchMissionMonth
    };
}
