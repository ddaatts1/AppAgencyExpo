import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {ROUTES} from '../constants';

import CommonHeaderTab from '../components/commons/commonHeaderTab';
import Program from '../screens/module/News/Program';
import AllPost from '../screens/module/News/AllPost';
import useNews from "../screens/module/News/useNews";
import {useEffect, useState} from "react";


const Tab = createMaterialTopTabNavigator();

function NewsTab() {


    const  {dataCategory,CategoryList,isLoadingCategory}= useNews()

    const [listTab,setlistTab] = useState()
    useEffect(()=>{

        const fetchData = async ()=>{
             await  CategoryList()
        }

        fetchData()
    },[])


    useEffect(() => {
        const fetchData = async () => {
            await CategoryList()
        }

        fetchData()

        if (dataCategory) {
            const listcat = dataCategory?.map((c:any,index:any)=>(
                { text: c.cat_name, isActive: false, route: ROUTES.PROGRAM,slug: c.slug }
            ))


            setlistTab([{ text: 'Tất cả', isActive: true, route: ROUTES.ALLPOST,slug:"all" }, ...listcat]);
        }
    }, [dataCategory])




    // const listTab = [
    //     { text: 'Tất cả', isActive: true, route: ROUTES.ALLPOST },
    //     { text: 'Chương trình', isActive: false, route: ROUTES.PROGRAM},
    //     { text: 'Tin tức', isActive: false, route: ROUTES.NEWS},
    // ];

    return (<>
            {listTab&&         <Tab.Navigator tabBar={(props) => <CommonHeaderTab {...props} listTab={listTab} />} screenOptions={{swipeEnabled: false}} sceneContainerStyle={{backgroundColor: 'white'}}>
                <Tab.Screen name={ROUTES.ALLPOST} component={AllPost} />
                <Tab.Screen name={ROUTES.PROGRAM} component={Program}    />
                {/*<Tab.Screen name={ROUTES.NEWS} component={News} />*/}
            </Tab.Navigator>}
    </>


    );
}

export default NewsTab;
