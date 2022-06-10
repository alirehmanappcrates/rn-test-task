import React, { useState } from 'react'

import {
  StyleSheet,
  Text,
  View,
  Alert,
} from 'react-native'

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

const App = () => {

  const [isGetRequestLoading, setIsGetReguestLoading] = useState(false)
  const [isPostRequestLoading, setIsPostReguestLoading] = useState(false)

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

  return (
    <View style={styles.container}>
      <Header headerTitle={"Calories Burned"} />
      <View style={styles.contentContainer}>
        <WeekSelector
          onChangeWeek={() => {

          }}
        />
        <CalendarView />
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