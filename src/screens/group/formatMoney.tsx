export default function formatPriceVND(input: any) {
    const number = parseFloat(input);

    if (isNaN(number) || !isFinite(number)) {
        return "Invalid";
    }

    return `${number.toLocaleString('vi-VN', {
        style: 'currency',
        currency: 'VND',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
        
    })}`;
}



export function formatMoneyTransfer(value) {
    const number = parseFloat(value);

    if (isNaN(number) || !isFinite(number)) {
        return "Invalid";
    }

    if (number >= 0) {
        return '+' + `${number.toLocaleString('vi-VN', {
            style: 'currency',
            currency: 'VND',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        })}`;
    } else {
        return '-' + Math.abs(number).toLocaleString('vi-VN', {
            style: 'currency',
            currency: 'VND',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        });
    }
}

export  function formatPriceVNDShop(input: any) {
    const number = parseFloat(input);

    if (isNaN(number) || !isFinite(number)) {
        return "Invalid";
    }

    const formattedNumber = number.toLocaleString('vi-VN');

        return formattedNumber;
}
