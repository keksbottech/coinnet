import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';


const Withdraw = () => {
  return (
    <View style={styles.container}>
      <View className='items-center'>
      <Text style={styles.headerText}>You withdraw</Text>
      <Text style={styles.amountText}>$400</Text>
      </View>
      <View style={styles.dropdownContainer}>

        {/* <RNPickerSelect
          onValueChange={(value) => console.log(value)}
          items={[
            { label: 'USD', value: 'usd' },
            { label: 'EUR', value: 'eur' },
          ]}
          style={{
            inputIOS: styles.dropdown,
            inputAndroid: styles.dropdown,
            iconContainer: {
              top: 10,
              right: 12,
            },
          }}
          Icon={() => {
            return <Icon name="chevron-down" type="feather" size={24} color="black" />;
          }}
        /> */}
      </View>

      <Text style={styles.label}>Available Balance</Text>
      <View style={styles.balanceContainer}>
        <View>
        <Text style={styles.balanceText}>Quantity</Text>
        <Text style={styles.balanceAmount}>2,760.23</Text>
        </View>
        <Text style={styles.currency}>USD</Text>
      </View>

      <Text style={styles.label}>Withdraw to</Text>
      <TouchableOpacity style={styles.withdrawToContainer}>
        <View className='flex flex-row items-center'>
     <FontAwesome name="bank" size={24} color="black" />
     <View>
        <Text style={styles.withdrawToText}>monobank </Text>
        <Text style={styles.withdrawToText}>XXXX393083 </Text>
        </View>
        </View>
        <AntDesign name="down" size={20} color="black" />
      </TouchableOpacity>

      <Text style={styles.label}>Account Number</Text>
      <View style={styles.inputContainer}>
     <FontAwesome name="bank" size={24} color="black" />
        <TextInput placeholder="Enter account number" style={styles.input} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5F5F5',
  
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    fontFamily:'MonsterBold'
  },
  dropdownContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  amountText: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  dropdown: {
    backgroundColor: '#F0F0F0',
    padding: 10,
    borderRadius: 5,
  },
  label: {
    marginTop: 20,
    color: 'gray',
    fontFamily:'MonsterBold',
  },
  balanceContainer: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 10,
    marginTop: 5,
    flexDirection:'row',
    justifyContent:'space-between'
  },
  balanceText: {
    fontSize: 12,
    color: 'gray',
    fontFamily:'MonsterBold'
  },
  balanceAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop:10
  },
  currency: {
    fontSize: 18,
    color: 'gray',
    alignSelf: 'flex-end',
  },
  withdrawToContainer: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 10,
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  withdrawToText: {
    fontSize: 16,
    marginLeft: 10,
    fontFamily:'MonsterMid'
  },
  inputContainer: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 10,
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    marginLeft: 10,
    flex: 1,
    fontFamily:'MonsterReg'
  },
});

export default Withdraw;
