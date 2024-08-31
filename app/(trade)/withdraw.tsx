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

const WithdrawPage = () => {
    const router = useRouter();
    const [isBottomDrawerEnabled, setIsBottomDrawerEnabled] = useState(false);
    const [bankBottomEnabled, setBankBottomEnabled] = useState(false);

    const enableBottomDrawer = () => {
        setIsBottomDrawerEnabled(!isBottomDrawerEnabled);
    };

    const enableBankBottomSheet = () => {
        setBankBottomEnabled(!bankBottomEnabled);
    };

    return (
        <>
            <SafeAreaView style={styles.safeAreaView}>
                <PageHeader
                    icon={<FontAwesome name="angle-left" size={24} color="black" />}
                    label={<Text style={styles.headerText}>Withdraw</Text>}
                />
                <View style={styles.container}>
                    <Withdraw 
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

export default WithdrawPage;

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
