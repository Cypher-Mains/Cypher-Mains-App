import React, { useEffect, useState, useRef } from "react";

import { Text, View, TouchableOpacity, StyleSheet, Animated } from "react-native";
import {
    BodyView,
    BodyTitle,
    BodyBox,
    BodySeconds,
    FlexRow
} from "../styles/appStyles";

import Constants from 'expo-constants';

import { ScrollView } from "react-native";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import QRScanner from './QRScanner'

const Stack = createNativeStackNavigator();


export default function AuthenticateBTN() {

    let counter = useRef(new Animated.Value(0)).current;
    const countInterval = useRef(null);
    const [count, setCount] = useState(0);

    useEffect(() => {
        countInterval.current = setInterval(() => setCount((old) => old + 5), 5000);
        return () => {
            clearInterval(countInterval);
        };
    }, []);

    useEffect(() => {
        load(count)
        if (count >= 100) {
            setCount(100);
            clearInterval(countInterval);
        }
    }, [count]);

    const load = (count) => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(counter, {
                    toValue: count,
                    duration: 5000,
                    useNativeDriver: false,
                })
            ]),
            {
              iterations: 4
            }
          ).start()
    };

    let width = counter.interpolate({
        inputRange: [0, 5],
        outputRange: ["0%", "100%"],
        extrapolate: "clamp",
    })
    

    function QRCodeScanner() {
        return (
            <QRScanner />
        )
    }

    function calcOTP() {
        let otp = Math.floor(Math.random() * 1000000) + 1;
        return otp;
    }

    function generateOTP() {
        let codes = [
            {
                otp: calcOTP(),
                org: "Github"
            },
            {
                otp: calcOTP(),
                org: "Heroku"
            },
            {
                otp: calcOTP(),
                org: "Yahoo"
            },
            {
                otp: calcOTP(),
                org: "Yahoo"
            },
            {
                otp: calcOTP(),
                org: "Yahoo"
            },
            {
                otp: calcOTP(),
                org: "Yahoo"
            },

        ];

        return codes
    }
    
    function Home({ navigation }) {
        return (
            <>
                <ScrollView>
                    <View style={styles.btnContainer}>
                        <BodyView>
                            {generateOTP().map((element, index) => {
                                return (
                                    <BodyBox key={index}>
                                        <FlexRow>
                                            <BodyTitle key={element.org}>{element.org}</BodyTitle>
                                            <BodyTitle key={element.otp}>{element.otp}</BodyTitle>
                                        </FlexRow>


                                        <View style={styles.progressBar}>
                                            {<Animated.View
                                                style={
                                                    ([StyleSheet.absoluteFill],
                                                        { backgroundColor: 'black',  width })
                                                }></Animated.View>}
                                        </View>



                                    </BodyBox>
                                )
                            })}
                        </BodyView>
                    </View>
                </ScrollView>

                <TouchableOpacity
                    style={styles.authenticateButton}
                    onPress={() => navigation.navigate('Scan the QR Code')}
                >
                    <Text style={styles.authenticateButtonText}>AUTHENTICATE</Text>
                </TouchableOpacity>

            </>
        )
    }

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="CYPHER MAINS" screenOptions={{       //header styling
                headerTitle: 'black',
                headerTitleStyle: { fontWeight: 'bold', fontFamily: 'Roboto' },
                headerStyle: { backgroundColor: '#bffff0' },
                headerTitleAlign: 'center'
            }}>
                <Stack.Screen name="CYPHER MAINS" component={Home} />
                <Stack.Screen name="Scan the QR Code" component={QRCodeScanner} />
            </Stack.Navigator>
        </NavigationContainer>

    )
}

const styles = StyleSheet.create({
    viewcontainer: {

    },
    btnContainer: {
        backgroundColor: '#bffff0'
    },
    authenticateButton: {
        position: 'absolute',
        alignSelf: 'center',
        backgroundColor: 'black',
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom: 10,
        paddingTop: 10,
        width: 180,
        borderRadius: 10,
        bottom: 10
    },
    authenticateButtonText: {
        color: 'rgba(191, 255, 240, 1)',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: "700",
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#ecf0f1',
        padding: 8,
    },
    progressBar: {
        height: 20,
        flexDirection: 'row',
        width: '100%',
        backgroundColor: 'white',
        borderColor: '#000',
        borderWidth: 2,
        borderRadius: 5,
    },
});
