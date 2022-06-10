import React from 'react'
import {
    ActivityIndicator,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native'
import colors from '../utils/colors'

const CalorieCard = (props) => {

    const {
        isLoading,
        cardImage = null,
        cardTitle = "",
        cardDescription = "",
        onPress = () => { }
    } = props

    return (
        <TouchableOpacity
            activeOpacity={0.5}
            style={styles.container}
            onPress={onPress}>
            <Image
                style={styles.cardImage}
                source={cardImage}
            />
            <View style={styles.cardDetailsContainer}>
                <Text style={styles.cardTitle}>{cardTitle}</Text>
                <Text style={styles.cardDescription}>{cardDescription}</Text>
            </View>
            {isLoading &&
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size={"small"} color={colors.primaryColor} />
                </View>
            }
        </TouchableOpacity>
    )
}

export default CalorieCard

const styles = StyleSheet.create({
    container: {
        marginTop: 16,
        padding: 20,
        width: '100%',
        borderWidth: 1,
        borderRadius: 4,
        borderColor: colors.silver,
        flexDirection: 'row'
    },
    cardImage: {
        width: 40,
        height: 40
    },
    cardDetailsContainer: {
        marginLeft: 20
    },
    cardTitle: {
        color: colors.slateGrey,
        fontSize: 13
    },
    cardDescription: {
        color: colors.darkGrey,
        fontSize: 18,
        fontWeight: '400',
    },
    loadingContainer: {
        ...StyleSheet.absoluteFill,
        alignItems: 'center',
        justifyContent: 'center'
    }
})