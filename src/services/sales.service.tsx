import BaseService from './base.service';
import _, {values} from 'lodash';
export default function SalesService() {
  const {post, get} = BaseService();

  const campaigns = async function () {
    return await post('/campaigns');
  };
  const honoures = async function (name: any) {
    return await post('/honoures/?name=' + name);
  };

  const company = async function (data: any) {
    console.log('/company?city=' + data?.city + '&name=' + data?.name);
    return await post('/company?city=' + data?.city + '&name=' + data?.name);
    // if (data?.name) {
    //  ;
    //   return !isNaN(data?.name)
    //     ? await post(
    //         '/company?phone=' +
    //           data?.name +
    //           (data.city != null ? '?city=' + data.city : ''),
    //       )
    //     : await post(
    //         '/company?email=' +
    //           data?.name +
    //           (data.city != null ? '?city=' + data.city : ''),
    //       );
    // } else {
    //   return await post(
    //     '/company' + (data.city != null ? '?city=' + data.city : ''),
    //   );
    // }
  };

  return {
    campaigns,
    honoures,
    company,
  };
}
