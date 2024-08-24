import { StyleSheet, View } from 'react-native'
import React, { ReactNode } from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';
import { useRouter } from 'expo-router';
import { TouchableOpacity } from 'react-native';

type PageHeaderPropTypes = {
    label?: string | ReactNode;
    className?: string;
    icon?: string | ReactNode;
    other?: ReactNode | string
}
const PageHeader = ({label,icon = <AntDesign name="arrowleft" size={24} color="black" />, className,other}: PageHeaderPropTypes) => {

  const router = useRouter()

  const navigateBack = () => router.back()


  return (
    <View style={styles.container}>
        <TouchableOpacity onPress={navigateBack}>
{icon}
</TouchableOpacity>
      <View>{label}</View>

      <View>{other}</View>
    </View>
  )
}

export default PageHeader

const styles = StyleSheet.create({
    container:{
     alignItems:'center',
     justifyContent:'space-between',
     flexDirection:'row',
     padding:10,
     width:'100%',
    }
})