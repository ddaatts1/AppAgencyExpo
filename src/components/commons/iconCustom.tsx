import {EnumIconCustom} from '../../constants/enum';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';

const IconCustom = (props: any) => {
  const state = props.state;
  const color = props.color;
  const size = props.size;
  const name = props.name;
  const style = props.style;

  {
    switch (state) {
      case EnumIconCustom.AntDesign:
        return (
          <AntDesign color={color} size={size} name={name} style={style} />
        );

      case EnumIconCustom.Entypo:
        return <Entypo color={color} size={size} name={name} style={style} />;

      case EnumIconCustom.EvilIcons:
        return (
          <EvilIcons color={color} size={size} name={name} style={style} />
        );

      case EnumIconCustom.Feather:
        return <Feather color={color} size={size} name={name} style={style} />;
      case EnumIconCustom.FontAwesome:
        return (
          <FontAwesome color={color} size={size} name={name} style={style} />
        );
      case EnumIconCustom.FontAwesome5:
        return (
          <FontAwesome5 color={color} size={size} name={name} style={style} />
        );
      case EnumIconCustom.Fontisto:
        return <Fontisto color={color} size={size} name={name} style={style} />;
      case EnumIconCustom.Foundation:
        return (
          <Foundation color={color} size={size} name={name} style={style} />
        );
      case EnumIconCustom.Ionicons:
        return <Ionicons color={color} size={size} name={name} style={style} />;
    }
  }
};
export default IconCustom;
