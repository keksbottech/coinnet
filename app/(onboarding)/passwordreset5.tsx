import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import PageHeader from '@/components/page header/PageHeader'
import { Input } from '@rneui/themed'
import { Switch } from '@rneui/themed';
import Button from '@/components/ui/button/Button';
import ContinueWithOauth from '@/components/continue with oauth/ContinueWithOauth';

const PasswordReset5 = () => {
  return (
    <View>
 
 <PageHeader/>
 <View>
    <Text>Create a password</Text>
    <Text>The password must be 8 characters, including 1 uppercase letter, 1 number and 1 special character.</Text>
 </View>

 <View>
    <View>

    <Input/>
    
    </View>

    <View>
   <Text>Confirm Password</Text>
    <Input/>
    
    </View>

<View>
    <Text>Unlock with Touch ID?</Text>
    <Switch
    //   value={checked}
    //   onValueChange={(value) => setChecked(value)}
    />
</View>
  
  <Button label='Continue'/>
 </View>

 <Text>By registering you accept our Terms & Conditions and Privacy Policy. Your data will be security encrypted with TLS</Text>

 <ContinueWithOauth/>
    </View>
  )
}

export default PasswordReset5

const styles = StyleSheet.create({})