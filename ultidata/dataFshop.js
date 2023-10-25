const dataFshop = [
    {
        id: 1,
        image: require('../src/assets/image/Balo.png'),
        title: 'Balo FutureLang ',
        price_Discount: '2.000.000',
        price: 1000000,
        solded: 'Đã bán 1,2kz',
        quantity: 0,
    },
    {
        id: 2,
        image: require('../src/assets/image/Balo.png'),
        title: 'Balo FutureLang ',
        price_Discount: '2.000.000',
        price: 1000000,
        solded: 'Đã bán 1,2k',
        quantity: 0,
    },
    {
        id: 3,
        image: require('../src/assets/image/Balo.png'),
        title: 'Balo FutureLang ',
        price_Discount: '2.000.000',
        price: 1000000,
        solded: 'Đã bán 1,2k',
        quantity: 0,
    },
    {
        id: 4,
        image: require('../src/assets/image/Balo.png'),
        title: 'Balo FutureLang ',
        price_Discount: '2.000.000',
        price: 1000000,
        solded: 'Đã bán 1,2k',
        quantity: 0,
    },
    {
        id: 5,
        image: require('../src/assets/image/Balo.png'),
        title: 'Balo FutureLang ',
        price_Discount: '2.000.000',
        price: 1000000,
        solded: 'Đã bán 1,2k',
        quantity: 0,
    },
    {
        id: 6,
        image: require('../src/assets/image/Balo.png'),
        title: 'Balo FutureLang ',
        price_Discount: '2.000.000',
        price: 1000000,
        solded: 'Đã bán 1,2k',
        quantity: 0,
    },
];

export function getDiscounts() {
    return dataFshop;
}

export function getDiscount(id) {
    return dataFshop.find((product) => product.id === id);
}

export default dataFshop;
