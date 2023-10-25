import React from 'react';
import { Animated, Modal, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SVG } from '../../constants';

const ModalPoupFshop = ({ visible, children, closeIcon }: any) => {
    const [showModal, setShowModal] = React.useState(visible);
    const [isCloseIcon, setIsCloseIcon] = React.useState(closeIcon == true ? closeIcon : false);
    const scaleValue = React.useRef(new Animated.Value(0)).current;
    React.useEffect(() => {
        toggleModal();
    }, [visible]);
    const toggleModal = () => {
        if (visible) {
            setShowModal(true);
            Animated.spring(scaleValue, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }).start();
        } else {
            setTimeout(() => setShowModal(false), 200);
            Animated.timing(scaleValue, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }).start();
        }
    };
    return (
        <Modal transparent visible={showModal}>
            <View style={styles.modalBackGround}>
                <Animated.View
                    style={[styleModal(isCloseIcon).modalContainer, { transform: [{ scale: scaleValue }] }]}>
                    {children}
                </Animated.View>
            </View>

        </Modal>
    );
};
export default ModalPoupFshop;
const styles = StyleSheet.create({

    modalBackGround: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        // justifyContent: 'center',
        // alignItems: 'center',
        position: 'absolute',
        bottom: 0,
    },


});

const styleModal = (isCloseIcon: boolean) => StyleSheet.create({
    modalContainer: {
        width: '100%',
        // height: 470,
        backgroundColor: 'white',
        paddingHorizontal: isCloseIcon ? 10 : 20,
        paddingVertical: isCloseIcon ? 10 : 30,
        paddingBottom: isCloseIcon ? 20 : 0,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        elevation: 20,
    },
});
