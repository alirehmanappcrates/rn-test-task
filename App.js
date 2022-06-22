import React, { useState, useEffect } from 'react'

import {
  StyleSheet,
  Text,
  View,
  Alert,
} from 'react-native'

import AppleHealthKit, {
  HealthValue,
  HealthKitPermissions,
} from 'react-native-health'

import {
  InActive,
  Workout
} from './images'
import {
  CalendarView,
  CalorieCard,
  Header,
  WeekSelector
} from './components'

import {
  testPostmanGetAPI,
  testPostmanPostAPI
} from './services'

const permissions = {
  permissions: {
    read: [AppleHealthKit.Constants.Permissions.ActiveEnergyBurned],
    write: [AppleHealthKit.Constants.Permissions.Steps],
  },
}


const App = () => {

  const [isGetRequestLoading, setIsGetReguestLoading] = useState(false)
  const [isPostRequestLoading, setIsPostReguestLoading] = useState(false)
  const [activeEnergy, setActiveEnergy] = useState([])

  useEffect(() => {
    getHeartRateSampels()
  }, [])

  const callTestPostmanGetAPI = async () => {
    try {
      setIsGetReguestLoading(true)
      const response = await testPostmanGetAPI()
      console.log("callTestPostmanGetAPI-response", response)
      Alert.alert(`API Response Message`, response.message)
    } catch (error) {
      console.log("callTestPostmanGetAPI-error", error);
    } finally {
      setIsGetReguestLoading(false)
    }
  }

  const callTestPostmanPostAPI = async () => {
    try {
      setIsPostReguestLoading(true)
      const response = await testPostmanPostAPI({ tester: "testing the app" })
      console.log("callTestPostmanGetAPI-response", response)
      Alert.alert(`API Response Message`, `${response.message}\n ${JSON.stringify(response.data)}`,)
    } catch (error) {
      console.log("callTestPostmanGetAPI-error", error);
    } finally {
      setIsPostReguestLoading(false)
    }
  }

  const getHeartRateSampels = () => {
    AppleHealthKit.initHealthKit(permissions, (error) => {
      /* Called after we receive a response from the system */

      if (error) {
        console.log('[ERROR] Cannot grant permissions!')
      }

      /* Can now read or write to HealthKit */

      const options = {
        startDate: new Date(2021, 0, 0).toISOString(), // required
        endDate: new Date().toISOString(), // optional; default now
      }

      AppleHealthKit.getActiveEnergyBurned(
        options,
        (callbackError, results) => {
          // console.log("getHeartRateSamples-results", results, callbackError)
          if (callbackError === null) {
            setActiveEnergy(results)
          }
        },
      )
    })
  }

  return (
    <View style={styles.container}>
      <Header headerTitle={"Calories Burned"} />
      <View style={styles.contentContainer}>
        <WeekSelector
          onChangeWeek={() => {
            getHeartRateSampels()
          }}
        />
        <CalendarView data={activeEnergy} />
        <CalorieCard
          isLoading={isGetRequestLoading}
          cardImage={InActive}
          cardTitle={"In-Active Calories Burned"}
          cardDescription={
            <Text>
              {"1,793"}
              <Text style={{ fontSize: 14 }}>
                {" BPM"}
              </Text>
            </Text>
          }
          onPress={callTestPostmanGetAPI}
        />
        <CalorieCard
          isLoading={isPostRequestLoading}
          cardImage={Workout}
          cardTitle={"Workout Calories Burned"}
          cardDescription={"587"}
          onPress={callTestPostmanPostAPI}
        />
      </View>
    </View>
  )
}

export default App

const styles = StyleSheet.create({
  container: { flex: 1 },
  contentContainer: {
    flex: 1,
    padding: 20
  }
})