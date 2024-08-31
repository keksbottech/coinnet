import { View, StyleSheet } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';
import { useAppSelector } from '@/hooks/useAppSelector';
import { SessionHandler } from './_layout';

const Index = () => {
  // const router = useRouter();
  // const [isSessionChecked, setIsSessionChecked] = useState(false);
  // const userSession = useAppSelector((state) => state.session.session);

  // useEffect(() => {
  //   const checkSession = () => {
  //     if (!userSession) {
  //       router.replace('/(onboarding)/signin');
  //     } else {
  //       router.replace('(tabs)');
  //     }
  //     setIsSessionChecked(true);
  //   };

  //   checkSession();
  // }, [userSession, router, isSessionChecked]);

  return (
    <View style={styles.container}>
      <SessionHandler />
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'yellow',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
