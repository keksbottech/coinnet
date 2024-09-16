import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Withdraw from '@/components/withdraw/Withdraw';
import Button from '@/components/ui/button/Button';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import PageHeader from '@/components/page header/PageHeader';
import { Feather } from '@tamagui/lucide-icons';
import { useRouter } from 'expo-router';
import BottomDrawer from '@/components/bottom drawer/BottomDrawer';
import { MaterialIcons } from '@expo/vector-icons';
import PaymentBottomDrawer from '@/components/payment bottom drawer/PaymentBottomDrawer';
import BanksBottomDrawer from '@/components/banks bottom drawer/BanksBottomDrawer';
import { ThemedText } from '@/components/ThemedText';
import { useAppSelector } from '@/hooks/useAppSelector';
import WithdrawForFiat from '@/components/withdraw for fiat/WithdrawForFiat';

const WithdrawPageForFiat = () => {
    const router = useRouter();
    const [isBottomDrawerEnabled, setIsBottomDrawerEnabled] = useState(false);
    const [bankBottomEnabled, setBankBottomEnabled] = useState(false);
    const theme = useAppSelector(state => state.theme.theme)

    const enableBottomDrawer = () => {
        setIsBottomDrawerEnabled(!isBottomDrawerEnabled);
    };

    const enableBankBottomSheet = () => {
        setBankBottomEnabled(!bankBottomEnabled);
    };

    return (
        <>
            <SafeAreaView style={[styles.safeAreaView,{backgroundColor:theme ? '#0F0F0F': 'white'}]}>
                <PageHeader
                    icon={<FontAwesome name="angle-left" size={24} color={theme ? 'white':"black"} />}
                    label={<ThemedText style={styles.headerText}>Withdraw</ThemedText>}
                />
                <View style={styles.container}>
                    <WithdrawForFiat 
                        enableBankBottomSheet={enableBankBottomSheet}
                        enableBottomSheet={enableBottomDrawer}
                    />
                </View>
            </SafeAreaView>
            {isBottomDrawerEnabled && <PaymentBottomDrawer />}
            {bankBottomEnabled && <BanksBottomDrawer />}
        </>
    );
};

export default WithdrawPageForFiat;

const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1,
        padding: 10,
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 24,
    },
    container: {
        flex: 1,
        paddingTop: 0,
    },
});
