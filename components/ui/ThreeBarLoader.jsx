import React, { useRef, useEffect } from "react";
import { Animated, View, StyleSheet } from "react-native";

const ThreeBarLoader = ({ color = "#999" }) => {
  const scaleY1 = useRef(new Animated.Value(1)).current;
  const scaleY2 = useRef(new Animated.Value(1)).current;
  const scaleY3 = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const createAnimation = (animatedValue, delays) => {
      return Animated.loop(
        Animated.sequence([
          Animated.delay(delays[0]),
          Animated.timing(animatedValue, {
            toValue: 0.4,
            duration: 150,
            useNativeDriver: true,
          }),
          Animated.timing(animatedValue, {
            toValue: 1.6,
            duration: 150,
            useNativeDriver: true,
          }),
          Animated.timing(animatedValue, {
            toValue: 1,
            duration: 150,
            useNativeDriver: true,
          }),
        ])
      );
    };

    createAnimation(scaleY1, [0]).start();
    createAnimation(scaleY2, [100]).start();
    createAnimation(scaleY3, [200]).start();
  }, [scaleY1, scaleY2, scaleY3]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.bar, { backgroundColor: color, transform: [{ scaleY: scaleY1 }] }]} />
      <Animated.View style={[styles.bar, { backgroundColor: color, transform: [{ scaleY: scaleY2 }] }]} />
      <Animated.View style={[styles.bar, { backgroundColor: color, transform: [{ scaleY: scaleY3 }] }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 30,
    height: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  bar: {
    width: 5,
    height: 20,
    borderRadius: 2,
  },
});

export default ThreeBarLoader;
