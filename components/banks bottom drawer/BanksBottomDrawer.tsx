import { ScrollView, StyleSheet, Text, ToastAndroid, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import BottomDrawer from '@/components/bottom drawer/BottomDrawer';
import ApplePay from '@/assets/svg/applepay.svg';
import PayPal from '@/assets/svg/paypal.svg';
import MonoBank from '@/assets/svg/mastercard.svg';
import VisaCard from '@/assets/svg/visa.svg';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { getPaymentBanks, getPaymentMethod } from '@/lib/store/reducers/storePaymentUrl';
import { axios } from '@/lib/axios';
import { Wave } from 'react-native-animated-spinkit';

interface Bank {
  id: number;
  name: string;
  icon: JSX.Element;
  number: string;
  code?: string; // Assuming 'code' is part of the bank data
  type?: string; // Assuming 'type' is part of the bank data
}

const paymentMethods: Bank[] = [
  { id: 1, name: 'PayPal', icon: <PayPal />, number: 'XXXX5555' },
  { id: 2, name: 'Bank Transfer', icon: <MonoBank />, number: 'XXXX5555' },
];

const BanksBottomDrawer: React.FC = () => {
  const [selectedMethod, setSelectedMethod] = useState<number | null>(null);
  const dispatch = useAppDispatch();
  const [banks, setBanks] = useState<Bank[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchBanksAvailable();
  }, []);

  const fetchBanksAvailable = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('list/banks');
      const res = response.data.message.data;
      console.log(response.data);
      setBanks(res);

      dispatch(getPaymentBanks({ name: res.name, bankCode: res.code, type: res.type }));


    } catch (err) {
      ToastAndroid.show('Error fetching banks. Try again!', ToastAndroid.SHORT);

      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const enableSelection = (method: Bank, id: number) => {
    console.log(method);
    setSelectedMethod(id);
    dispatch(getPaymentBanks(method));
  };

  return (
    <BottomDrawer
    
      ui={
        <View style={styles.container}>
          <Text style={styles.title}>Choose Bank</Text>
          <View style={{ alignItems: 'center' }}>
            {isLoading && <Wave size={40} />}
          </View>

          {banks && banks.map((method) => (
            <TouchableOpacity
              key={method.id}
              style={styles.methodContainer}
              onPress={() => enableSelection(method, method.id)}
            >
              <View style={styles.methodDetails}>
                <View>
                  {method.icon}
                </View>
                <View style={{ marginLeft: 10 }}>
                  <Text style={styles.methodName}>{method.name}</Text>
                  <Text style={styles.methodNumber}>{method.number}</Text>
                </View>
              </View>
              {selectedMethod === method.id && (
                <MaterialIcons name="check-circle" size={24} color="green" />
              )}
            </TouchableOpacity>
          ))}
        </View>
      }
    />
  );
};

export default BanksBottomDrawer;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 18,
    fontFamily: 'MonsterBold',
    marginBottom: 20,
  },
  methodContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
  },
  methodDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 15,
  },
  methodName: {
    fontSize: 16,
    fontFamily: 'MonsterBold',
  },
  methodNumber: {
    fontSize: 14,
    color: '#888',
    fontFamily: 'MonsterReg',
  },
});
