import { View } from "react-native";
import { SVG } from "../../constants";
import { StyleSheet } from "react-native";

const BottonNavigation = ({ children }: { children: any }) => {
    return (
        <View style={styles.main}>
            <View
                style={[
                    { borderWidth: 0 },
                    styles.dropShadow,
                ]}>

                {children}
            </View>
        </View>

    );
};


export default BottonNavigation;
const styles = StyleSheet.create({
    main: {

        paddingTop: 12,
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