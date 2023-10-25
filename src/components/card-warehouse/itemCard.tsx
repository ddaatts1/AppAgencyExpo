import { View } from "react-native";
import { SVG } from "../../constants";
import { StyleSheet } from "react-native";

const ItemCard = ({ color, children }: { color: any, children: any }) => {
    return (
        <View style={styles.main}>
            <View
                style={[styles.dropShadow, { alignItems: "center" }]}>
                {children}
            </View>
        </View>

    );
};


export default ItemCard;
const styles = StyleSheet.create({
    main: {
        width: "50%",
        padding: 6,

    },
    dropShadow: {
        padding: 12,
        borderRadius: 8,
        paddingRight: 12,


        shadowColor: '#000',
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 2,
        backgroundColor: 'white',
    },
});
