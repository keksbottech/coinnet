import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import PageHeader from '@/components/page header/PageHeader'
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { Separator, Switch } from 'tamagui';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import EvilIcons from '@expo/vector-icons/EvilIcons';

const Settings = () => {
  return (
    <View>
     <PageHeader label='Settings'/>
     {/* <AntDesign name="search1" size={24} color="black" /> */}


     <View>
        <View>
            <View>
                <Image source={require('@/assets/images/logo/logo.png')}/>

                <View>
                    <Text>Dmutro</Text>
                    <Text>to**@**.com</Text>
                </View>
            </View>
            <Text>ID 283949383</Text>
        </View>

        <View>
        <AntDesign name="checkcircleo" size={24} color="black" />
        <Text>Verified</Text>
        </View>
     </View>


     <View>
        <View>
            <Text>Privacy</Text>
            <View>
                <View>
            <FontAwesome5 name="user-circle" size={24} color="black" />
                <Text>Profile</Text>
            </View>
                <FontAwesome name="angle-right" size={24} color="black" />
            </View>
            
            <Separator/>

            <View>
                <View>
            <Ionicons name="shield-checkmark-outline" size={24} color="black" />
                <Text>Security</Text>
            </View>
                <FontAwesome name="angle-right" size={24} color="black" />
            </View>
        </View>

        <View>
            <Text>Finance</Text>
            <View>
                <View>
            <Ionicons name="newspaper-outline" size={24} color="black" />
                <Text>History</Text>
            </View>
                <FontAwesome name="angle-right" size={24} color="black" />
            </View>
            
            <Separator/>

            <View>
                <View>
            <Feather name="pie-chart" size={24} color="black" />
                <Text>Limit and features</Text>
            </View>
                <FontAwesome name="angle-right" size={24} color="black" />
            </View>
        </View>

        <View>
            <Text>Account</Text>
            <View>
                <View>
            <Feather name="image" size={24} color="black" />
                <Text>Theme</Text>
                </View>
                <View>
<Text>Dark mode</Text>
<Switch/>
                </View>
            
            </View>
            
            <Separator/>

            <View>
                <View>
            <EvilIcons name="bell" size={24} color="black" />
                <Text>Notifications</Text>
                </View>
                <FontAwesome name="angle-right" size={24} color="black" />
            </View>
        </View>

        <View>
            <Text>More</Text>
            <View>
                <View>
            <FontAwesome name="language" size={24} color="black" />
                <Text>Change Language</Text>
            </View>
                <FontAwesome name="angle-right" size={24} color="black" />
            </View>
            
            <Separator/>

            <View>
                <View>
            <AntDesign name="adduser" size={24} color="black" />
                <Text>Share with friends</Text>
            </View>
                <FontAwesome name="angle-right" size={24} color="black" />
            </View>

            <Separator/>

<View>
    <View>
<AntDesign name="questioncircleo" size={24} color="black" />
    <Text>Support</Text>
</View>
    <FontAwesome name="angle-right" size={24} color="black" />
</View>
        </View>
     </View>
    </View>
  )
}

export default Settings

const styles = StyleSheet.create({})