import { useState } from 'react';
import IncomeService from '../../services/income.service';

export default function useIncome() {
    const {
        IncomeBonus,
        IncomeWallet,
        IncomeRevenue,
        IncomeCommissions,
    } = IncomeService();

    const [isFetchingIncomeBonus, setIsFetchingIncomeBonus] = useState(false);
    const [incomeBonusData, setIncomeBonusData] = useState(null);

    const [isFetchingIncomeWallet, setIsFetchingIncomeWallet] = useState(false);
    const [incomeWalletData, setIncomeWalletData] = useState(null);

    const [isFetchingIncomeRevenue, setIsFetchingIncomeRevenue] = useState(false);
    const [incomeRevenueData, setIncomeRevenueData] = useState(null);

    const [isFetchingIncomeCommissions, setIsFetchingIncomeCommissions] = useState(false);
    const [incomeCommissionsData, setIncomeCommissionsData] = useState(null);

    const fetchIncomeBonus = async (data) => {
        try {
            setIsFetchingIncomeBonus(true);
            const response = await IncomeBonus(data);
            setIncomeBonusData(response);
        } catch (error) {
            console.error('Error fetching income bonus:', error);
        } finally {
            setIsFetchingIncomeBonus(false);
        }
    };

    const fetchIncomeWallet = async (data) => {
        try {
            setIsFetchingIncomeWallet(true);
            const response = await IncomeWallet(data);
            setIncomeWalletData(response);
        } catch (error) {
            console.error('Error fetching income wallet:', error);
        } finally {
            setIsFetchingIncomeWallet(false);
        }
    };

    const fetchIncomeRevenue = async (data) => {
        try {
            setIsFetchingIncomeRevenue(true);
            const response = await IncomeRevenue(data);
            setIncomeRevenueData(response);
        } catch (error) {
            console.error('Error fetching income revenue:', error);
        } finally {
            setIsFetchingIncomeRevenue(false);
        }
    };

    const fetchIncomeCommissions = async (data) => {
        try {
            setIsFetchingIncomeCommissions(true);
            const response = await IncomeCommissions(data);
            setIncomeCommissionsData(response);
        } catch (error) {
            console.error('Error fetching income commissions:', error);
        } finally {
            setIsFetchingIncomeCommissions(false);
        }
    };

    return {
        isFetchingIncomeBonus,
        incomeBonusData,
        fetchIncomeBonus,
        isFetchingIncomeWallet,
        incomeWalletData,
        fetchIncomeWallet,
        isFetchingIncomeRevenue,
        incomeRevenueData,
        fetchIncomeRevenue,
        isFetchingIncomeCommissions,
        incomeCommissionsData,
        fetchIncomeCommissions,
    };
}
