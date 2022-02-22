import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Animated } from "react-native";

const Progress = ({ step, steps, height }) => {
  const animatedValue = React.useRef(new Animated.Value(-1000)).current;
  const reactive = React.useRef(new Animated.Value(-1000)).current;
  const [width, setWidth] = React.useState(0);

  React.useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: reactive,
      duration: 300,
      useNativeDriven: true,
    }).start();
  }, []);

  React.useEffect(() => {
    reactive.setValue(-width + (width * step) / steps);
  }, [step, width]);

  return (
    <View
      onLayout={(e) => {
        const newWidth = e.nativeEvent.layout.width;
        setWidth(newWidth);
      }}
      style={{
        height,
        backgroundColor: "#F0FFC2",
        borderRadius: height,
        overflow: "hidden",
      }}
    >
      <Animated.View

        style={{
          height,
          width: "100%",
          backgroundColor: "black",
          borderRadius: height,
          position: "absolute",
          left: 0,
          top: 0,
          transform: [
            {
              translateX: animatedValue,
            },
          ],
        }}
      />
    </View>
  );
};

export default function Loading() {

    const [index, setIndex] = React.useState(0);

    React.useEffect(() => {
        const interval = setInterval(() => {
            setIndex((index +1 ) % (30+1));
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, [index])

  return (
    <View style={styles.container}>
      <Progress step={index} steps={30} height={12} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
      marginTop: 15,
    backgroundColor: "#fff",
    justifyContent: "center",
    borderRadius: 20
  },
});
