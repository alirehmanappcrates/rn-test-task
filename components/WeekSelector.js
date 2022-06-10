import React from 'react'
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';

import colors from '../utils/colors'

const WeekSelector = (props) => {
    const {
        onChangeWeek = () => { }
    } = props

    return (
        <View style={styles.container}>
            <TouchableOpacity
                activeOpacity={0.5}
                style={styles.weekSelectorArrowButton}
                onPress={onChangeWeek}>
                <AntDesign
                    name="caretleft"
                    size={10}
                    color={colors.silverTwo}
                />
            </TouchableOpacity>
            <View style={styles.selectedWeekTitleContainer}>
                <Text style={styles.selectedWeekTitle}>{"Last Week"}</Text>
                <Feather
                    name="chevron-down"
                    size={23}
                    color={colors.silverTwo}
                />
            </View>
            <TouchableOpacity
                activeOpacity={0.5}
                style={styles.weekSelectorArrowButton}
                onPress={onChangeWeek}>
                <AntDesign
                    name="caretright"
                    size={10}
                    color={colors.silverTwo}
                />
            </TouchableOpacity>
        </View>
    )
}

export default WeekSelector

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 44,
        flexDirection: 'row',
        borderWidth: 1,
        borderRadius: 4,
        borderColor: colors.silver
    },
    weekSelectorArrowButton: {
        width: 40,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectedWeekTitleContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderColor: colors.silver,
        flexDirection: 'row'
    },
    selectedWeekTitle: {
        fontSize: 14,
        color: colors.charcoalGrey,
        fontWeight: '400'
    }
})