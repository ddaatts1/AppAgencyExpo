// import React, { useEffect, useState } from 'react';
// import {
//   StackNavigationProp,
//   createStackNavigator,
// } from '@react-navigation/stack';
// import { ParamListBase, useNavigation } from '@react-navigation/native';
// import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import { ROUTES, SVG } from '../../constants';

// import Question from './question/question';
// import useTraining from './useTraining';

// const Stack = createStackNavigator();

// function QuestionNavigator({ navigation, route }: any) {
//   //const Stack = route?.params?.Stack;
//   const name = route?.params?.name;
//   const indexRoute = route?.params?.indexRoute;
//   const navigations = route?.params?.navigation;
//   const id = route?.params?.id;

//   const headerLeftComponent = (text: string) => (
//     <View style={{ flex: 1 }}>
//       <View style={styles.headerLeft}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <View>
//             <SVG.Leftcircleo style={styles.iconLef} />
//           </View>
//         </TouchableOpacity>
//         <View style={{ justifyContent: 'center' }}>
//           <Text style={styles.headerText}>{text}</Text>
//         </View>
//       </View>
//     </View>
//   );

//   const headerBackground = (
//     <Image
//       style={styles.container}
//       source={require('../../assets/image/Header1.png')}
//     />
//   );

//   return (
//     <Stack.Navigator
//       screenOptions={{}}
//       initialRouteName={ROUTES.QUESTION}
//       key={indexRoute}>
//       <Stack.Screen
//         name={ROUTES.QUESTION}
//         initialParams={{ id: id }}
//         component={Question}
//         options={{
//           headerBackground: () => (
//             <View
//               style={[
//                 styles.Header,
//                 {
//                   shadowColor: '#000',
//                   shadowOpacity: 0.5,
//                   shadowRadius: 10,
//                   elevation: 5,
//                   //  backgroundColor: "red"
//                 },
//               ]}
//             />
//           ),
//           headerTitleStyle: { marginTop: 30, color: '#FFFFFF', fontSize: 18 },
//           headerTitle: '',
//           headerShown: false,
//         }}
//       />
//     </Stack.Navigator>
//   );
// }

// const styles = StyleSheet.create({
//   Header: {
//     height: 100,
//     width: '100%',
//     backgroundColor: 'white',

//     borderBottomLeftRadius: 20,
//     borderBottomRightRadius: 20,
//     paddingHorizontal: 20,
//     paddingVertical: 20,
//     ...StyleSheet.absoluteFillObject,
//   },
//   iconLef: {
//     width: 40,
//     height: 40,
//     justifyContent: 'center',
//     alignItems: 'center',
//     // marginTop: 80,
//     //  marginLeft: 20
//   },
//   headerBox: {
//     width: '100%',
//     position: 'relative',
//     resizeMode: 'stretch',
//   },
//   iconRight: {
//     width: 40,
//     height: 40,
//   },
//   container: {
//     height: 90,
//     width: '100%',
//     backgroundColor: 'white',

//     borderBottomLeftRadius: 20,
//     borderBottomRightRadius: 20,
//     paddingHorizontal: 20,
//     paddingVertical: 20,
//     ...StyleSheet.absoluteFillObject,
//   },
//   headerTitleStyle: { marginTop: 30, color: '#FFFFFF', fontSize: 18 },
//   headerLeft: {
//     flexDirection: 'row',
//     paddingTop: 20,
//     paddingLeft: 16,
//   },
//   headerText: {
//     fontSize: 20,
//     color: '#FFFFFF',
//     fontWeight: '600',
//     paddingLeft: 10,
//     paddingBottom: 2,
//   },

//   iconBackStyle: {
//     width: 32,
//     height: 32,
//   },
//   textBannerWhite: {
//     color: '#323232',
//     fontSize: 18,
//     paddingLeft: 8,
//     paddingTop: 4,
//     fontWeight: 600,
//   },
//   headerWhite: {
//     height: 85,
//     width: '100%',
//     backgroundColor: 'white',
//     borderBottomLeftRadius: 18,
//     borderBottomRightRadius: 18,
//     paddingHorizontal: 20,
//     paddingVertical: 20,
//     ...StyleSheet.absoluteFillObject,
//     shadowColor: '#000',
//     shadowOpacity: 0.5,
//     shadowRadius: 10,
//     elevation: 5,
//   },
//   headerLeftWhite: {
//     flexDirection: 'row',
//     paddingTop: 12.5,
//     paddingLeft: 16,
//   },
// });
// export default QuestionNavigator;
