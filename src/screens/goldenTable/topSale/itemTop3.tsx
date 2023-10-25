import React from 'react';
import {
  Text,
  SafeAreaView,
  ScrollView,
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {SVG} from '../../../constants';
import {EnumNavigatorTraining, EnumRank} from '../../../constants/enum';
import RenderHTML from 'react-native-render-html';
import useCommon from '../../../constants/useCommon';
const ItemTop3 = ({index, data}: any) => {
  const {formatD, formatVND} = useCommon();

  const setColor = (item: any) => {
    switch (item) {
      case EnumRank.Best:
        return ['#F3815D', '#FCE0E0', '#FFFFFF'];
      case EnumRank.Second:
        return ['#FDD69C', '#FEE9C9', '#FFFFFF'];
      case EnumRank.Father:
        return ['#FFEF99', '#FFF5BE', '#FFFFFF'];
      case EnumRank.FourthPrize:
        return ['#EEFAFF', '#EEFAFF', '#EEFAFF'];
      case EnumRank.FifthPrize:
        return ['#EEFAFF', '#EEFAFF', '#EEFAFF'];
      case EnumRank.SixthPrize:
        return ['white', 'white', 'white'];
      default:
        return ['white', 'white', 'white'];
    }
  };
  const setIcon = (item: any) => {
    switch (item) {
      case EnumRank.Best:
        return <SVG.Icon_goldMedal />;
      case EnumRank.Second:
        return <SVG.Icon_silverMedal />;
      case EnumRank.Father:
        return <SVG.Icon_bronzeMedal />;
      case EnumRank.FourthPrize:
        return items(item);
      case EnumRank.FifthPrize:
        return items(item);
      case EnumRank.SixthPrize:
        return items(item);
      default:
        return items(item);
    }
  };

  const items = (item: any) => {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            backgroundColor: 'white',
            borderRadius: 16,
            paddingHorizontal: 10,
            paddingVertical: 4,
          }}>
          {item}
        </Text>
      </View>
    );
  };
  const setBackgroundColor = (item: any) => {
    switch (item) {
      case EnumRank.Best:
        return 'red';
      case EnumRank.Second:
        return '#D84315';
      case EnumRank.Father:
        return '#FFB300';
      case EnumRank.FourthPrize:
        return '#0288D1';
      case EnumRank.FifthPrize:
        return '#0288D1';
      case EnumRank.SixthPrize:
        return '#0288D1';
      default:
        return '#0288D1';
    }
  };
  const phone = (item: any) => {
    return item.substring(0, item.length - 2) + '**';
  };
  return (
    <LinearGradient
      colors={setColor(index)}
      start={{x: 0, y: 1}}
      end={{x: 1, y: 1}}
      style={{
        // height: 126,
        width: '100%',
        borderRadius: 12,
        paddingHorizontal: 8,
        marginTop: 8,
        flexDirection: 'row',
      }}>
      <View style={{justifyContent: 'center', width: '15%'}}>
        {setIcon(index)}
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '85%',
        }}>
        <View style={{justifyContent: 'center', width: '38%'}}>
          <Text
            style={{
              color: '#181818',
              fontWeight: 'normal',
              fontSize: 16,
            }}>
            {data.fullname}
          </Text>
          <Text
            style={{
              color: '#181818',
              fontWeight: 'normal',

              fontSize: 14,
            }}>
            {phone(data.telephone)}
          </Text>
          {data?.fullname && (
            <View
              style={{
                flexDirection: 'row',
                backgroundColor: setBackgroundColor(index),
                borderRadius: 24,

                paddingVertical: 8,
              }}>
              <SVG.Icon_dola height={20} width={20} />
              <Text style={{color: 'white', fontSize: 14}}>
                {formatD(data.sales)}
              </Text>
            </View>
          )}
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: '50%',
          }}>
          <Text
            style={{
              color: '#181818',
              fontWeight: 'normal',
              fontSize: 12,
            }}>
            Giải thưởng:
          </Text>

          {data?.image && (
            <Image
              resizeMode="cover"
              style={{height: 120, width: 120}}
              source={{uri: data?.image}}
            />
          )}

          <RenderHTML
            source={{
              html: data.des,
            }}
          />
          {/* <Text
            style={{
              color: '#181818',
              fontWeight: 'normal',
              fontSize: 12,
            }}>
            Xe máy SH Mode
          </Text>
          <Text
            style={{
              color: 'red',
              fontWeight: 'normal',
              fontSize: 12,
            }}>
            72.000.000Đ
          </Text> */}
        </View>
      </View>
    </LinearGradient>
  );
};

export default ItemTop3;
