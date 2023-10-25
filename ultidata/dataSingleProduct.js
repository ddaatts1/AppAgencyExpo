const dataSingleProduct = [
    {
        id: 1,
        image: require('../src/assets/image/discount.png'),
        title: 'Thẻ học tiếng Anh 3 năm',
        price_Discount: '2.000.000',
        price: 1000000,
        quantity: 0,
        saled: 'Đã bán 1,4k',
    },
    {
        id: 2,
        image: require('../src/assets/image/CardEngGreen.png'),
        title: 'Thẻ học tiếng Anh 3 năm',
        price_Discount: '2.000.000',
        price: 1000000,
        quantity: 0,
        saled: 'Đã bán 1,4k',
    },
    {
        id: 3,
        image: require('../src/assets/image/CardEngYellow.png'),
        title: 'Thẻ học tiếng Anh 15 năm',
        price_Discount: '2.000.000',
        price: 1000000,
        quantity: 0,
        saled: 'Đã bán 1,4k',
    },
    {
        id: 4,
        image: require('../src/assets/image/CardEngGreen.png'),
        title: 'Thẻ học tiếng Anh 15 năm',
        price_Discount: '2.000.000',
        price: 1000000,
        quantity: 0,
        saled: 'Đã bán 1,4k',
    },
    {
        id: 5,
        image: require('../src/assets/image/CardEngGreen.png'),
        title: 'Thẻ học tiếng Anh 15 năm',
        price_Discount: '2.000.000',
        price: 1000000,
        quantity: 0,
        saled: 'Đã bán 1,4k',
    },
    {
        id: 6,
        image: require('../src/assets/image/CardEngYellow.png'),
        title: 'Thẻ học tiếng Anh 15 năm',
        price_Discount: '2.000.000',
        price: 1000000,
        quantity: 0,
        saled: 'Đã bán 1,4k',
    },
];

export function getSingleProducts() {
    return dataSingleProduct;
}

export function getSingleProduct(id) {
    return dataSingleProduct.find((product) => product.id === id);
}

export default dataSingleProduct;
