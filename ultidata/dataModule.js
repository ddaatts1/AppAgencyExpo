import Store from '../src/assets/icons/Store.svg';
import { ROUTES, SVG } from '../src/constants';

const dataModule = [
    {
        data: 1,
        title: 'Cửa hàng',
        image: require('../src/assets/image/cuahang.png'),
        route: ROUTES.WHOLE_SALE,
        svg: Store,
    },
    {
        data: 2,
        title: 'Đội nhóm',
        image: require('../src/assets/image/doinhom.png'),
        route: ROUTES.GROUP,
        svg: '',
    },
    {
        data: 3,
        title: 'Khách hàng',
        image: require('../src/assets/image/khachhang.png'),
        route: ROUTES.CUSTOMER_NAVIGATOR,
        svg: '',
    },
    {
        data: 4,
        title: 'Kho thẻ',
        image: require('../src/assets/image/khothe.png'),
        route: ROUTES.CARD_WAREHOUSE_TAB_NAVIGATOR,
        svg: '',
    },
    {
        data: 5,
        title: 'Thu nhập',
        image: require('../src/assets/image/thunhap.png'),
        route: ROUTES.INCOME,
        svg: '',
    },
    {
        data: 6,
        title: 'Hỗ trợ',
        image: require('../src/assets/image/hotro.png'),
        route: ROUTES.SUPPORT_MANAGEMENT,
        svg: '',
    },
    {
        data: 7,
        title: 'Văn phòng',
        image: require('../src/assets/image/vanphong.png'),
        route: ROUTES.OFFICE_NAVIGATOR,
        svg: '',
    },
    {
        data: 8,
        title: 'Bảng vàng',
        image: require('../src/assets/image/GoldenTable.png'),
        route: ROUTES.GOLDEB_TABLE_TAB_NAVIGATOR,
        svg: '',
    },
];

export default dataModule;
