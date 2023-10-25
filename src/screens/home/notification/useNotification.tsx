import { useState } from 'react';
import NotificationService from "../../../services/notification.service";

export default function useNotification() {
    const {
        notificationDetail,
        notificationList,
        notificationNewDetail,
        notificationToken,
        notification,
    } = NotificationService();

    const [isFetchingNotificationDetail, setIsFetchingNotificationDetail] = useState(false);
    const [notificationDetailData, setNotificationDetailData] = useState(null);

    const [isFetchingNotificationList, setIsFetchingNotificationList] = useState(false);
    const [notificationListData, setNotificationListData] = useState([]);

    const [isFetchingNewNotificationDetail, setIsFetchingNewNotificationDetail] = useState(false);
    const [newNotificationDetailData, setNewNotificationDetailData] = useState(null);

    const [isFetchingNotificationToken, setIsFetchingNotificationToken] = useState(false);
    const [notificationTokenData, setNotificationTokenData] = useState(null);

    const [isFetchingNotification, setIsFetchingNotification] = useState(false);
    const [notificationData, setNotificationData] = useState(null);

    const fetchNotificationDetail = async (data) => {
        try {
            setIsFetchingNotificationDetail(true);
            const response = await notificationDetail(data);
            setNotificationDetailData(response);
        } catch (error) {
            console.error('Error fetching notification detail:', error);
        } finally {
            setIsFetchingNotificationDetail(false);
        }
    };

    const fetchNotificationList = async () => {
        try {
            setIsFetchingNotificationList(true);
            const response = await notificationList();
            setNotificationListData(response);
        } catch (error) {
            console.error('Error fetching notification list:', error);
        } finally {
            setIsFetchingNotificationList(false);
        }
    };

    const fetchNewNotificationDetail = async (data) => {
        try {
            setIsFetchingNewNotificationDetail(true);
            const response = await notificationNewDetail(data);
            setNewNotificationDetailData(response);
        } catch (error) {
            console.error('Error fetching new notification detail:', error);
        } finally {
            setIsFetchingNewNotificationDetail(false);
        }
    };

    const fetchNotificationToken = async (data) => {
        try {
            setIsFetchingNotificationToken(true);
            const response = await notificationToken(data);
            setNotificationTokenData(response);
        } catch (error) {
            console.error('Error fetching notification token:', error);
        } finally {
            setIsFetchingNotificationToken(false);
        }
    };

    const fetchNotification = async (data) => {
        try {
            setIsFetchingNotification(true);
            const response = await notification(data);
            setNotificationData(response);
        } catch (error) {
            console.error('Error fetching notification:', error);
        } finally {
            setIsFetchingNotification(false);
        }
    };

    return {
        isFetchingNotificationDetail,
        notificationDetailData,
        fetchNotificationDetail,
        isFetchingNotificationList,
        notificationListData,
        fetchNotificationList,
        isFetchingNewNotificationDetail,
        newNotificationDetailData,
        fetchNewNotificationDetail,
        isFetchingNotificationToken,
        notificationTokenData,
        fetchNotificationToken,
        isFetchingNotification,
        notificationData,
        fetchNotification,
    };
}
