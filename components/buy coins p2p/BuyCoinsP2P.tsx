import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Link, useRouter } from 'expo-router';
import FormatDate from '../format date/FormatDate';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { getOrderSellerIdData, getSelectedOrderData } from '@/lib/store/reducers/storeOrders';

const Card = ({fullname, time, sellersRate,sellerId, quantity, limits, coin, offerId}:any) => {
  const router = useRouter()
  const dispatch = useAppDispatch()

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
    <View style={styles.container}>
      <View>
      <View style={styles.row}>
        <View style={styles.iconWrapper}>
          <Text style={styles.iconText}>K</Text>
        </View>
        <View>
          <View style={{flexDirection:'row',alignItems:'center'}}>
        <Text style={styles.nameText}>{fullname}</Text>
  
        <AntDesign style={{marginLeft:5}}  name="checkcircle" size={15} color="green" />
      </View>
        <FormatDate date={time}/>
        </View>
      </View>
      <Text style={styles.amountText}>${sellersRate}</Text>
      <Text style={styles.quantityText}>Quantity: {quantity} {coin}</Text>
      
      <Text style={styles.limitsText}>Limits: {limits}</Text>
      </View>
      <TouchableOpacity onPress={navigateToP2pNegotiate} style={styles.dayButton}>
      <Text style={styles.buyButtonText}>Buy</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
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
  },
  nameText: {
    marginLeft: 5,
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
