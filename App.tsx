

import { NavigationContainer, } from '@react-navigation/native';
import {
  Image
} from 'react-native';
import AuthNavigator from './src/navigations/AuthNavigator';
import { useState, useEffect } from 'react';

import HomeNavigator from './src/navigations/HomeNavigator';
import AuthProvider, { useAuth } from './src/screens/auth/AuthContext';
import { View, StatusBar } from 'react-native';
import LoadingReact from './src/components/commons/loading';
import {FutureLangProvider} from "./src/screens/context/StartUpProvider";

export default function App() {
  const [isCheckTimout, setCheckTimout] = useState(false);
  useEffect(() => {
    setTimeout(async () => {
      setCheckTimout(true)
    }, 3000);
  }, []);
  if (!isCheckTimout) {
    return (
      <View style={{ backgroundColor: "#14B0FC" }} >
        <StatusBar
          backgroundColor="transparent"
          animated={true}
          barStyle={'dark-content'}
          translucent={true}
        />
        <Image source={require("./src/assets/image/Intro.png")} style={{ height: "100%", width: "100%", }} resizeMode={'cover'} />
        {/* <SVG.Intro width={"100%"} height={"100%"} viewBox={`0 0 ${imageWidth} ${imageHeght}`} /> */}

      </View>
    );

  } else {
    return (
      <AuthProvider>
      <FutureLangProvider>
        <Layout></Layout>
      </FutureLangProvider>

      </AuthProvider>
    );
  }
}



export const Layout = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { authState, intro } = useAuth()
  useEffect(() => {
    let authenticated = authState?.authenticated;
    if (authenticated === null) {
      setIsLoading(false)
    } else {
      setIsLoading(true)
    }
  }, [authState]);
  return (

    isLoading ? <NavigationContainer>
      {
        authState?.authenticated ? (<HomeNavigator isIntro={intro?.isIntro} />) : <AuthNavigator />
      }
    </NavigationContainer> : <LoadingReact />


  );
}
