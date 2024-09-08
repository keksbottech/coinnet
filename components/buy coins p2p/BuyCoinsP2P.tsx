import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Link, useRouter } from 'expo-router';
import FormatDate from '../format date/FormatDate';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { getOrderSellerIdData, getSelectedOrderData } from '@/lib/store/reducers/storeOrders';
import { ThemedText } from '../ThemedText';
import { useAppSelector } from '@/hooks/useAppSelector';

const Card = ({fullname, time, sellersRate,sellerId, quantity, limits, coin, offerId}:any) => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const theme = useAppSelector(state => state.theme.theme)

  const navigateToSellCoin = () => {
    router.push(`/(trade)/chats/${sellerId}`,)
  }
  const navigateToP2pNegotiate = () => {
    dispatch(getOrderSellerIdData(sellerId))
    dispatch(getSelectedOrderData({fullname, time, sellersRate, sellerId, limits, coin, offerId}))
    router.push(`/(trade)/buytradingform`,)
  }



  console.log(limits)
  return (
    <View style={[styles.container, {backgroundColor:theme ? 'rgba(255,255,255,.1)': 'white'}]}>
      <View>
      <View style={styles.row}>
        <View style={styles.iconWrapper}>
          <ThemedText style={styles.iconText}>{String(fullname).split('')[0]}</ThemedText>
        </View>
        <View style={{marginLeft:8}}>
          <View style={{flexDirection:'row',alignItems:'center'}}>
        <ThemedText style={styles.nameText}>{fullname}</ThemedText>
  
        <AntDesign style={{marginLeft:5}}  name="checkcircle" size={15} color="green" />
      </View>
        <FormatDate date={time}/>
        </View>
      </View>
      <ThemedText style={styles.amountText}>${sellersRate}</ThemedText>
      <ThemedText style={styles.quantityText}>Quantity: {quantity} {coin}</ThemedText>
      
      <ThemedText style={styles.limitsText}>Limits: {limits}</ThemedText>
      </View>
      <TouchableOpacity onPress={navigateToP2pNegotiate} style={styles.dayButton}>
      <ThemedText style={styles.buyButtonText}>Buy</ThemedText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2.5,
    marginTop:10,
    alignItems:'center',
    justifyContent:'space-between',
    flexDirection:'row'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconWrapper: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#f5d90a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    color: '#000',
    textTransform:'capitalize'
  },
  nameText: {
    fontFamily:'MonsterBold',
    fontSize:18
  },
  checkIcon: {
    width: 15,
    height: 15,
    marginLeft: 5,
  },
  timeText: {
    color: 'gray',
    fontSize: 12,
    marginLeft:5,
    fontFamily:'MonsterReg'
  },
  amountText: {
    fontSize: 20,
        marginTop: 10,
      fontFamily:'MonsterBold',
      
  },
  quantityText: {
    color: 'gray',
    marginTop: 5,
    fontFamily:'MonsterReg'
  },
  limitsText: {
    color: 'gray',
    marginTop: 5,
      fontFamily:'MonsterReg'
  },
  dayButton: {
    backgroundColor: '#28a745',
    borderRadius: 5,
    padding: 5,
    marginTop: 10,
    alignSelf: 'flex-end',
  },
  buyButtonText: {
    color: '#fff',
    paddingHorizontal:30,
    paddingVertical:5,
    fontFamily:'MonsterBold'
  },
});

export default Card;
