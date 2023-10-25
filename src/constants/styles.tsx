import { StyleSheet } from 'react-native';

export default {
  IconStyle: StyleSheet.create({
    container: {
      height: 40,
      width: 40,

    },
  }),
  HeaderStyle: StyleSheet.create({
    container: {
      height: 90,
      width: '100%',
      backgroundColor: '#14B0FC',

    },
  }),

  text_16: StyleSheet.create({
    text: {

      fontSize: 16,
      color: '#323232',
      paddingBottom: 5,
    },
    text1: {

      fontSize: 16,
      color: '#0288D1',
      paddingBottom: 5,
    },
    text_color: {
      fontSize: 16,
      color: 'red',
      paddingBottom: 5,
    },
  }),
  style_input: StyleSheet.create({
    icon_Left: {
      paddingLeft: 10,
      paddingTop: 15,
      color: '#0288D1',
    },
    icon_right: {
      paddingTop: 15,
      paddingRight: 20,
      color: '#0288D1',
    },
    icon_right_color: {
      paddingTop: 15,
      paddingRight: 20,
      color: 'gray',
    },
    view: {
      width: '100%',
      flexDirection: 'row',
      height: 52,
      backgroundColor: '#EEFAFF',
      borderColor: '#EEFAFF',
      borderWidth: StyleSheet.hairlineWidth,
      borderRadius: 10,
    },
    textInput: {
      borderColor: '#EEFAFF',
      width: '90%',
      flexDirection: 'row',
      height: 51,
      backgroundColor: '#EEFAFF',
      borderWidth: StyleSheet.hairlineWidth,
      borderRadius: 10,
      color: "#323232"
    },

    textInputRight: {
      borderColor: '#EEFAFF',
      width: '82%',

      flexDirection: 'row',
      height: 51,
      backgroundColor: '#EEFAFF',

      borderWidth: StyleSheet.hairlineWidth,
      borderRadius: 10,
    },
    viewErrorText: {
      paddingTop: 5,
      alignItems: 'center',
      justifyContent: "center",

    },
    errorText: {
      fontSize: 14,
      textAlign: 'center',
      height: 22,
      paddingLeft: 10,
      paddingRight: 10,
      paddingTop: 0,

      borderRadius: 15,


      color: 'red',

      backgroundColor: '#FFF2F0',
    },
    errorInput: {
      borderColor: 'red',
    },
  }), Header: {
    // height: 100,
    width: '100%',
    // backgroundColor: 'white',

    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 20,
    ...StyleSheet.absoluteFillObject,
  }, headerLeft: {
    flexDirection: 'row',
    paddingTop: 20,
    paddingLeft: 16,
  }, iconLef: {
    width: 40,
    height: 40,

    // marginTop: 80,
    //  marginLeft: 20
  }, headerText: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: '600',
    paddingLeft: 10,
    paddingBottom: 2,
  },
};
