import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import PageHeader from '@/components/page header/PageHeader'
import { Switch } from 'tamagui'

const NotificationSettings = () => {
  return (
    <View>
        <PageHeader label='Notification Settings'/>

        <View>
            <Text>Push notification</Text>

            <View>
                <View>
                    <Text>
                        Take a break
                    </Text>
                    <Text>
                        Pause notifications for a short time
                    </Text>
                </View>

                <Switch/>
            </View>

            <View>
                <Text>Customize notifications</Text>
                <Text>Choose the messages you'd like to receive </Text>
            </View>

            <View>
                <Text>General Notification</Text>
                <Switch/>
            </View>

            <View>
                <Text>Sound</Text>
                <Switch/>
            </View>

            <View>
                <Text>Vibrate</Text>
                <Switch/>
            </View>
            <View>
                <Text>App Updates</Text>
                <Switch/>
            </View>

            <View>
                <Text>New Services Available</Text>
                <Switch/>
            </View>

            <View>
                <Text>New Tips Available</Text>
                <Switch/>
            </View>
        </View>
      <Text>NotificationSettings</Text>
    </View>
  )
}

export default NotificationSettings

const styles = StyleSheet.create({})