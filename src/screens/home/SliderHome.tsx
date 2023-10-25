import { StyleSheet, View, Image, Dimensions, Animated } from 'react-native';
import React, {useRef, useState} from 'react';
import useInterval from '../../constants/useInterval';

const images = [
    {
        id: '1',
        image: require('../../assets/image/BannerHome.png'),
    },
    {
        id: '2',
        image: require('../../assets/image/BannerHome.png'),
    },
    {
        id: '3',
        image: require('../../assets/image/BannerHome.png'),
    },
    {
        id: '4',
        image: require('../../assets/image/BannerHome.png'),
    },
    {
        id: '5',
        image: require('../../assets/image/BannerHome.png'),
    },
    {
        id: '6',
        image: require('../../assets/image/BannerHome.png'),
    },
];

const MAX_WIDTH = Dimensions.get('window').width;
// function inifiniteScroll(imageList: any) {
//     const numberOfData = imageList.length
//     let scrollValue = 0, scrolled = 0
//     setInterval(function() {
//         scrolled++
//         if(scrolled < numberOfData)
//             scrolled = scrollValue + WIDTH
//         else {
//             scrollValue = 0
//             scrolled = 0
//         }
//         this.
//     }, 3000)
// }

const Slider = () => {
    const animation = useRef(new Animated.Value(0));
    const [currentImage, setCurrentImage] = useState(0);
    useInterval(() => handleAnimation(), 3000);
    // const flatlistRef = React.createRef<any>();
    // const onchange = (nativeEvent: any) => {
    //     if (nativeEvent) {
    //         const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
    //         if (slide !== imgActive) {
    //             setImgActive(slide);
    //         }
    //     }
    // };
    const handleAnimation = () => {
        let newCurrentImage = currentImage + 1;

        if (newCurrentImage === images.length) {
            newCurrentImage = 0;
        }

        Animated.spring(animation.current, {
            toValue: -(MAX_WIDTH * newCurrentImage),
            useNativeDriver: true,
        }).start();

        setCurrentImage(newCurrentImage);
    };

    // useEffect(() => {
    //     setInterval(() => {
    //         if (imgActive === images.length - 1) {
    //             flatlistRef.current.scrollTo({
    //                 index: 0,
    //                 animation: true,
    //             });
    //         } else {
    //             flatlistRef.current.scrollTo({
    //                 index: imgActive + 1,
    //                 animation: true,
    //         });
    //         }
    //     }, 2000);
    // });
    // const handleScroll = (event: any) => {
    //     const scrollPosition = event.nativeEvent.contentOffset.x;
    //     console.log({scrollPosition});
    //     const index = scrollPosition / WIDTH;
    //     setImgActive(index);
    // };
    // const renderDotIndicators = () => {
    //     return (
    //         images.map((e, index) => {
    //             if (imgActive === index) {
    //                 return (
    //                     <View style={{
    //                         backgroundColor: '#0288D1',
    //                         height: 10,
    //                         width: 10,
    //                         borderRadius: 5,
    //                         marginHorizontal: 6,
    //                     }} />
    //                 );
    //             } else {
    //                 return (
    //                     <View style={{
    //                         backgroundColor: '#fff',
    //                         height: 10,
    //                         width: 10,
    //                         borderRadius: 5,
    //                         marginHorizontal: 6,
    //                     }} />
    //                 );
    //             }
    //         }
    //         )
    //     );
    // };

    return (
        <React.Fragment>
            <View>
                <Animated.View style={[styles.container, {
                    transform: [ {translateX: animation.current} ],
                }]}>
                {
                    images.map((image) => (
                        <Image
                            key={image.id}
                            style={styles.image}
                            source={image.image}
                        />
                    ))
                }
                </Animated.View>
                <View style={styles.indicatorContainer}>
                    {images.map((image, index) =>
                    <View key={`${image}_${index}`} style={[styles.indicator, index === currentImage ? styles.activeIndicator : undefined]}/>)}
                </View>
            </View>
        </React.Fragment>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    image : {
        resizeMode: 'cover',
        width: Dimensions.get('window').width,
        height: 200,
    },
    indicatorContainer: {
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: MAX_WIDTH,
        bottom: 5,
        zIndex: 2,
    },
    indicator: {
        width: 8,
        height: 8,
        borderRadius: 3,
        backgroundColor: '#fff',
        borderColor: '#fff',
        borderWidth: 1,
        marginHorizontal: 4,
        marginBottom: 10,
    },
    activeIndicator: {
        backgroundColor: '#0288D1',
        borderColor: '#0288D1',
    },
});

export default Slider;
