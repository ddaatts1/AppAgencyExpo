import React from "react";

const TransactionType = ({ val }) => {
    let text = "";
    if (val && typeof val.type !== "undefined") {
        if (typeof val.type === "string") {
            switch (val.type) {
                case "order":
                    text = "Thưởng đơn hàng";
                    break;
                case "month":
                    text = "Thưởng tháng";
                    break;
                case "group":
                    text = "Thưởng doanh số nhóm";
                    break;
                case "admin_payment":
                    text = "Admin thanh toán";
                    break;
                case "commission":
                    text="Hoa hồng";
                    break;
                case "exchange":
                    text="Đổi thẻ";
                    break;
                default:
                    text = "Admin tặng điểm";
            }
        } else {
            if (val.type < 0) {
                text = "Admin thanh toán";
            } else {
                text = "Hoa hồng";
            }
        }
    }

    return text;
};

export default TransactionType;
