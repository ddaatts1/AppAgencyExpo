import { ImageBackground } from 'react-native';
import Lottie from 'lottie-react-native';
import { SVG } from '../../constants';
const LottieIntro = () => {
  return (

    <ImageBackground
      style={{ flex: 1 }}
      source={require('../../assets/image/Intro.png')}>
      <Lottie source={require('../../assets/load.json')} autoPlay loop />
    </ImageBackground>
  );
};
export default LottieIntro;
