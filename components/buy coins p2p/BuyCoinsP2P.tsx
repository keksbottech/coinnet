import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useRouter } from 'expo-router';

const Card = () => {
  const router = useRouter()

  const navigateToSellCoin = () => {
    router.push('(trade)/confirmbuy')
  }

  
  return (
    <View style={styles.container}>
      <View>
      <View style={styles.row}>
        <View style={styles.iconWrapper}>
          <Text style={styles.iconText}>K</Text>
        </View>
        <View>
          <View style={{flexDirection:'row'}}>
        <Text style={styles.nameText} className='font-bold text-xl'>Kcee</Text>
  
        <AntDesign style={{marginLeft:5}}  name="checkcircle" size={15} color="green" />
      </View>
        <Text style={styles.timeText}>1m ago</Text>
        </View>
      </View>
      <Text style={styles.amountText}>$1,000</Text>
      <Text style={styles.quantityText}>Quantity: 212.9288 USDT</Text>
      
      <Text style={styles.limitsText}>Limits: USDT</Text>
      </View>
      <TouchableOpacity onPress={navigateToSellCoin} style={styles.dayButton}>
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
    elevation: 2,
    marginHorizontal: 10,
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
    fontWeight: 'bold',
  },
  nameText: {
    marginLeft: 5,
    fontWeight: 'bold',
  },
  checkIcon: {
    width: 15,
    height: 15,
    marginLeft: 5,
  },
  timeText: {
    color: 'gray',
    fontSize: 12,
    marginLeft:5
  },
  amountText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  quantityText: {
    color: 'gray',
    marginTop: 5,
  },
  limitsText: {
    color: 'gray',
    marginTop: 5,
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
    fontWeight: 'bold',
    paddingHorizontal:30,
    paddingVertical:5
  },
});

export default Card;
