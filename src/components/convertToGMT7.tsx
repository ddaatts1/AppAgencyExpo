import moment from 'moment';
import 'moment-timezone';

 const convertToGMT7 = (originalTime:any) => {

     const gmt7Time = moment(originalTime).add(7, 'hours');

     return gmt7Time.format('YYYY-MM-DD HH:mm:ss');

};


export default convertToGMT7;

