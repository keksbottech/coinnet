import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import CheckCompleteImage from '@/assets/svg/complete.svg'


const TransactionComplete = ({title, leftLabel, rightLabel, leftPrice,rightPrice}) => {

  return (
    <View style={styles.container}>
        <CheckCompleteImage />
        
      <Text className='text-center text-4xl' style={styles.label}>Exchange Successful</Text>
      <Text className='text-cener' style={styles.label}>You have successfully initiated the transaction. Amount will reflect in wallet within 1 hour</Text>

      <View style={styles.section}>
        <View>
            <Text>Bitcoin BTC</Text>
            <Text style={styles.text}>0.0401030</Text>
        </View>

<View style={styles.icon}>
<AntDesign name="arrowright" size={24} color="black" />
</View>

<View>
            <Text>Ethereum ETH</Text>
            <Text style={styles.text}>0.0401030</Text>
        </View>
        
      </View>
    </View>
  )
}

export default TransactionComplete

const styles = StyleSheet.create({
  container:{
    alignItems:'center',
    justifyContent:'center',
    width:'100%'
  },
  section:{
flexDirection:'row',
justifyContent:'space-between',
marginTop:40,
width:'100%'
  },
  label:{
    fontFamily:'MonsterBold',
    textAlign:'center',
  marginVertical:5
  },
  icon:{
    borderColor:'black',
    borderWidth:.5,
    padding:5,
    borderRadius:5
  },
  text:{
    fontFamily:'MonsterBold',
    
  }
})