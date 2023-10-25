import { View } from "react-native";
import { SVG } from "../../constants";
import { StyleSheet } from "react-native";

const ItemAmbassador = ({ color, children }: { color: any, children: any }) => {
    return (
        <View style={styles.main}>
            <View
                style={[
                    { borderWidth: 0, borderLeftColor: color, },
                    styles.dropShadow,
                ]}>
                {children}
            </View>
        </View>

    );
};


export default ItemAmbassador;
const styles = StyleSheet.create({
    main: {
        paddingTop: 12,
    },
    dropShadow: {
        padding: 12,
        borderRadius: 8,
        paddingRight: 12,

        borderLeftWidth: 4,
        shadowColor: '#000',
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 2,
        backgroundColor: 'white',
    },
});