// export function getDiscounts() {
//     return dataDiscount;
// }

// export function getDiscount(id) {
//     return dataDiscount.find((product) => product.id === id);
// }

export default function dataDiscount() {
    const dataDiscountList = [
        {
            id: 1,
            title: 'Combo 5 thẻ học tiếng Anh 3 năm',
            image: require('../src/assets/image/discount.png'),
            priceDiscount: 1000000,
            priceActual: 20000000,
            sale: 'đã bán 1,4k',
        },
        {
            id: 2,
            title: 'Combo 5 thẻ học tiếng Anh 3 năm',
            image: require('../src/assets/image/discount.png'),
            priceDiscount: 1000000,
            priceActual: 20000000,
            sale: 'đã bán 1,4k',
        },
        {
            id: 3,
            title: 'Combo 5 thẻ học tiếng Anh 3 năm',
            image: require('../src/assets/image/discount.png'),
            priceDiscount: 1000000,
            priceActual: 20000000,
            sale: 'đã bán 1,4k',
        },
        {
            id: 4,
            title: 'Combo 5 thẻ học tiếng Anh 3 năm',
            image: require('../src/assets/image/discount.png'),
            priceDiscount: 1000000,
            priceActual: 20000000,
            sale: 'đã bán 1,4k',
        },
    ];
    const dataCategory = [
        {
            id: 1,
            name: 'Thẻ học',
            selected: true,

        },
        {
            id: 2,
            name: 'Fshop',
            selected: false,
        },
    ];

    const dataShop = [
        {
            id: 1,
            image: require('../src/assets/image/discount.png'),
            title: 'Combo 5 thẻ học tiếng Anh 3 năm',
            material: 'Màu trắng, size M',
            price_Discount: '2.000.000',
            price: 1000000,
            quantity: 0,
            saled: 'Đã bán 1,4k',
        },
        {
            id: 2,
            image: require('../src/assets/image/discount.png'),
            title: 'Combo 5 thẻ học tiếng Anh 3 năm',
            material: 'Màu trắng, size M',
            price_Discount: '2.000.000',
            price: 1000000,
            quantity: 0,
            saled: 'Đã bán 1,4k',
        },
    ];
    const dataFShop = [
        {
            id: 1,
            image: require('../src/assets/image/Balo.png'),
            title: 'Balo FutureLang ',
            price_Discount: '2.000.000',
            price: 1000000,
            solded: 'Đã bán 1,2k',
            quantity: 1,
        },
        {
            id: 2,
            image: require('../src/assets/image/Balo.png'),
            title: 'Balo FutureLang ',
            price_Discount: '2.000.000',
            price: 1000000,
            solded: 'Đã bán 1,2k',
            quantity: 1,
        },
    ];
    return {
        dataCategory, dataShop, dataFShop, dataDiscountList,
    };
}
