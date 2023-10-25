import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

const Support = () => {
  return (
    <ScrollView style={styles.main}>
      <View style={styles.container}></View>
    </ScrollView>
  );
};

export default Support;

const styles = StyleSheet.create({
  main: {
    backgroundColor: 'white',
  },
  container: {
    width: '100%',
  },
});
