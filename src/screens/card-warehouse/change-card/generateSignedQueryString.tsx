import React from 'react';
import CryptoJS from 'crypto-js';

const key = 'EF39D3D5DC4C112C438A3DE286235';


export default function generateSignedQueryString(data: any) {

    const plaintext = `cardIdOld=${data.cardIdOld}&cardIdNew=${data.cardIdNew}&quanlityOld=${data.quanlityOld}&quanlityNew=${data.quanlityNew}&balance=${data.balance}&service=${data.service}`;

    const hash = CryptoJS.HmacSHA256(plaintext, key).toString();

    return hash
}


export function generateSignedFshop(data: any) {
    const plaintext = `customer_name=${data.customer_name}&customer_phone=${data.customer_phone}&total_amount=${data.total_amount}`;
    console.log("plaintext: " + plaintext)
    const hash = CryptoJS.HmacSHA256(plaintext, key).toString();

    return hash
}

export function generateSignedSingle(data: any) {
    // /$planText = 'type=' . $type . '&total_amount=' . $total_amount . '&service=' . $service;/"
    const plaintext = `type=${data.type}&total_amount=${data.total_amount}&service=${data.service}`;
    console.log("plaintext: " + plaintext)
    const hash = CryptoJS.HmacSHA256(plaintext, key).toString();

    return hash
}

export function generateSignedCancelOrder(data: any) {
    // "type,order_id"
    const plaintext = `type=${data.type}&order_id=${data.order_id}`;
    // console.log("plaintext: "+ plaintext)
    const hash = CryptoJS.HmacSHA256(plaintext, key).toString();

    return hash
}

