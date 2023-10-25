import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {ROUTES, SVG} from '../constants';
import {
    View,
    Text, TouchableOpacity,
} from 'react-native';

import CommonHeaderTab from '../components/commons/commonHeaderTab';
import CardEng from '../screens/module/Shop/SingleOrder/CardEng';
import CardJapan from '../screens/module/Shop/SingleOrder/CardJapan';
import CardKorea from '../screens/module/Shop/SingleOrder/CardKorea';
import useOrder from "../screens/module/Shop/useOrder";
import React, {useEffect, useState} from "react";
import {useFutureLang} from "../screens/context/StartUpProvider";
import {SERVICE_FTL, SERVICE_KIDS} from "../constants/service";
import SingleCardAll from "../screens/module/Shop/SingleOrder/SingleCardAll";
import {useFocusEffect} from "@react-navigation/native";
import {StorageHelper} from "../services/api/auth";
import Balo from "../screens/module/Shop/Fshop/Balo";


const Tab = createMaterialTopTabNavigator();

function LanguageTabNavigator({route,navigation}: any) {
    // const listTab = [
    //     { text: 'Tiếng Anh', isActive: true, route: ROUTES.CARDENG },
    //     { text: 'Tiếng Trung', isActive: false, route: ROUTES.CARDCHINA},
    //     { text: 'Tiếng Nhật', isActive: false, route: ROUTES.CARDJAPAN},
    //     { text: 'Tiếng Hàn', isActive: false, route: ROUTES.CARDKOREA},
    // ];
    const {futureLang} = useFutureLang()
    const service = futureLang ? SERVICE_FTL : SERVICE_KIDS
    const [listTab, setlistTab] = useState()

    const {orderCategoriesData, fetchOrderCategories, isLoadingOrderCategoriesData} = useOrder()


    //
    const [productCount,setProductCount] = useState(0)

    useFocusEffect(
        React.useCallback(() => {

            fetchCartCount();
        }, [])
    );

    const fetchCartCount = async () => {
        try {
            if(futureLang){
                const cartCount = await StorageHelper.getCartCountFTL();
                console.log("Cart count ftl:", cartCount);
                setProductCount(cartCount);
            }else {
                const cartCount = await StorageHelper.getCartCountKIDS();
                console.log("Cart count kids:", cartCount);
                setProductCount(cartCount);
            }

        } catch (error) {
            console.error('Error fetching cart count:', error);
        }
    };

    function IconWithBadge({ badgeCount }: { badgeCount: any }) {
        return (

            <View>
                {badgeCount > 0 && (

                    <View style={{
                        position: 'absolute',
                        right: 5,
                        top: -45,
                        borderRadius: 6,
                        backgroundColor: 'red',
                        width: 17,
                        height: 12,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <Text style={{ color: '#fff', fontSize: 10, fontWeight: '500' }}>{badgeCount}</Text>
                    </View>
                )}

            </View>
        );
    }

    function HomeIconWithBadge(props: any) {

        return <IconWithBadge {...props} badgeCount={props.count} />;
    }

    useEffect(() => {

        console.log("=======> product count: "+JSON.stringify( productCount))
        navigation.setOptions({

            headerTitleStyle: { marginTop: 30, color: '#FFFFFF', fontSize: 18 },
            headerTitle: '',
            headerShown: true,
            headerRight: () => {
                return (
                    <View style={{ flex: 1 }}>
                        <View style={{ marginTop: 15, marginRight: 10 }}>
                            <TouchableOpacity
                                onPress={() => navigation.navigate(ROUTES.CART)}
                            >
                                <SVG.Cart />
                            </TouchableOpacity>
                            <HomeIconWithBadge count={productCount}/>

                        </View>
                    </View>
                );
            },

        });
    }, [productCount]);

    //
    useEffect(() => {

        const fetchData = async () => {
            const data = {
                service: service,
                type: "Card"
            }
            fetchOrderCategories(data)
        }
        fetchData()
    }, [])


    useEffect(() => {

        if (orderCategoriesData) {
            console.log("orderCategoriesData: " + JSON.stringify(orderCategoriesData))
            const listcat = orderCategoriesData?.data?.map((c: any, index: any) => (
                {text: c.cat_name, isActive: false, route: ROUTES.CARDENG, slug: c.cat_id}
            ))

            const listTab = [{ text: "Tất cả", isActive: true, route: ROUTES.SINGLECARDALL },...listcat]

            console.log("listTab: "+ JSON.stringify(listTab))

            setlistTab(listTab);
        }
    }, [orderCategoriesData])

    return (<>
            {listTab &&
            <Tab.Navigator tabBar={(props) => <CommonHeaderTab {...props} listTab={listTab}/>}
                           screenOptions={{swipeEnabled: false}} sceneContainerStyle={{backgroundColor:'#fff'}}>

                <Tab.Screen name={ROUTES.SINGLECARDALL} component={(props) => (
                    <SingleCardAll
                        {...props}
                        onAddToCartSuccess={() => {
                            setProductCount(prev=>prev+1)
                        }}
                    />
                )} />

                <Tab.Screen name={ROUTES.CARDENG} component={(props) => (
                    <CardEng
                        {...props}
                        onAddToCartSuccess={() => {
                            setProductCount(prev=>prev+1)
                        }}
                    />
                )} initialParams={{id: listTab[0].slug}}/>

            </Tab.Navigator>
            }
        </>


    );
}

export default LanguageTabNavigator;
