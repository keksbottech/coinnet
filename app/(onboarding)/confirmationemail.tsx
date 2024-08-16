import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import PageHeader from '@/components/page header/PageHeader'
import Button from '@/components/ui/button/Button'
import NumberStepProgress from '@/components/number step progress/NumberStepProgress'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import EmailImage from '@/assets/svg/mail.svg'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'

const ConfirmationEmail = () => {
  const router = useRouter()

  const navigateToPasswordReset2 = () => {
    router.push('/(onboarding)/passwordreset2')
  }


  return (
    <SafeAreaView style={{flex:1, padding:10, backgroundColor:'white'}}>
        <PageHeader icon={<FontAwesome name="angle-left" size={24} color="black" />} label={<NumberStepProgress currentStep={1}/>}/>
  
  
    <View className='h-full pt-20'>

        <View>
            <View>
               <EmailImage/>
            </View>

<View className='w-full flex flex-col items-center'>
            <Text style={styles.title} className=' text-center text-4xl '>Confirm your email</Text>
            <Text style={[{marginTop:10, width:230}, styles.text]} className='text-center  text-lg' >We just sent you an email to tomisjkls199@gmail.com</Text>
        </View>
        </View>
<View>

   
</View>
<Button onClick={navigateToPasswordReset2} styles={{bottom:150}} label='Continue'/>
<View style={{position:'absolute', bottom:100,alignItems:'center', justifyContent:'center', flexDirection:'row', width:'100%'}}>
        <Text style={styles.title}  className=' text-lg' >I </Text> 
        <Text style={styles.title}  className=' text-yellow-500 text-lg' >didn't receive </Text> 
        <Text style={styles.title} className=' text-lg' >my email</Text>
        </View>
    </View>
    
  </SafeAreaView>
  )
}

export default ConfirmationEmail

const styles = StyleSheet.create({
  title:{
    fontFamily:'MonsterBold'
  },
  text:{
    fontFamily:'MonsterReg'
  }
})