import React, {useEffect, useRef} from 'react';
import {Animated} from 'react-native';
import {ArrowIcon} from '../icons/ArrowIcon';

type Props = {
  pressed: boolean;
};

export const AnimatedIcon: React.FC<Props> = ({pressed}) => {
  const rotateAnimation = useRef(new Animated.Value(0)).current;
  const interpolateRotatingOpen = rotateAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });
  const animatedStyle = {
    width: 18,
    height: 18,
    transform: [
      {
        rotate: interpolateRotatingOpen,
      },
    ],
  };

  useEffect(() => {
    if (!pressed) {
      Animated.timing(rotateAnimation, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(rotateAnimation, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }).start();
    }
  }, [pressed, rotateAnimation]);

  return (
    <Animated.View style={animatedStyle}>
      <ArrowIcon />
    </Animated.View>
  );
};
