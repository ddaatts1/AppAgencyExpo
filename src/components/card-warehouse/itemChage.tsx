import { View } from 'react-native';
import { SVG } from '../../constants';
import { StyleSheet } from 'react-native';

const ItemChage = ({ color, children }: { color: any, children: any }) => {
    return (
        <View style={styles.main}>
            <View
                style={[styles.dropShadow]}>
                {children}
            </View>
        </View>

    );
};


export default ItemChage;
const styles = StyleSheet.create({
    main: {
        width: 'auto',
        padding: 6,

    },
    dropShadow: {

        borderRadius: 12,
        shadowColor: '#000',
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 2,
        backgroundColor: 'white',
    },

});
