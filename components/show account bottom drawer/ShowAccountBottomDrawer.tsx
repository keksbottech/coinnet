import { StyleSheet, Switch, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { FontAwesome, MaterialIcons } from '@expo/vector-icons'
import BottomDrawer from '@/components/bottom drawer/BottomDrawer';
import ApplePay from '@/assets/svg/applepay.svg'
import PayPal from '@/assets/svg/paypal.svg'
import MonoBank from '@/assets/svg/mastercard.svg'
import VisaCard from '@/assets/svg/visa.svg'
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { getPaymentMethod } from '@/lib/store/reducers/storePaymentUrl';
import { ThemedText } from '../ThemedText';
import { getToggleData } from '@/lib/store/reducers/storeToggleState';
import { useAppSelector } from '@/hooks/useAppSelector';


const ShowAccountBottomDrawer = () => {
     const dispatch = useAppDispatch()
     const selectedCurrency = useAppSelector(state => state.selectedCurrency.selectedCurrency)
     const toggleBalanceShown = useAppSelector(state => state.toggle.toggleBalanceShown)
     const [isBalanceVisible, setIsBalanceVisible] = useState(toggleBalanceShown);
     const userData = useAppSelector(state => state.user.user)

     useEffect(() => {
      dispatch(getToggleData(isBalanceVisible))
     }, [isBalanceVisible])

    const toggleSwitch = () => setIsBalanceVisible(!isBalanceVisible)
    
  return (

<BottomDrawer

    ui={
        <View style={styles.container}>
        {/* Account Information Section */}
        <ThemedText style={styles.header}>Accounts</ThemedText>
        <View style={styles.accountContainer}>
          {/* Circular initials */}
          <View style={styles.circle}>
            <Text style={styles.initials}> {`${userData?.firstName.split('').shift()}${userData?.lastName.split('').shift()}`} </Text>
          </View>
  
          {/* Account details */}
          <View style={styles.accountDetails}>
            <Text style={styles.accountName}>
              {`${userData?.firstName} ${userData?.lastName}`} <Text style={styles.accountType}>(Main)</Text>
            </Text>
            <Text style={styles.balance}>₦{isBalanceVisible ? '***' : parseFloat(selectedCurrency?.balance).toFixed()}</Text>
          </View>
  
          {/* Icon */}
          <FontAwesome name="circle" size={24} color="#00C0FF" />
        </View>
  
        {/* Toggle Switch Section */}
        <View style={styles.toggleContainer}>
          <Text style={styles.toggleLabel}>Show account balance</Text>
          <Switch
            trackColor={{ false: '#767577', true: '#00C0FF' }}
            thumbColor={isBalanceVisible ? '#f4f3f4' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isBalanceVisible}
          />
        </View>
      </View>
    }
    />
  )
}

export default ShowAccountBottomDrawer



const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
      },
      header: {
    
        fontSize: 24,
        
        fontFamily:'MonsterBold',
        marginBottom: 20,
      },
      accountContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#eee',
        borderRadius: 10,
        padding: 15,
        marginBottom: 20,
      },
      circle: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#ccc',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
      },
      initials: {
    
        fontSize: 18,
        fontFamily:'MonsterBold'
      },
      accountDetails: {
        flex: 1,
        
        fontFamily:'MonsterReg'
      },
      accountName: {
    
        fontSize: 18,
      
        fontFamily:'MonsterBold'
      },
      accountType: {
        color: '#808080',
        fontSize: 14,
      },
      balance: {
    
        fontSize: 16,
        fontFamily:'MonsterReg'
      },
      toggleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#eee',
        borderRadius: 10,
        padding: 15,
      },
      toggleLabel: {
    
        fontSize: 16,
        
        fontFamily:'MonsterReg'
      },
  });