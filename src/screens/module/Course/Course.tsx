import {
    StyleSheet,
    View,
    ScrollView,
} from 'react-native';

const Course = () => {
    return (
        <ScrollView style={styles.main}>
            <View style={styles.container} />
        </ScrollView>
    );
};

export default Course;

const styles = StyleSheet.create({
    main: {
        backgroundColor: 'white',
    },
    container: {
        width: '100%',
    },
});
