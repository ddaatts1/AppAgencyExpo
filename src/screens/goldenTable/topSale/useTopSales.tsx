import {useState} from 'react';
import SalesService from '../../../services/sales.service';
import useLogin from '../../auth/useLogin';

export default function useTopsales() {
  const {campaigns, honoures, company} = SalesService();
  const [dataCampaign, setDataCampaign] = useState() as any;
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingHonoures, setIsLoadingHonoures] = useState(false);
  const [isLoadingSearch, setIsLoadingSearch] = useState(false);
  const [listDetail, setListDetail] = useState() as any;
  const [isLoadingCompany, setIsLoadingCompany] = useState(false);
  const [listHonoures, setListHonoures] = useState() as any;
  const [listCompany, setListCompany] = useState() as any;
  const [isLoadingCompanySearch, setIsLoadingCompanySearch] = useState(false);
  const [dataProvince, setDataProvince] = useState() as any;
  const {province, district} = useLogin();
  const TopSales = async function () {
    try {
      const resultUser = await campaigns();
      if (resultUser.status == 200) {
        const data = resultUser.data;
        setDataCampaign(data.dataCampaign[0]);
        setListDetail(data.detail);
        setIsLoading(true);
      }
    } finally {
    }
  };
  const Honoures = async function (name: any) {
    try {
      setIsLoadingSearch(false);
      const resultUser = await honoures(name);
      if (resultUser.status == 200) {
        setListHonoures(resultUser.data);
        setIsLoadingSearch(true);
        setIsLoadingHonoures(true);
      }
    } finally {
    }
  };
  const Company = async function (data: any) {
    try {
      setIsLoadingCompanySearch(false);
      const resultUser = await company(data);
      if (resultUser.status == 200) {
        let provinces = await province();
        setDataProvince(
          JSON.parse(
            JSON.stringify(provinces, (k, v) =>
              v && typeof v === 'object' ? v : '' + v,
            ),
          ),
        );
        setListCompany(resultUser.data);
        setIsLoadingCompanySearch(true);
        setIsLoadingCompany(true);
      }
    } finally {
    }
  };

  return {
    dataCampaign,
    isLoading,
    listDetail,
    TopSales,
    Honoures,
    listHonoures,
    setListHonoures,
    isLoadingHonoures,
    isLoadingSearch,
    Company,
    isLoadingCompanySearch,
    listCompany,
    isLoadingCompany,
    dataProvince,
  };
}
