import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'

import _ from 'lodash'
import colors from '../utils/colors'
import {
    abbreviateNumber,
    findMaxValue
} from '../utils/calculatorKit'

const WeekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
const WeekValues = [
    { in_active_cal: 2230, workout_cal: 150, },
    { in_active_cal: 3030, workout_cal: 100, },
    { in_active_cal: 2300, workout_cal: 700, },
    { in_active_cal: 2000, workout_cal: 150, },
    { in_active_cal: 1950, workout_cal: 130, },
    { in_active_cal: 3100, workout_cal: 400, },
    { in_active_cal: 2100, workout_cal: 500, },
]

const GRAPH_HEIGHT = 300

const CalendarView = () => {

    const [peekValue, setPeekValue] = useState(1)

    useEffect(() => {
        (async () => {
            const maxValue = await findMaxValue(WeekValues)
            const buffer = maxValue * 0.10
            setPeekValue(maxValue + buffer)
        })()
        return () => { }
    }, [])

    const graphValueSections = [peekValue, peekValue * 0.8, peekValue * 0.6, peekValue * 0.4, peekValue * 0.2]

    const getLineHeight = (_value) => {
        const height = GRAPH_HEIGHT * (_value / peekValue)
        if (_.isNaN(height)) return 1
        else return height
    }

    const renderWeekGraphHorizontalLines = () => {
        return (
            <View style={styles.graphValueLinesContainer}>
                {graphValueSections.map((item, index) => (
                    <View
                        key={`graphValueSections_${index}`}
                        style={styles.horizontalGraphLine}
                    />
                ))}
            </View>
        )
    }

    const renderGraphValues = () => {
        return (
            <View style={styles.graphValuesContainer}>
                {graphValueSections.map((item, index) => (
                    <View key={`graphValueSections${index}`}>
                        <Text>{abbreviateNumber(item)}</Text>
                    </View>
                ))}
            </View>
        )
    }

    const renderWeekGraph = () => {
        return (
            <View style={styles.weekDaysGraphContainer}>
                {WeekValues.map((item, index) => (
                    <Pressable
                        key={`WeekValues${index}`}
                        style={styles.weekGraphLineContainer}
                        onPress={() => {

                        }}>
                        <View
                            style={[styles.weekWorkoutGraphLine, {
                                height: getLineHeight(item.workout_cal)
                            }]}
                        />
                        <View
                            style={[styles.weekInActiveGraphLine, {
                                height: getLineHeight(item.in_active_cal)
                            }]}
                        />
                    </Pressable>
                ))}
            </View>
        )
    }
    const renderWeekDays = () => {
        return (
            <View style={styles.weekDaysHeadingsContainer}>
                {WeekDays.map((item, index) => (
                    <View
                        key={`WeekDays${index}`}
                        style={styles.weekDaysHeadingsItem}>
                        <Text>{item}</Text>
                    </View>
                ))}
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.graphContainer}>
                {renderGraphValues()}
                <View style={{ flex: 1 }}>
                    {renderWeekGraphHorizontalLines()}
                    {renderWeekGraph()}
                </View>
            </View>
            {renderWeekDays()}
        </View>
    )
}

export default CalendarView

const styles = StyleSheet.create({
    container: {
        marginVertical: 30
    },
    weekDaysHeadingsContainer: {
        marginTop: 15,
        marginLeft: 50,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    weekDaysGraphContainer: {
        height: GRAPH_HEIGHT,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    weekDaysHeadingsItem: {
        flex: 1,
        alignItems: 'center'
    },
    graphValueLinesContainer: {
        ...StyleSheet.absoluteFill,
        width: '100%',
        justifyContent: 'space-around'
    },
    horizontalGraphLine: {
        width: '100%',
        height: 1,
        backgroundColor: colors.silver
    },
    graphValuesContainer: {
        width: 50,
        justifyContent: 'space-around'
    },
    graphContainer: {
        flexDirection: 'row',
    },
    weekGraphLineContainer: {
        flex: 1,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    weekInActiveGraphLine: {
        width: 18,
        backgroundColor: colors.orangish,
        borderTopColor: colors.white,
        borderTopWidth: 1.25,
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    weekWorkoutGraphLine: {
        width: 18,
        backgroundColor: colors.primaryColor,
        borderBottomColor: colors.white,
        borderBottomWidth: 1.25,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 4,
        borderBottomRightRadius: 4,
    }
})