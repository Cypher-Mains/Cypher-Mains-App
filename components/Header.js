import React from "react";
import {
    HeaderView,
    HeaderTitle
} from "../styles/appStyles";

import { Image, StyleSheet } from "react-native";

export default function Header() {
    return (
        <HeaderView>
            <HeaderTitle>CYPHER MAINS</HeaderTitle>
            <Image source={require('../assets/dots.png')} style = {styles.threeDots} />
        </HeaderView>
    )
}

const styles = StyleSheet.create({
    threeDots: {
        position: 'absolute',
        right: 0,
        width: 30, height: 30 
    },
});