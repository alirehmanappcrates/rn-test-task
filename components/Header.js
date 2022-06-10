import React from 'react'
import { StyleSheet, Text, View, StatusBar } from 'react-native'

import { StatusBarHeight } from '../utils/Dimensions'
import colors from '../utils/colors'

const Header = (props) => {
    const {
        headerTitle = ""
    } = props
    return (
        <View style={styles.headerContainer}>
            <StatusBar barStyle={"light-content"} />
            <Text style={styles.headerText}>{headerTitle}</Text>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    headerContainer: {
        height: 55 + StatusBarHeight,
        paddingBottom: 20,
        backgroundColor: colors.primaryColor,
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    headerText: {
        fontSize: 17,
        color: colors.white,
        fontWeight: '600'
    }
})