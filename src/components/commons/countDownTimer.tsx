import {
  } from 'react-native';
import React from 'react';
import { View } from 'react-native';

import CountDown from 'react-native-countdown-component';


function CountDownTimer() {
    return (
            <View>
                <CountDown
                    until={60 * 10 + 30}
                    timeToShow={['H', 'M', 'S']}
                    size={12}
                    digitStyle={{
                        backgroundColor: '#FF4F4F',
                        // borderWidth: 2,
                    }}
                    digitTxtStyle= {{
                        color: '#fff',
                    }}
                    timeLabels={{h: '', m: '', s: ''}}
                />
            </View>
    );
}

export default CountDownTimer;
